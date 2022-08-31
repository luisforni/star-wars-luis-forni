# APP STAR WARS

Esta aplicacion permite seleccionar quién participará en cada uno de los programas de un nuevo programa de televisión llamado **Star Wars Game Show**.

## Crear base de datos MySQL
Copiar y pegar el codigo en consola. En Windows ingresar sin ```sudo```.
```
sudo mysql -u root -p
```
Ingresar password correspondiente y luego copiar y pegar en consola el siguiente codigo para crear la base de datos en **MySQL**.
```
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

```

Modificar el archivo ```backend/.env``` con los datos de MySQL del usuario (este archivo no deberia incluirse en el ```.gitignore```, por cuestiones practicas decidi incluirlo en el repositorio).

Ejemplo.
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=123456
DB_DATABASE=registersdb
```


## Backend en NODE
Ejecutar en consola nueva.
```
cd backend
```
```
npm i
```
```
npm run build
```
```
npm start
```


## Frontend en REACT NATIVE
Ejecutar en consola nueva.
```
cd myapp
```
```
npm install --global expo-cli
```
```
npm i
```
```
expo start
```
