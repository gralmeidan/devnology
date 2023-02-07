import 'express-async-errors';
import * as express from 'express';
import morgan = require('morgan');
import handleError from './middlewares/handleError.middleware';
import userRouter from './routes/user.routes';
import orderRouter from './routes/order.routes';
import addressRouter from './routes/address.routes';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.config();

    this.app.use(userRouter);
    this.app.use('/orders', orderRouter);
    this.app.use('/address', addressRouter);
    this.app.use(handleError);
  }

  private config(): void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', 'http://localhost:43195');
      res.header(
        'Access-Control-Allow-Methods',
        'GET,POST,DELETE,OPTIONS,PUT,PATCH'
      );
      res.header('Access-Control-Allow-Headers', ['Content-Type', 'cookie']);
      res.header('Access-Control-Expose-Headers', '*');
      res.header('Access-Control-Allow-Credentials', 'true');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);
    this.app.use(morgan('dev'));
  }

  public start(PORT: string | number): void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };

export const { app } = new App();
