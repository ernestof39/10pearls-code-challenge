# RESTful API Code challenge
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Sequelize](https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=Sequelize&logoColor=white)
![MySQL](https://img.shields.io/badge/mysql-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white)


## Description
A RESTful API project written in Typescript and Express.

----------
<br/><br/>

## About the project
This project present a basic CRUD operations for managing users.

## IDE
Recomended IDE for developing the project is [VS Code](https://code.visualstudio.com/).

## Libraries
- Sequelizer
- Mysql2
<br/><br/>


------

## Project Setup
First edit the `template.env` file adding the necessary information. After that, rename the file to `.env`: 

- PORT
- DB_HOST
- DB_DIALECT
- DB_PORT
- DB_NAME
- DB_USER
- DB_PASSWORD


## DB Configuration
The project is configured to create automatically the Database and the User model, the requirement is to provide first the expected `DB_*` properties in `.env` file.

If project is not able to run due to errors in DB creation, the following script will need to be executed before running the project:

```
CREATE DATABASE IF NOT EXISTS user_management;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phoneNumber` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  
) ENGINE=InnoDB  DEFAULT CHARSET=utf8mb4;

```
## Installing dependencies
```bash
npm install 
```
## Building project
```bash
npm run build
```
## Running project
```bash
npm run start
```
-----

## Search/Sort/Pagination
For pagination in GET `/users` endpoint, the following paramaters can be used:
- `size` : Defines the amount of records to be returned. (Default value 10).
- `page` : Selects the specific page to return the records. (Default value 0).
- `sort` : The property required to be used in sorting. Non-existent properties are ignored. (Default value `id`)
- `order` : Sorting order to be applied. Expected values `ASC | DESC`. Defaul value `ASC`.
- `search` : Special field that expects a string and will be used to search in the field. For GET `/users` it will search in email and name properties.