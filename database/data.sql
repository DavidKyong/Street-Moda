-- Use SQL insert statements to add any
-- starting/dummy data to your database tables

-- EXAMPLE:

 insert into "user"
   ("username", "hashedPassword")
   values
     ('admin', 12345);

insert into "listings"
  ("userId", "category", "brand", "name", "description", "price", "size", "condition", "images", "email", "phoneNumber")
  values (1 ,'shoes', 'Nike', 'Panda Dunks', 'Black and white dunk lows', 100.99, '10', 'New', 'idk', 'idk', null);
