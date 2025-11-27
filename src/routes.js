import express from 'express';
import books from './models/books.js';
import users from './models/user.js'; // renomeado para lowercase: mais comum em módulos
import rendas from './models/renda.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { z } from 'zod';
import multer from 'multer';

import { isAuthenticated } from './middleware/auth.js';
import { validate } from './middleware/validate.js';
import uploadConfig from './config/multer.js';
import SendMail from './services/SendMail.js';
import user from './models/user.js';

class HTTPError extends Error {
  constructor(message, code) {
    super(message);
    this.code = code;
  }
}

const router = express.Router();

//
// ─── BOOK ROUTES ─────────────────────────────────────────────
//

router.post('/books', isAuthenticated, async (req, res, next) => {
  try {
    // const book = req.body;

    // const createdBook = await books.create(book);
    const createdBook = await books.create(req.body);
    return res.json(createdBook);
  } catch (error) {
    next(new HTTPError('Unable to create book', 400));
  }
});

router.get('/books', isAuthenticated, async (req, res, next) => {
  try {
    const { title } = req.query;

    // Passar um objeto where ou vazio se não houver filtro
    // const where = title ? { title } : {};
    // const result = await books.read(where);
    const result = await books.read('title', title);

    res.json(result);
  } catch (error) {
    next(new HTTPError('Unable to read books', 400));
  }
});

router.get('/books/:id', isAuthenticated, async (req, res, next) => {
  try {
    const book = await books.readById(req.params.id);
    res.json(book);
  } catch (error) {
    next(new HTTPError('Unable to find book', 400));
  }
});

router.put('/books/:id', isAuthenticated, async (req, res, next) => {
  try {
    // const book = req.body;
    // const id = req.params.id;

    // const updatedBook = await books.update({ ...book, id });
    const updatedBook = await books.update({ ...req.body, id: req.params.id });

    return res.json(updatedBook);
  } catch (error) {
    next(new HTTPError('Unable to update book', 400));
  }
});

router.delete('/books/:id', isAuthenticated, async (req, res, next) => {
  try {
    const success = await books.remove(req.params.id);
    if (success) {
      res.sendStatus(204);
    } else {
      throw new Error();
    }
  } catch (error) {
    next(new HTTPError('Unable to remove book', 400));
  }
});

router.get('/books-all', isAuthenticated, async (req, res, next) => {
  try {
    const result = await books.readall();
    res.json(result);
  } catch (error) {
    next(new HTTPError('Unable to read all books', 400));
  }
});

//
// ─── USER ROUTES ─────────────────────────────────────────────
//

router.post(
  '/users',
  validate(
    z.object({
      body: z.object({
        email: z.string().email(),
        nome: z.string(),
        cpf: z.string().min(11),
        dataNascimento: z.string(),
        endereco: z.string(),
        password: z.string().min(6),
      }),
    })
  ), 
   
  async (req, res, next) => {
  try {
    const createdUser = await users.create(req.body);
    await SendMail.createNewUser(createdUser.email);
    res.status(201).json(createdUser);
  } catch (error) {
    next(new HTTPError('Unable to create user', 400));
  }
});

router.get('/users', async (req, res, next) => {
  try {
    const result = await users.read(); // você pode passar filtros em req.query, se quiser
    res.json(result);
  } catch (error) {
    next(new HTTPError('Unable to read users', 400));
  }
});

router.get('/users/:id', async (req, res, next) => {
  try {
    const user = await users.readById(req.params.id);
    res.json(user);
  } catch (error) {
    next(new HTTPError('Unable to find user', 400));
  }
});

router.put('/users/:id', async (req, res, next) => {
  try {
    const updatedUser = await users.update({ ...req.body, id: req.params.id });
    res.json(updatedUser);
  } catch (error) {
    next(new HTTPError('Unable to update user', 400));
  }
});

router.delete('/users/:id', async (req, res, next) => {
  try {
    const success = await users.remove(req.params.id);
    if (success) {
      res.sendStatus(204);
    } else {
      throw new Error();
    }
  } catch (error) {
    next(new HTTPError('Unable to remove user', 400));
  }
});

// ─── ROTAS DE RENDA ─────────────────────────────────────────────
//

// Criar uma renda
router.post('/rendas', async (req, res, next) => {
  try {
    const createdRenda = await rendas.create(req.body);
    res.status(201).json(createdRenda);
  } catch (error) {
    next(new HTTPError('Unable to create renda', 400));
  }
});

// Listar todas as rendas
router.get('/rendas', async (req, res, next) => {
  try {
    const result = await rendas.readAll();
    res.json(result);
  } catch (error) {
    next(new HTTPError('Unable to read rendas', 400));
  }
});

// Listar rendas por userId (query string: /rendas/user?userId=abc123)
router.get('/rendas/user', async (req, res, next) => {
  try {
    const { userId } = req.query;
    if (!userId) throw new HTTPError('userId is required', 400);

    const rendasByUser = await rendas.readByUserId(userId);
    res.json(rendasByUser);
  } catch (error) {
    next(error);
  }
});

// Buscar renda pelo ID
router.get('/rendas/:id', async (req, res, next) => {
  try {
    const renda = await rendas.readById(req.params.id);
    res.json(renda);
  } catch (error) {
    next(new HTTPError('Unable to find renda', 400));
  }
});

// Atualizar renda pelo ID
router.put('/rendas/:id', async (req, res, next) => {
  try {
    const updatedRenda = await rendas.update({ ...req.body, id: req.params.id });
    res.json(updatedRenda);
  } catch (error) {
    next(new HTTPError('Unable to update renda', 400));
  }
});

// Deletar renda pelo ID
router.delete('/rendas/:id', async (req, res, next) => {
  try {
    const success = await rendas.remove(req.params.id);
    if (success) {
      res.sendStatus(204);
    } else {
      throw new Error();
    }
  } catch (error) {
    next(new HTTPError('Unable to remove renda', 400));
  }
});

router.get('/users/me', isAuthenticated, async (req, res) => {
  try {
    const userId = req.userId;
 
    const user = await User.readById(userId);
 
    delete user.password;
 
    return res.json(user);
  } catch (error) {
    throw new HTTPError('Unable to find user', 400);
  }
});


router.post('/signin', async (req, res) => {
  try {
    const { email, password } = req.body;

    // 🛑 Adicione este log ANTES DA CHAMADA DO BANCO DE DADOS
    console.log('--- DEBUG 1: Requisição Recebida ---');
    console.log('Email do formulário:', email); 
    console.log('------------------------------------');
 
    const { id: userId, password: hash } = await users.read({ email });

    // 🛑 Adicione este log DEPOIS DA CHAMADA DO BANCO DE DADOS
    // console.log('--- DEBUG 2: Resposta do Banco Recebida ---');
    // console.log('-------------------------------------------');

    // 2. VERIFICAÇÃO DE E-MAIL (Se não encontrou, lança erro)
    // if (!user || !user.password) {
    //     throw new Error('User not found in database'); 
    // }
    
    // 3. LOG (Finalmente veremos se o hash está vindo)
    // console.log('--- DEBUG DE LOGIN ---');
    // console.log('Email do formulário:', email); 
    // console.log('Hash da senha lido do BD:', user.password); // Acessa o hash diretamente
    // console.log('-----------------------');

    const match = await bcrypt.compare(password, hash);
 
    if (match) {
      const token = jwt.sign(
        { userId },
        process.env.JWT_SECRET,
        { expiresIn: 3600000 } // 1h
      );
 
      return res.json({ auth: true, token });
    } else {
      throw new Error('User not found');
    }
  } catch (error) {
    res.status(401).json({ error: 'User not found' });
  }
});
// --- 404 handler e Error handler (como antes) ---

router.use((req, res) => {
  res.status(404).json({ message: 'Content not found!' });
});

router.use((err, req, res, next) => {
  if (err instanceof HTTPError) {
    res.status(err.code).json({ message: err.message });
  } else {
    console.error(err);
    res.status(500).json({ message: 'Something broke!' });
  }
});

router.post(
  '/users/image',
  isAuthenticated,
  multer(uploadConfig).single('image'),
  async (req, res) => {
    try {
      const userId = req.userId;
 
      if (req.file) {
        const path = `/imgs/profile/${req.file.filename}`;
 
        await Image.create({ userId, path });
 
        res.sendStatus(201);
      } else {
        throw new Error();
      }
    } catch (error) {
      throw new HTTPError('Unable to create image', 400);
    }
  }
);
 
router.put(
  '/users/image',
  isAuthenticated,
  multer(uploadConfig).single('image'),
  async (req, res) => {
    try {
      const userId = req.userId;
 
      if (req.file) {
        const path = `/imgs/profile/${req.file.filename}`;
 
        const image = await Image.update({ userId, path });
 
        res.json(image);
      } else {
        throw new Error();
      }
    } catch (error) {
      throw new HTTPError('Unable to create image', 400);
    }
  }
);

export default router;