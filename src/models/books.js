import { v4 as uuidv4 } from 'uuid';
import { books } from '../database/data.js';

function create({ title, author, description }) {
  const id = uuidv4();

  const book = { id, title, author, description };

  if (title && author && description) {
    books.push(book);
    return book;
  } else {
    throw new Error('Unable to create book');
  }
}

function read(field, value) {
  if (field && value) {
    const filteredBooks = books.filter((book) =>
      book[field].toLowerCase().includes(value.toLowerCase())
    );

    return filteredBooks;
  }

  return books;
}

function readById(id) {
  if (id) {
    const index = books.findIndex((book) => book.id === id);

    if (!books[index]) {
      throw new Error('Book not found');
    }

    return books[index];
  } else {
    throw new Error('Unable to find book');
  }
}

function update({ id, title, author, description }) {
  if (id && title && author && description) {
    const newBook = { id, title, author, description };

    const index = books.findIndex((book) => book.id === id);

    if (!books[index]) {
      throw new Error('Book not found');
    }

    books[index] = newBook;

    return newBook;
  } else {
    throw new Error('Unable to update book');
  }
}

function remove(id) {
  if (id) {
    const index = books.findIndex((book) => book.id === id);

    if (index === -1) {
      throw new Error('Book not found');
    }

    books.splice(index, 1);

    return true;
  } else {
    throw new Error('Book not found');
  }
}

export default { create, read, readById, update, remove };
