import { Dialect } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';
import mysql from 'mysql2';

console.log('Connecting to DB...');

const dbName = process.env.DB_NAME as string;
const dbUser = process.env.DB_USER as string;
const dbHost = process.env.DB_HOST;
const dbDriver = (process.env.DB_DIALECT as Dialect) || 'mysql';
const dbPassword = process.env.DB_PASSWORD;
const dbPort = process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306;

const mysqlConnection = mysql.createConnection({
  host: dbHost,
  user: dbUser,
  password: dbPassword,
});

mysqlConnection.query(`CREATE DATABASE IF NOT EXISTS ${dbName};`);
mysqlConnection.end();
console.log('Created DB if not exists');

console.log('Creating sequelize connection...');
const dbConnection = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  dialect: dbDriver,
  port: dbPort,
});

// const getConnection = async () => {
//   if (!dbConnection) {
//     const connection = await mysql.createConnection({
//       host: dbHost,
//       user: dbUser,
//       password: dbPassword,
//     });
//     connection.query(`CREATE DATABASE IF NOT EXISTS ${dbName};`);

//     await dbConnection.sync();
//   }

//   return dbConnection;
// };

export default dbConnection;
