document.getElementById('rendaForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData.entries());

  try {
    const response = await fetch('/api/rendas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!response.ok) throw new Error('Erro ao enviar renda');

    alert('Renda enviada com sucesso!');
    e.target.reset();
  } catch (err) {
    alert(err.message);
  }
});
