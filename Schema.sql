CREATE DATABASE bamazon;
CREATE TABLE products (
item_id INT(11) auto_increment primary key,
product_name VARCHAR(30),
department_name VARCHAR(30),
price DECIMAL(10,2),
stock_quantity INT(10)
);