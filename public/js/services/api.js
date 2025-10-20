import Auth from '../lib/auth.js';
 
// public/js/services/api.js
const domain = '/api';
 
async function create(resource, data, auth = true) {
  const url = `${domain}${resource}`;
 
  const config = {
    method: 'POST',
    mode: 'cors',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
  };
 
  if (auth) {
    config.headers.Authorization = `Bearer ${Auth.getToken()}`;
  }
 
  const res = await fetch(url, config);
 
 if (res.status === 401) {
        Auth.signout();
        // 💡 MUITO IMPORTANTE: LANCE UM ERRO para forçar a falha no signin.js
        throw new Error('Não Autorizado'); 
    }
    
    // 💡 ADIÇÃO: Se o status HTTP não é 2xx, lance um erro.
    if (!res.ok) {
        // Tenta ler o erro do JSON, ou usa um erro padrão
        const errorData = await res.json();
        throw new Error(errorData.message || `Erro na API: Status ${res.status}`);
    }

    // Se o login for SUCESSO (res.ok é true), retorne o JSON
    return await res.json();
}
 
async function read(resource) {
  const url = `${domain}${resource}`;
 
  const config = {
    method: 'get',
    headers: {
      Authorization: `Bearer ${Auth.getToken()}`,
    },
  };
 
  const res = await fetch(url, config);
 
  if (res.status === 401) {
    Auth.signout();
  }
 
  return await res.json();
}
 
async function update(resource, data) {
  const url = `${domain}${resource}`;
 
  const config = {
    method: 'PUT',
    mode: 'cors',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      Authorization: `Bearer ${Auth.getToken()}`,
    },
  };
 
  const res = await fetch(url, config);
 
  if (res.status === 401) {
    Auth.signout();
  }
 
  return await res.json();
}
 
async function remove(resource) {
  const url = `${domain}${resource}`;
 
  const config = {
    method: 'DELETE',
    mode: 'cors',
    headers: {
      Authorization: `Bearer ${Auth.getToken()}`,
    },
  };
 
  const res = await fetch(url, config);
 
  if (res.status === 401) {
    Auth.signout();
  }
 
  return true;
}
 
export default { create, read, update, remove };
 