import { PrismaClient } from '../generated/prisma/client.js';

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});

export default prisma;
