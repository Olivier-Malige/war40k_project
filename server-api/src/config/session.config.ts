import { app } from '../app';
import session from 'express-session';
import { clientPromise } from '../database';
import MongoStore from 'connect-mongo';
import conf from '../environment';
const env = conf[process.env.NODE_ENV as 'development' | 'production'];

app.use(
  session({
    secret: env.sessionSecret,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: false,
      maxAge: 1000 * 60 * 60 * 24 * 14,
    },
    store: MongoStore.create({
      clientPromise: clientPromise as any,
      ttl: 60 * 60 * 24 * 14,
    }),
  }),
);
