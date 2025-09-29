function isAuthenticated() {
  if (!getToken()) {
    window.location.href = '/index.html';
  } else {
    return true;
  }
}
 
function getToken() {
  return localStorage.getItem('@book-app:token');
}
 
function signin(token) {
  localStorage.setItem('@book-app:token', token);
 
  window.location.href = '/rolagem.html';
}
 
function signout() {
  localStorage.removeItem('@book-app:token');
 
  window.location.href = '/index.html';
}
 
export default { isAuthenticated, getToken, signin, signout };
 