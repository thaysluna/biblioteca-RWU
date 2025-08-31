document.getElementById('userForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const senha1 = document.getElementById('senha1').value;
  const senha2 = document.getElementById('senha2').value;

  if (senha1 !== senha2) {
    alert('As senhas não coincidem.');
    return;
  }

  const formData = new FormData(e.target);
  const data = {
    nome: formData.get('nome'),
    cpf: formData.get('cpf'),
    email: formData.get('email'),
    dataNascimento: formData.get('dataNascimento'),
    endereco: formData.get('endereco'),
    password: senha1,
  };

  try {
    const response = await fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Erro ao cadastrar usuário');
    }

    const createdUser = await response.json();
    alert('Usuário criado com sucesso! ID: ' + createdUser.id);
    e.target.reset();
  } catch (error) {
    alert(error.message);
  }
});
