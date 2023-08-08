-- Use SQL insert statements to add any
-- starting/dummy data to your database tables

-- EXAMPLE:

 insert into "user"
   ("username", "hashedPassword", "email")
   values
     ('admin', 12345, 'idk@gmail.com');

insert into "listings"
  ("userId", "category", "brand", "name", "description", "price", "size", "condition", "images", "phoneNumber")
  values (1 ,'shoes', 'Nike', 'Panda Dunks', 'Black and white dunk lows', 100, '10', 'New', 'idk', null);
