import express from 'express';
import books from './models/books.js'; // <-- import ajustado para o nome correto

class HTTPError extends Error {
  constructor(message, code) {
    super(message);
    this.code = code;
  }
}

const router = express.Router();

// CREATE book
router.post('/books', async (req, res) => {
  try {
    const book = req.body;

    const createdBook = await books.create(book);

    return res.json(createdbook);
  } catch (error) {
    throw new HTTPError('Unable to create book', 400);
  }
});

// READ books (optionally filtered by title)
router.get('/books', async (req, res) => {
  try {
    const { title } = req.query;

    const result = await books.read('title', title);

    res.json(result);
  } catch (error) {
    throw new HTTPError('Unable to read books', 400);
  }
});

// READ book by id
router.get('/books/:id', async (req, res) => {
  try {
    const id = req.params.id;

    const book = await books.readById(id);

    res.json(book);
  } catch (error) {
    throw new HTTPError('Unable to find book', 400);
  }
});

// UPDATE book by id
router.put('/books/:id', async (req, res) => {
  try {
    const book = req.body;
    const id = req.params.id;

    const updatedbook = await books.update({ ...book, id });

    return res.json(updatedBook);
  } catch (error) {
    throw new HTTPError('Unable to update book', 400);
  }
});

// DELETE book by id
router.delete('/books/:id', async (req, res) => {
  const id = req.params.id;

  if (await books.remove(id)) {
    res.sendStatus(204);
  } else {
    throw new HTTPError('Unable to remove book', 400);
  }
});

// 404 handler
router.use((req, res, next) => {
  res.status(404).json({ message: 'Content not found!' });
});

// Error handler
router.use((err, req, res, next) => {
  if (err instanceof HTTPError) {
    res.status(err.code).json({ message: err.message });
  } else {
    res.status(500).json({ message: 'Something broke!' });
  }
});

export default router;

