In PostgreSQL, you can perform various types of SQL queries to interact with your database. Here’s a breakdown of common PostgreSQL queries for different operations:

1. SELECT (Retrieve Data)
Retrieve all rows:

sql
Copy code
SELECT * FROM users;
Retrieve specific columns:

sql
Copy code
SELECT id, name, email FROM users;
Retrieve with conditions:

sql
Copy code
SELECT * FROM users WHERE email = 'example@example.com';
Ordering results:

sql
Copy code
SELECT * FROM users ORDER BY created_at DESC;
Limiting results:

sql
Copy code
SELECT * FROM users LIMIT 10;



2. INSERT (Add Data)
Insert a new row:

sql
Copy code
INSERT INTO users (name, email, password) 
VALUES ('John Doe', 'john@example.com', 'password123');
Return the inserted row:

sql
Copy code
INSERT INTO users (name, email, password) 
VALUES ('Jane Doe', 'jane@example.com', 'password456')
RETURNING *;
3. UPDATE (Modify Data)
Update a specific row:

sql
Copy code
UPDATE users
SET name = 'John Smith'
WHERE email = 'john@example.com';
Update multiple rows:

sql
Copy code
UPDATE users
SET status = 'inactive'
WHERE last_login < '2023-01-01';
4. DELETE (Remove Data)
Delete specific row(s):

sql
Copy code
DELETE FROM users WHERE email = 'jane@example.com';
Delete all rows (use with caution):

sql
Copy code
DELETE FROM users;
5. JOINs (Combine Data from Multiple Tables)
Inner Join (fetch matching rows from two tables):

sql
Copy code
SELECT users.name, orders.amount
FROM users
INNER JOIN orders ON users.id = orders.user_id;
Left Join (fetch all users and matching orders):

sql
Copy code
SELECT users.name, orders.amount
FROM users
LEFT JOIN orders ON users.id = orders.user_id;
6. Aggregate Functions
Count the number of rows:

sql
Copy code
SELECT COUNT(*) FROM users;
Calculate averages:

sql
Copy code
SELECT AVG(salary) FROM employees;
Group By:

sql
Copy code
SELECT status, COUNT(*) 
FROM users
GROUP BY status;



7. Using Parameters in Node.js
When running these queries in a Node.js application using the pg library, use parameterized queries to avoid SQL injection:

javascript
Copy code
const email = 'example@example.com';
const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
console.log(result.rows);