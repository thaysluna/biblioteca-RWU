// Elementos do DOM
const addBookBtn = document.getElementById('addBookBtn');
const addBookModal = document.getElementById('addBookModal');
const successModal = document.getElementById('successModal');
const closeModal = document.getElementById('closeModal');
const closeSuccessModal = document.getElementById('closeSuccessModal');
const cancelBtn = document.getElementById('cancelBtn');
const okBtn = document.getElementById('okBtn');
const addBookForm = document.getElementById('addBookForm');
const booksContainer = document.getElementById('booksContainer');

// Abrir modal de adicionar livro
addBookBtn.addEventListener('click', () => {
    addBookModal.style.display = 'block';
});

// Fechar modal de adicionar livro
closeModal.addEventListener('click', () => {
    addBookModal.style.display = 'none';
    addBookForm.reset();
});

cancelBtn.addEventListener('click', () => {
    addBookModal.style.display = 'none';
    addBookForm.reset();
});

// Fechar modal de sucesso
closeSuccessModal.addEventListener('click', () => {
    successModal.style.display = 'none';
});

okBtn.addEventListener('click', () => {
    successModal.style.display = 'none';
});

// Fechar modal ao clicar fora dele
window.addEventListener('click', (event) => {
    if (event.target === addBookModal) {
        addBookModal.style.display = 'none';
        addBookForm.reset();
    }
    if (event.target === successModal) {
        successModal.style.display = 'none';
    }
});

// Submeter formulário
addBookForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Pegar dados do formulário
    const formData = new FormData(addBookForm);
    const bookData = {
        title: formData.get('title'),
        author: formData.get('author'),
        description: formData.get('description'),
        codLivro: formData.get('codLivro'),
        dataEmprestimo: formData.get('dataEmprestimo'),
        dataEntrega: formData.get('dataEntrega')
    };

    try {
        // Enviar dados para o servidor
        const response = await fetch('/api/books', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bookData)
        });

        if (response.ok) {
            const newBook = await response.json();
            
            // Adicionar o novo livro na página
            addBookToPage(newBook);
            
            // Fechar modal de adicionar
            addBookModal.style.display = 'none';
            addBookForm.reset();
            
            // Mostrar modal de sucesso
            successModal.style.display = 'block';
        } else {
            alert('Erro ao adicionar o livro. Por favor, tente novamente.');
        }
    } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao conectar com o servidor. Por favor, tente novamente.');
    }
});

// Função para adicionar livro na página
function addBookToPage(book) {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
        <img src="https://img.icons8.com/ios/250/book.png" alt="Capa do livro ${book.title}" />
        <div class="card-content">
            <p><strong>${book.title}</strong></p>
            <p>Autor: ${book.author}</p>
            <p>Cod do livro: ${book.codLivro || 'N/A'}</p>
            <p>Empréstimo: ${formatDate(book.dataEmprestimo)}</p>
            <p>Entrega: ${formatDate(book.dataEntrega)}</p>
            <form>
                <button class="update-button" type="button" data-id="${book.id}">Atualizar</button>
            </form>
        </div>
    `;
    booksContainer.appendChild(card);
}

// Função para formatar data
function formatDate(dateString) {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    return `${day}/${month}`;
}

// Carregar livros existentes ao carregar a página
async function loadBooks() {
    try {
        const response = await fetch('/api/books');
        if (response.ok) {
            const books = await response.json();
            
            // Limpar container de livros
            booksContainer.innerHTML = '';
            
            // Adicionar cada livro na página
            books.forEach(book => {
                addBookToPage(book);
            });
        }
    } catch (error) {
        console.error('Erro ao carregar livros:', error);
    }
}

// Carregar livros quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    loadBooks();
});

// Adicionar event listener para botões de atualizar (delegação de eventos)
booksContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('update-button')) {
        const bookId = e.target.dataset.id;
        console.log('Atualizar livro com ID:', bookId);
        // Aqui você pode adicionar a lógica para atualizar o livro
        // Por exemplo, abrir um modal de edição
    }
});
