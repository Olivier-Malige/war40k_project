import express, { Application, Response, Request } from 'express';
import morgan from 'morgan';
import cors from 'cors';

import httpStatusCodes from 'http-status-codes';
import path from 'path';
import index from './routes';
import errorHandler from 'errorhandler';
import './database';

export const app: Application = express();

import './config/session.config';
import './config/passport.config';

const { INTERNAL_SERVER_ERROR, getStatusText } = httpStatusCodes;
app.use(cors());
app.use(morgan('short'));
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(index);
if (process.env.NODE_ENV === 'development') {
  app.use(errorHandler());
} else {
  app.use((err: any, _: Request, res: Response) => {
    const code = err.code || INTERNAL_SERVER_ERROR;
    res.status(code).json({
      code: code,
      message: code === INTERNAL_SERVER_ERROR ? getStatusText(INTERNAL_SERVER_ERROR) : err.message,
    });
  });
}

app.listen('3001', () => {
  console.log('Listen: 3001');
});
