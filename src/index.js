import express from "express";
import morgran from "morgan";
import {books} from "./data/books.js";

const server = express();

server.use(morgran('tiny'));

server.use(express.static('public'));

server.get('/hello', (req, res) => {
    res.send('Hello');
});

server.get('/books', (req, res) => {
    res.json(books);
});

server.listen(3000, () => console.log('Server is running'));