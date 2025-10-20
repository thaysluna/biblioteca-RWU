import bcrypt from 'bcrypt';
import prisma from '../database/database.js';

const saltRounds = Number(process.env.BCRYPT_SALT) || 10;

async function create({ nome, cpf, email, dataNascimento, endereco, password }) {
  if (!nome || !cpf || !email || !dataNascimento || !endereco || !password) {
    throw new Error('Todos os campos são obrigatórios para criar o usuário');
  }

  const date = new Date(dataNascimento);
  if (isNaN(date)) {
    throw new Error('Data de nascimento inválida');
  }

  const hash = await bcrypt.hash(password, saltRounds);

  const createdUser = await prisma.user.create({
    data: {
      nome,
      cpf,
      email,
      dataNascimento: date,
      endereco,
      password: hash,
    },
  });

  return createdUser;
}

async function read(where = {}) {
  const users = await prisma.user.findMany({ where });
  if (users.length === 1 && where) {
    return users[0];
  }

  return users;
}

async function readById(id) {
  if (!id) {
    throw new Error('ID é obrigatório para buscar o usuário');
  }

  const user = await prisma.user.findUnique({
    where: { id },
  });

  if (!user) {
    throw new Error('Usuário não encontrado');
  }

  return user;
}

async function update({ id, nome, cpf, email, dataNascimento, endereco, password }) {
  if (!id) {
    throw new Error('ID é obrigatório para atualizar o usuário');
  }

  const dataToUpdate = {};

  if (nome) dataToUpdate.nome = nome;
  if (cpf) dataToUpdate.cpf = cpf;
  if (email) dataToUpdate.email = email;
  if (dataNascimento) {
    const date = new Date(dataNascimento);
    if (isNaN(date)) throw new Error('Data de nascimento inválida');
    dataToUpdate.dataNascimento = date;
  }
  if (endereco) dataToUpdate.endereco = endereco;

  if (password) {
    const hash = await bcrypt.hash(password, saltRounds);
    dataToUpdate.password = hash;
  }

  const updatedUser = await prisma.user.update({
    where: { id },
    data: dataToUpdate,
  });

  return updatedUser;
}

async function remove(id) {
  if (!id) {
    throw new Error('ID é obrigatório para deletar o usuário');
  }

  await prisma.user.delete({
    where: { id },
  });

  return true;
}

export default { create, read, readById, update, remove };
