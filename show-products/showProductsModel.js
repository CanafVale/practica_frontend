// modelo -> obtención de datos que necesita nuestra aplicación

export async function getProducts() {
  let products = [];

  try {
    const response = await fetch('http://localhost:8000/api/products?_expand=user')
    products = await response.json();
  } catch (error) {
    throw new Error("No ha sido posible obtener los productos. Inténtalo de nuevo más tarde.");
  }

  return products;
}

