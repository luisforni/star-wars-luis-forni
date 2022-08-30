CREATE DATABASE IF NOT EXISTS registersdb;

USE registersdb;

CREATE TABLE IF NOT EXISTS registers(
    id INT NOT NULL AUTO_INCREMENT,

    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    date_birth DATE NOT NULL,
    phone VARCHAR(16) NOT NULL,
    country VARCHAR(30) NOT NULL,
    email VARCHAR(50) NOT NULL,
    star_wars INT NOT NULL,
    
    PRIMARY KEY (id)
);

INSERT INTO registers (first_name, last_name, date_birth, phone, country, email, star_wars) VALUES
    ('Luis', 'Forni', '2000-12-31', '543492594113', 'Argentina', 'forniluis@starwars.com', 0),
    ('Juan', 'Gomez', '1999-11-30', '393286290719', 'Spain', 'gomezjuan@starwars.com', 1);
