import express, { Application } from 'express';
import cors from 'cors';
import healthRoutes from '../../routes/health/health.routes';
import userRoutes from '../../routes/user/user.routes';
import dbConnection from '../db/db-connection';
/**
 * Main Express configuration class.
 * This class will be responsible for configuring the express server, middlewares, define routes and DB connections.
 */
class ExpressServer {
  public app: Application;
  public port: string;
  public apiPaths = {
    health: '/health',
    users: '/users',
  };

  constructor() {
    this.app = express();
    this.port = process.env.PORT || '8000';

    this.dbConnection();
    this.middlewares();
    this.routes();
  }

  async dbConnection() {
    try {
      await dbConnection.authenticate();
      await dbConnection.sync({ alter: true });
      console.log('Connection has been established successfully.');
    } catch (error) {
      if (error instanceof Error) {
        console.error('Unable to connect to the database:');
        throw new Error(error?.message || 'Error connecting to DB');
      }
    }
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
  }

  routes() {
    this.app.use(this.apiPaths.health, healthRoutes);
    this.app.use(this.apiPaths.users, userRoutes);

    //this will handle invalid routes and return a json response
    this.app.use('*', function (req, res) {
      res.status(404).json({
        status: 404,
        message: 'Requested path does not exist',
      });
    });
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server running on port!! ${this.port}`);
    });
  }
}

export default ExpressServer;
