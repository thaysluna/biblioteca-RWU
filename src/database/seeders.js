import { resolve } from 'node:path';
import { readFileSync } from 'node:fs';
import Books from '../models/books.js';
 
async function up() {
  const file = resolve('src', 'database', 'seeders.json');
 
  const seed = JSON.parse(readFileSync(file));
 
await prisma.investment.createMany({
    data: seed.investments,
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });