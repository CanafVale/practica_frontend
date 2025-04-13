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

  if (product.image) {
    const imageUrl = new URL(product.image, "http://localhost:8000").href;
    productView += `<img class="product-image" src="${imageUrl}" alt="${product.name}" />`;
  }

  return productView;
};


export const buildNoProductsAdvice = () => {
  return '<h3>Lo siento, no hay productos disponibles!</h3>'
}
