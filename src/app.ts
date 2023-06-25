import dotenv from 'dotenv';
import path from 'path';

const envPath = path.resolve(__dirname, '../.env');

console.log('setting env variables ', envPath);
dotenv.config({ path: envPath });

import ExpressServer from './config/express/express-server';
const server = new ExpressServer();
server.listen();
