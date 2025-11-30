import API from './services/api.js';
import Auth from './lib/auth.js';
 
const form = document.querySelector('form');
 
let formMethod;
 
async function loadProfile() {
  try {
    const user = await API.read('/users/me');

    console.log('DEBUG: resposta /users/me ->', user);

    let image;

    if (user && user.image && user.image.path) {
      image = user.image.path;

      formMethod = 'put';
    } else {
      image = '/img/profile/avatar.png';

      formMethod = 'post';
    }

    document.querySelector('#profile-name').innerText = user.nome || '';

    document.querySelector('#user-name').innerText = user.nome || '';

    document.querySelector('#profile-email').innerText = user.email || '';

    // Normaliza caminho: se backend devolver caminho começando com '/imgs', converte para '/img'
    if (image.startsWith('/imgs/')) {
      image = image.replace('/imgs/', '/img/');
    }

    document.querySelector('#profile-image').src = image;

    document.querySelector('#dropdown-avatar').src = image;

    document.querySelector('#userId').value = user.id || '';
  } catch (error) {
    console.error('Erro ao carregar perfil:', error);
  }
}
 
form.onsubmit = async (event) => {
  event.preventDefault();
 
  const image = new FormData(form);
 
  let newImage;
 
  if (formMethod === 'post') {
    newImage = await API.create('/users/image', image, true, true);
  } else if (formMethod === 'put') {
    newImage = await API.update('/users/image', image, true);
  }
 
  document.querySelector('#profile-image').src = newImage.path;
 
  document.querySelector('#dropdown-avatar').src = newImage.path;
 
  form.reset();
};
 
if (Auth.isAuthenticated()) {
  loadProfile();
}
 