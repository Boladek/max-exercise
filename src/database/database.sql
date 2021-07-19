CREATE DATABASE todo_database;

--\c into todo_databse

CREATE TABLE todo(
    todo_id SERIAL PRIMARY KEY
    description VARCHAR(255)
);