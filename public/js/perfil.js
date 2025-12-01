import API from './services/api.js';
import Auth from './lib/auth.js';
 
const form = document.querySelector('form');
 
let formMethod;
 
async function loadProfile() {
  try {
    const user = await API.read('/users/me');

    if (!user || typeof user !== 'object') {
      throw new Error('Resposta inválida do servidor ao carregar o perfil.');
    }

    console.log('DEBUG: resposta /users/me ->', user);

    let image;

    if (user.image && user.image.path) {
      image = user.image.path;
      formMethod = 'put';
    } else {
      image = '/img/profile/avatar.png';
      formMethod = 'post';
    }

    document.querySelector('#profile-name').innerText = user.nome || 'Usuário';
    document.querySelector('#user-name').innerText = user.nome || 'Usuário';
    document.querySelector('#profile-email').innerText = user.email || 'Email não informado';

    // Normaliza caminho: se backend devolver caminho começando com '/imgs', converte para '/img'
    if (image.startsWith('/imgs/')) {
      image = image.replace('/imgs/', '/img/');
    }

    document.querySelector('#profile-image').src = image;
    document.querySelector('#dropdown-avatar').src = image;
    document.querySelector('#userId').value = user.id || '';
  } catch (error) {
    console.error('Erro ao carregar perfil:', error.message || error);
    alert('Não foi possível carregar o perfil. Tente novamente mais tarde.');
  }
}
 
form.onsubmit = async (event) => {
  event.preventDefault();
 
  try {
    const image = new FormData(form);
 
    let newImage;
 
    if (formMethod === 'post') {
      newImage = await API.create('/users/image', image, true, true);
    } else if (formMethod === 'put') {
      newImage = await API.update('/users/image', image, true);
    }
 
    if (!newImage || !newImage.path) {
      throw new Error('Erro ao atualizar a imagem do perfil.');
    }
 
    document.querySelector('#profile-image').src = newImage.path;
    document.querySelector('#dropdown-avatar').src = newImage.path;
 
    form.reset();
  } catch (error) {
    console.error('Erro ao enviar imagem:', error.message || error);
    alert('Não foi possível atualizar a imagem. Tente novamente mais tarde.');
  }
};
 
if (Auth.isAuthenticated()) {
  loadProfile();
}
