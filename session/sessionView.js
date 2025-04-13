export const buildUnauthorizedSession = () => {
  return `
    <a href="./login.html">Login</a>
    <a href="./register.html">Registro</a>
  `;
}

export const buildAuthorizedSession = () => {
  return `
    <a href="./create-tweet.html">Crear Tweet</a>
    <button class="logout">Cerrar sesión</button>
  `;
}
