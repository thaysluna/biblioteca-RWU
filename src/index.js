import 'express-async-errors';
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import router from './routes.js';

const server = express();

server.use(morgan('tiny'));

server.use(
  cors({
    origin: '*', // Em produção, defina domínios específicos
    methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    preflightContinue: false,
  })
);

server.use(express.json());

server.use(express.urlencoded({ extended: true }));

server.use('/api', router);

server.use((req, res, next) => {
    // Se a requisição for POST, PUT, DELETE, etc., 
    // e já passou pela rota '/api', não deve tentar servir estáticos.
    // Se a requisição for GET, tentamos servir os estáticos.
    if (req.method === 'GET' || req.method === 'HEAD') {
        return express.static('public')(req, res, next);
    }
    // Se for outro método (POST), e não for rota da API, retorna erro ou next
    next(); 
});

server.get('/', (req, res) => {
  res.redirect('/signup.html');
});


// Middleware de erro (importante com express-async-errors)
server.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Erro interno do servidor' });
});

server.listen(3000, () => {
  console.log('Server is running on port 3000');
});

 
 