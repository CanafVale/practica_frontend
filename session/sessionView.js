export const buildUnauthorizedSession = () => {
  return `
    <a href="./login.html" class="button-wallapop">Login</a>
    <a href="./register.html" class="button-wallapop">Registro</a>
  `;
}

export const buildAuthorizedSession = () => {
  return `
    <a href="./create-product.html" class="button-wallapop">Crear producto</a>
    <button class="logout button-wallapop">Cerrar sesión</button>
  `;
}
