import 'dotenv/config';
import express from 'express';
import errorMiddleware from './lib/error-middleware.js';
import ClientError from './lib/client-error.js';
import { authorizationMiddleware } from './lib/authorization-middleware.js';
import uploadsMiddleware from './lib/upload-middleware.js';
import pg from 'pg';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

const app = express();

// Create paths for static directories
const reactStaticDir = new URL('../client/build', import.meta.url).pathname;
const uploadsStaticDir = new URL('public', import.meta.url).pathname;

app.use(express.static(reactStaticDir));
// Static directory for file uploads server/public/
app.use(express.static(uploadsStaticDir));
app.use(express.json());

app.post('/api/auth/sign-up', async (req, res, next) => {
  try {
    const { username, password, email } = req.body;
    if (!username || !password || !email) {
      throw new ClientError(
        400,
        'username, password, email are required fields'
      );
    }
    const hashedPassword = await argon2.hash(password);
    const sql = `
      insert into "user" ("username", "hashedPassword", "email")
      values ($1, $2, $3)
      returning *;
    `;
    const params = [username, hashedPassword, email];
    const result = await db.query(sql, params);
    const [user] = result.rows;
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
});

app.post('/api/auth/sign-in', async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      throw new ClientError(401, 'invalid login');
    }
    const sql = `
      select "userId", "hashedPassword"
      from "user"
      where "username" = $1
    `;
    const params = [username];
    const result = await db.query(sql, params);
    const [user] = result.rows;
    if (!user) {
      throw new ClientError(401, 'invalid login');
    }
    const { userId, hashedPassword } = user;
    if (!(await argon2.verify(hashedPassword, password))) {
      throw new ClientError(401, 'invalid login');
    }
    const payload = { userId, username };
    const token = jwt.sign(payload, process.env.TOKEN_SECRET);
    res.json({ token, user: payload });
  } catch (err) {
    next(err);
  }
});

app.get('/api/user', async (req, res, next) => {
  try {
    const sql = `
    select "username" from "user"
    `;
    const result = await db.query(sql);
    res.status(201).json(result.rows);
  } catch (error) {
    next(error);
  }
});

app.get('/api/listings', async (req, res, next) => {
  try {
    const sql = `
      select * from "listings" order by "lastUpdated" desc;
    `;
    const result = await db.query(sql);
    res.status(201).json(result.rows);
  } catch (error) {
    next(error);
  }
});

app.get('/api/apparels', async (req, res, next) => {
  try {
    const sql = `
      select * from "listings"
      where "category" = 'apparels'
    `;
    const result = await db.query(sql);
    res.status(201).json(result.rows);
  } catch (error) {
    next(error);
  }
});

app.get('/api/shoes', async (req, res, next) => {
  try {
    const sql = `
      select * from "listings"
      where "category" = 'shoes'
    `;
    const result = await db.query(sql);
    res.status(201).json(result.rows);
  } catch (error) {
    next(error);
  }
});

app.get('/api/shoes/:listingId', async (req, res, next) => {
  try {
    const listId = Number(req.params.listingId);
    if (!listId) {
      throw new ClientError(400, 'listId must be a positive integer');
    }

    const sql = `
      select *
             from "listings"
      where "listingId" = $1 and "category" = 'shoes'
    `;
    const params = [listId];
    const result = await db.query(sql, params);
    if (!result.rows[0]) {
      throw new ClientError(
        404,
        `cannot find product with listingId ${listId}`
      );
    }
    res.status(201).json(result.rows[0]);
  } catch (error) {
    next(error);
  }
});

app.get('/api/apparels/:listingId', async (req, res, next) => {
  try {
    const listId = Number(req.params.listingId);
    if (!listId) {
      throw new ClientError(400, 'listId must be a positive integer');
    }

    const sql = `
      select *
             from "listings"
      where "listingId" = $1 and "category" = 'apparels'
    `;
    const params = [listId];
    const result = await db.query(sql, params);
    if (!result.rows[0]) {
      throw new ClientError(
        404,
        `cannot find product with listingId ${listId}`
      );
    }
    res.status(201).json(result.rows[0]);
  } catch (error) {
    next(error);
  }
});

app.get(
  '/api/sell/:userId',
  authorizationMiddleware,
  async (req, res, next) => {
    try {
      const userId = Number(req.params.userId);
      if (!userId) {
        throw new ClientError(400, 'userId must be a positive integer');
      }

      const sql = `
      select *
      from "listings"
      where "userId" = $1
    `;
      const params = [userId];
      const result = await db.query(sql, params);
      if (!result.rows) {
        throw new ClientError(404, `cannot find product with userId ${userId}`);
      }
      res.status(201).json(result.rows);
    } catch (error) {
      next(error);
    }
  }
);

// app.get('/api/sell/:userId', authorizationMiddleware, async (req, res, next) => {
//   try {
//     const userId = Number(req.params.userId);
//     if (!userId) {
//       throw new ClientError(400, 'userId must be a positive integer');
//     }

//     const sql = `
//       select *
//       from "listings" order by "lastUpdated" asec;
//       where "userId" = $1
//     `;
//     const params = [userId];
//     const result = await db.query(sql, params);
//     if (!result.rows) {
//       throw new ClientError(404, `cannot find product with userId ${userId}`);
//     }
//     res.status(201).json(result.rows);
//   } catch (error) {
//     next(error);
//   }
// });

app.post(
  '/api/sell/new-listing',
  authorizationMiddleware,
  uploadsMiddleware.single('image'),
  async (req, res, next) => {
    try {
      console.log('req', req);
      const {
        category,
        brand,
        name,
        description,
        price,
        size,
        condition,
        fileName,
      } = req.body;
      if (
        !category ||
        !brand ||
        !name ||
        !description ||
        !price ||
        !size ||
        !condition
      ) {
        throw new ClientError(400, 'input fields are required');
      }
      const url = `/images/${fileName}`;
      const sql = `
      insert into "listings" ("userId", "category", "brand", "name", "description", "price", "size", "condition", "images")
      values ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      returning *;
    `;
      const params = [
        req.user.userId,
        category,
        brand,
        name,
        description,
        price,
        size,
        condition,
        url,
      ];
      const result = await db.query(sql, params);
      const [entry] = result.rows;
      res.status(201).json(entry);
    } catch (error) {
      next(error);
    }
  }
);

app.put(
  'api/listings/:listingId',
  authorizationMiddleware,
  async (req, res, next) => {
    try {
      const listingId = Number(req.params.listingId);
      const {
        category,
        brand,
        name,
        description,
        price,
        size,
        condition,
        images,
        email,
        phoneNumber,
      } = req.body;
      if (
        !Number.isInteger(listingId) ||
        !category ||
        !brand ||
        !name ||
        !description ||
        !price ||
        !size ||
        !condition ||
        !images ||
        !email
      ) {
        throw new ClientError(400, 'input fields are required');
      }
      const sql = `
      update "listings"
        set "category" = $1,
            "brand" = $2,
            "name" = $3,
            "description" = $4,
            "price" = $5,
            "size" = $6,
            "condition" = $7,
            "images" = $8,
            "email" = $9,
            "phoneNumber" =$ 10
      where "listingId" = $11
      returning *;
    `;
      const params = [
        category,
        brand,
        name,
        description,
        price,
        size,
        condition,
        images,
        email,
        phoneNumber,
        listingId,
      ];
      const result = await db.query(sql, params);
      const [entry] = result.rows;
      if (!entry) {
        throw new ClientError(404, `Listing with id ${listingId} not found`);
      }
      res.status(201).json(entry);
    } catch (error) {
      next(error);
    }
  }
);

app.delete(
  'api/listings/:listingId',
  authorizationMiddleware,
  async (req, res, next) => {
    try {
      const listingId = Number(req.params.listingId);
      if (!Number.isInteger(listingId)) {
        throw new ClientError(400, 'listingId must be an integer');
      }
      const sql = `
    delete from "listings"
      where "listingId" = $1
      returning *;
    `;
      const params = [listingId];
      const result = await db.query(sql, params);
      const [deleted] = result.rows;
      if (!deleted) {
        throw new ClientError(404, `Listing with id ${listingId} not found`);
      }
      res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  }
);

/**
 * Serves React's index.html if no api route matches.
 *
 * Implementation note:
 * When the final project is deployed, this Express server becomes responsible
 * for serving the React files. (In development, the Create React App server does this.)
 * When navigating in the client, if the user refreshes the page, the browser will send
 * the URL to this Express server instead of to React Router.
 * Catching everything that doesn't match a route and serving index.html allows
 * React Router to manage the routing.
 */
app.get('*', (req, res) => res.sendFile(`${reactStaticDir}/index.html`));

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  process.stdout.write(`\n\napp listening on port ${process.env.PORT}\n\n`);
});
