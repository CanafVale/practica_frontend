export const buildProduct = (product) => {
  const date = new Date(product.updatedAt)
  let productView =  `
   
    <p>${product.description}</p>
    <p>Precio: ${product.price} €</p>
    <p>Tipo: ${product.type === "buy" ? "Compra" : "Venta"}</p>
    <p>Fecha: ${date.toLocaleString()}</p>
  `;

  if (product.tags && product.tags.length > 0) {
    productView += `<p>Tags: ${product.tags.join(", ")}</p>`;
  }

  return productView;
};


export const buildNoProductsAdvice = () => {
  return '<h3>Lo siento, no hay productos disponibles!</h3>'
}
