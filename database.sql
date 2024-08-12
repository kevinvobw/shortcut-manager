CREATE DATABASE shortcuts_db;

USE shortcuts_db;

CREATE TABLE shortcuts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    url VARCHAR(255) NOT NULL
);
