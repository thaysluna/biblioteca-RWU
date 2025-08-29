import { resolve } from 'node:path';
import { readFileSync } from 'node:fs';
import { PrismaClient } from '../src/generated/prisma/client.js';
 
const prisma = new PrismaClient();
 
async function main() {
  const file = resolve('prisma', 'seeders.json');
 
  const seed = JSON.parse(readFileSync(file));
 
  await prisma.livro.createMany({
    data: seed.books,
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
 