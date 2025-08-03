import prisma from '../database/database.js';
 
async function create({ title, author, description }) {
  
  if (title && author && description) {
    const createdInvestment = await prisma.investment.create({
      data: { name, value },
    });
 
    return createdInvestment;
  } else {
    throw new Error('Unable to create investment');
  }
}


async function read(where) {
  
  if (where? .name) {
    where.name = {
      contains: where.name,
    };
  }
 
  const investments = await prisma.investment.findMany({ where });
 
  if (investments.length === 1 && where) {
    return investments[0];
  }
 
  return investments;
}


  async function readById(id) {
  
  if (id) {
   const investment = await prisma.investment.findUnique({
      where: {
        id,
      },
    });
 
    return investment;
  } else {
    throw new Error('Unable to find investment');
  }
}


async function update({ id, title, author, description }) {
 
  if (id && title && author && description) {
    const updatedInvestment = await prisma.investment.update({
      where: {
        id,
      },
      data: { title, author, description },
    });
 
    return updatedInvestment;
  } else {
    throw new Error('Unable to update investment');
  }
}


async function remove(id) {
   if (id) {
    await prisma.investment.delete({
      where: {
        id,
      },
    });

    return true;
  } else {
    throw new Error('Unable to remove investment');
  }
}

export default { create, read, readById, update, remove };