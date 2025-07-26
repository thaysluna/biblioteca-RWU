import 'express-async-errors';
import express from 'express';
import morgan from 'morgan';
import router from './routes.js';
import Seed from './database/seeders.js';
await Seed.up(); // chama antes do server.listen()


const server = express();

server.use(morgan('tiny'));

server.use(express.json());

server.use(express.static('public'));

server.use('/api', router);

server.listen(3000, () => {
  console.log('Server is running on port 3000');
});
 