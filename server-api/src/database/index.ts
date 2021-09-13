import { connect, model } from 'mongoose';
import conf from '../environment';
import { unitSchema } from './models/unit.model';
import { Unit } from '../interfaces';

const env = conf[process.env.NODE_ENV as 'development' | 'production'];

try {
  connect(env.dbUrl,() => {
    console.log("Connection to database OK")
  })

} catch (e) {
  console.error('Error while connecting to DB');
}



const Units = model<Unit>('Units', unitSchema);

export { Units };
