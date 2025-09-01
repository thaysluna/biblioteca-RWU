# Sistema de Biblioteca RWU

## 🚀 Como Iniciar o Projeto

### 1. Instalar Dependências
```bash
npm install
```

### 2. Configurar o Banco de Dados
```bash
npm run db:init
```

### 3. Iniciar o Servidor
```bash
npm start
```

Ou para desenvolvimento (com auto-reload):
```bash
npm dev
```

### 4. Acessar a Aplicação
Abra o navegador e acesse:
- **Página Principal**: http://localhost:3000
- **Página de Funcionário**: http://localhost:3000/funcionario.html

## 📋 Correções Aplicadas

### Problema: "Erro ao comunicar com o servidor"
O erro acontecia porque:
1. A rota `/api/books` no backend esperava parâmetros incorretos
2. O Prisma Client poderia não estar gerado corretamente

### Soluções Implementadas:
1. ✅ Corrigido o método `read` em `routes.js` para aceitar objetos where corretamente
2. ✅ Adicionado script `db:init` para configurar o banco automaticamente
3. ✅ Criado script de inicialização com dados de exemplo

## 🔧 Scripts Disponíveis

- `npm start` - Inicia o servidor em produção
- `npm run dev` - Inicia o servidor em modo desenvolvimento
- `npm run db:init` - Configura o banco de dados e adiciona dados de exemplo

## 📚 Funcionalidades

### Página de Funcionário
- ➕ Adicionar novos livros
- 📖 Visualizar lista de livros
- 🔄 Atualizar informações de livros
- 🔍 Pesquisar livros

## 🛠️ Tecnologias Utilizadas

- **Backend**: Node.js + Express
- **Banco de Dados**: SQLite + Prisma ORM
- **Frontend**: HTML, CSS, JavaScript vanilla

## 🐛 Solução de Problemas

Se continuar com erro de comunicação:

1. **Verifique se o servidor está rodando:**
   - O terminal deve mostrar: "Server is running on port 3000"

2. **Verifique o console do navegador:**
   - Pressione F12 e veja se há erros na aba Console

3. **Reinicie o banco de dados:**
   ```bash
   npm run db:init
   npm start
   ```

4. **Verifique se a porta 3000 está livre:**
   - Feche outros aplicativos usando a porta 3000

## 📝 Estrutura da API

### Endpoints Disponíveis

- `GET /api/books` - Lista todos os livros
- `GET /api/books/:id` - Busca livro por ID
- `POST /api/books` - Adiciona novo livro
- `PUT /api/books/:id` - Atualiza livro
- `DELETE /api/books/:id` - Remove livro

### Exemplo de Requisição POST
```json
{
  "title": "Nome do Livro",
  "author": "Nome do Autor",
  "description": "Descrição do livro",
  "codLivro": "00431495",
  "dataEmprestimo": "2024-04-20",
  "dataEntrega": "2024-05-10"
}
```
