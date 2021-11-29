import { connect, model } from 'mongoose';
import conf from '../environment';
import { w40kUnitSchema } from './models/unit.model';
import { W40kUnit } from '../types';

const env = conf[process.env.NODE_ENV as 'development' | 'production'];

try {
  connect(env.dbUrl, () => {
    console.log('Connection to database OK');
  });
} catch (e) {
  console.error('Error while connecting to DB');
}

const W40kUnits = model<W40kUnit>('W40KUnits', w40kUnitSchema);

export { W40kUnits };
