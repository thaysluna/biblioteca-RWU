import prisma from '../database/database.js';
 
async function create({ title, author, description }) {
  
  if (title && author && description) {
    const createdLivro = await prisma.livro.create({
      data: { title, author, description },
    });
 
    return createdLivro;
  } else {
    throw new Error('Unable to create livro');
  }
}


async function read(where) {
  
  if (where?.title) {
    where.title = {
      contains: where.title,
    };
  }
 
  const livros = await prisma.livro.findMany({ where });
 
  if (livros.length === 1 && where) {
    return livros[0];
  }
 
  return livros;
}


  async function readById(id) {
  
  if (id) {
   const livro = await prisma.livro.findUnique({
      where: {
        id,
      },
    });
 
    return livro;
  } else {
    throw new Error('Unable to find investment');
  }
}


async function update({ id, title, author, description }) {
 
  if (id && title && author && description) {
    const updatedLIvro = await prisma.livro.update({
      where: {
        id,
      },
      data: { title, author, description },
    });
 
    return updatedLivro;
  } else {
    throw new Error('Unable to update investment');
  }
}


async function remove(id) {
   if (id) {
    await prisma.livro.delete({
      where: {
        id,
      },
    });

    return true;
  } else {
    throw new Error('Unable to remove investment');
  }
  
}
async function readall() {
  return await prisma.livro.findMany();
}

export default { create, read, readById, update, remove, readall };