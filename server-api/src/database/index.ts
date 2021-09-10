import { connect, connection, model } from 'mongoose';
import conf from '../environment';
import { unitSchema } from './models/unit.model';
import { IUnit } from '../interfaces';

const env = conf[process.env.NODE_ENV as 'development' | 'production'];

connect(env.dbUrl, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

connection.on('error', () => {
  console.error('Error while connecting to DB');
});

const Units = model<IUnit>('Units', unitSchema);

export { Units };
