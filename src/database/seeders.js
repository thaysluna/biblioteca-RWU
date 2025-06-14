import { resolve } from 'node:path';
import { readFileSync } from 'node:fs';
import books from '../models/books.js';
 
async function up() {
  const file = resolve('src', 'database', 'seeders.json');
 
  const seed = JSON.parse(readFileSync(file));
 
  for (const books of seed.investments) {
    await books.create(books);
  }
}
 
export default { up };
 
