import { connect, model } from 'mongoose';
import conf from '../environment';
import { unitSchema } from './models/unit.model';
import { W40KUnit } from '../interfaces';

const env = conf[process.env.NODE_ENV as 'development' | 'production'];

try {
  connect(env.dbUrl, () => {
    console.log('Connection to database OK');
  });
} catch (e) {
  console.error('Error while connecting to DB');
}

const W40kUnits = model<W40KUnit>('W40KUnits', unitSchema);

export { W40kUnits };
