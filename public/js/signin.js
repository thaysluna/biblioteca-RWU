import API from './services/api.js';
import Auth from './lib/auth.js';
 
const form = document.querySelector('form');
 
window.handleSubmit = handleSubmit;
 
async function handleSubmit(event) {
  event.preventDefault();
 
  const user = Object.fromEntries(new FormData(form));

 try {
    // 1. Tenta fazer login. Se falhar na API, ele vai direto para o 'catch'.
    const { token } = await API.create('/signin', user, false); 
    
    // 2. Se chegou aqui, o login foi SUCESSO (Status 2xx)!
    Auth.signin(token);
    
    // 3. Redireciona
    window.location.href = 'rolagem.html'; 

  } catch (error) {
    // 4. Captura a falha de login, de rede, ou a falta do token.
    console.error('Erro no login:', error.message);
    // 💡 Adicione feedback para o usuário
    alert('Erro: Credenciais inválidas ou falha na comunicação com o servidor.'); 
  }
}