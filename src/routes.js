import express from 'express';
import books from './models/books.js';
import users from './models/user.js'; // renomeado para lowercase: mais comum em módulos
import rendas from './models/renda.js';

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

router.post('/books', async (req, res, next) => {
  try {
    // const book = req.body;

    // const createdBook = await books.create(book);
    const createdBook = await books.create(req.body);
    return res.json(createdBook);
  } catch (error) {
    next(new HTTPError('Unable to create book', 400));
  }
});

router.get('/books', async (req, res, next) => {
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

router.get('/books/:id', async (req, res, next) => {
  try {
    const book = await books.readById(req.params.id);
    res.json(book);
  } catch (error) {
    next(new HTTPError('Unable to find book', 400));
  }
});

router.put('/books/:id', async (req, res, next) => {
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

router.delete('/books/:id', async (req, res, next) => {
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

router.get('/books-all', async (req, res, next) => {
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

router.post('/users', async (req, res, next) => {
  try {
    const createdUser = await users.create(req.body);
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

export default router;