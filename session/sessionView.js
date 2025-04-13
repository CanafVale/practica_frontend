export const buildUnauthorizedSession = () => {
  return `
    <a href="./login.html">Login</a>
    <a href="./register.html">Registro</a>
  `;
}

export const buildAuthorizedSession = () => {
  return `
    <a href="./create-product.html">Crear producto</a>
    <button class="logout">Cerrar sesión</button>
  `;
}
