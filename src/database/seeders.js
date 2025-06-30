import { resolve } from 'node:path';
import { readFileSync } from 'node:fs';
import Books from '../models/books.js';
 
async function up() {
  const file = resolve('src', 'database', 'seeders.json');
 
  const seed = JSON.parse(readFileSync(file));
 
  for (const books of seed.books) {
    await Books.create(books);
  }
}
 
export default { up };
 
