import { logger } from './../utils/logger';
import 'dotenv/config'
import express, {Request, Response, NextFunction} from 'express'
import 'express-async-errors';
import { errors } from 'celebrate'
import AppErrors from '../errors/App.error'
import routes from './routes'

const app = express();
app.use(express.json())

app.use(routes)

app.use(errors())


app.use((error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof AppErrors) {
      return response.status(error.statusCode).json({
        status: 'error',
        message: error.message,
      });
    }
    logger.error(error)
    return response.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  },
);



export default app