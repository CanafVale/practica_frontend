export async function getProducts(page = 1, limit = 5) {
  try {
    const response = await fetch(`http://localhost:8000/api/products?_expand=user&_page=${page}&_limit=${limit}`);

    const products = await response.json();
    const totalCount = parseInt(response.headers.get("X-Total-Count"), 10) || 0;

    return { products, totalCount };
  } catch (error) {
    throw new Error("No ha sido posible obtener los productos. Inténtalo de nuevo más tarde.");
  }
}
