import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🔧 Inicializando banco de dados...');
  
  try {
    // Testar conexão
    await prisma.$connect();
    console.log('✅ Banco de dados conectado com sucesso!');
    
    // Verificar se há livros
    const count = await prisma.livro.count();
    console.log(`📚 Total de livros no banco: ${count}`);
    
    if (count === 0) {
      console.log('📝 Adicionando livros de exemplo...');
      
      await prisma.livro.createMany({
        data: [
          {
            title: 'Dom Casmurro',
            author: 'Machado de Assis',
            description: 'Romance clássico da literatura brasileira',
            codLivro: '00431492',
            dataEmprestimo: new Date('2024-04-05'),
            dataEntrega: new Date('2024-04-26')
          },
          {
            title: 'O Alienista',
            author: 'Machado de Assis',
            description: 'Conto sobre loucura e razão',
            codLivro: '00431493',
            dataEmprestimo: new Date('2024-04-10'),
            dataEntrega: new Date('2024-04-30')
          },
          {
            title: 'Memórias Póstumas de Brás Cubas',
            author: 'Machado de Assis',
            description: 'Romance narrado por um defunto autor',
            codLivro: '00431494',
            dataEmprestimo: new Date('2024-04-15'),
            dataEntrega: new Date('2024-05-05')
          }
        ]
      });
      
      console.log('✅ Livros de exemplo adicionados!');
    }
    
  } catch (error) {
    console.error('❌ Erro ao inicializar banco de dados:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
