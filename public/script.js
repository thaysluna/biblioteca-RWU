import API from './services/api.js';
import Auth from './lib/auth.js';
import { formatCurrency, formatDate } from './lib/format.js';

// ==========================================================
// 2. FUNÇÕES DE CARREGAMENTO E AUTENTICAÇÃO
// ==========================================================

// Função para buscar e exibir o nome do usuário no dropdown
async function loadUser() {
    try {
        const user = await API.read('/users/me'); 
        const userName = document.querySelector('#user-name'); 
        
        if (userName && user && user.name) {
            userName.innerText = user.name;
        }
    } catch (error) {
        console.error("Erro ao carregar o usuário:", error);
    }
}

// Expõe a função de Sair para ser chamada pelo HTML (onclick="signout()")
window.signout = Auth.signout;

// Função para buscar os livros e renderizá-los
async function loadBooks() {
    try {
        // Requisição para buscar os dados dos livros
        const response = await fetch('/api/books-all');
        
        if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status}`);
        }

        const books = await response.json();

        if (!Array.isArray(books)) {
            throw new Error('Resposta inválida da API: Esperava-se um array de livros.');
        }

        const bookGrid = document.querySelector('.books');
        
        if (!bookGrid) return; 

        // Itera sobre os livros e cria o HTML para cada card
        for (const book of books) {
            const view = `
                <div class="col">
                    <div class="card">
                        <img src="${book.image_url || 'img/rolagem imagem/icone.jpeg'}" class="card-img-top" alt="Capa do livro ${book.title}">
                        <div class="card-body">
                            <h5 class="card-title">${book.title}</h5>
                            <h6 class="card-author">${book.author}</h6>
                            <p class="card-text">${book.description}</p>
                            <a href="#" class="btn btn-primary">mais informações</a>
                        </div>
                    </div>
                </div>
            `;
            bookGrid.insertAdjacentHTML('beforeend', view);
        }
    } catch (err) {
        console.error('Erro ao carregar livros:', err);
    }
}


// ==========================================================
// 3. BLOCO DE INICIALIZAÇÃO (PONTO DE ENTRADA)
// ==========================================================

// Garante que o código de inicialização rode após o HTML estar pronto
document.addEventListener('DOMContentLoaded', () => {
    // 1. Carrega a lista de livros (independente da autenticação)
    loadBooks(); 
    
    // 2. Verifica e carrega o usuário logado
    if (Auth.isAuthenticated()) {
        console.log("Usuário autenticado. Carregando dados do perfil...");
        loadUser();
    } else {
        console.log("Usuário não autenticado.");
    }
});