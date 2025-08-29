async function loadBooks() {
  try {
    const response = await fetch('/api/rl');
    const books = await response.json();

    if (!Array.isArray(books)) throw new Error('Resposta inválida da API');

    const bookGrid = document.querySelector('.books');

    for (const book of books) {
      const view = `
        <div class="col">
          <div class="card">
            <img src="img/rolagem imagem/icone.jpeg" class="card-img-top" alt="...">
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

loadBooks();


