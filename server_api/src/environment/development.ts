import path from 'path';

export default {
  dbUrl: 'mongodb+srv://arknoid:artgore666@cluster0.ujqdv.mongodb.net/warhammer_api?retryWrites=true&w=majority',
  cert: path.join(__dirname, '../../ssl/local.crt'),
  key: path.join(__dirname, '../../ssl/local.key'),
  portHttp: 5000,
  portHttps: 5001,
};
