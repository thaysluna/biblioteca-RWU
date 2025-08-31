import prisma from '../database/database.js';

async function create({ email, rendaMensal, tipoDocumento, documentoUrl, userId }) {
  if (!email || !rendaMensal || !tipoDocumento || !documentoUrl || !userId) {
    throw new Error('Todos os campos são obrigatórios para criar a renda');
  }

  const renda = await prisma.renda.create({
    data: {
      email,
      rendaMensal,
      tipoDocumento,
      documentoUrl,
      userId,
    },
  });

  return renda;
}

async function readAll() {
  const rendas = await prisma.renda.findMany({
    include: { user: true }, // opcional: inclui info do usuário
  });
  return rendas;
}

async function readByUserId(userId) {
  if (!userId) throw new Error('userId é obrigatório');

  const rendas = await prisma.renda.findMany({
    where: { userId },
  });

  return rendas;
}

async function readById(id) {
  if (!id) throw new Error('ID é obrigatório');

  const renda = await prisma.renda.findUnique({
    where: { id },
  });

  if (!renda) {
    throw new Error('Renda não encontrada');
  }

  return renda;
}

async function update({ id, email, rendaMensal, tipoDocumento, documentoUrl }) {
  if (!id) throw new Error('ID é obrigatório para atualizar');

  const updated = await prisma.renda.update({
    where: { id },
    data: {
      email,
      rendaMensal,
      tipoDocumento,
      documentoUrl,
    },
  });

  return updated;
}

async function remove(id) {
  if (!id) throw new Error('ID é obrigatório para deletar');

  await prisma.renda.delete({
    where: { id },
  });

  return true;
}

export default { create, readAll, readByUserId, readById, update, remove };
