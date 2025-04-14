export const buildProduct = (product) => {
  const date = new Date(product.updatedAt);

  const imageUrl = product.image
    ? new URL(product.image, "http://localhost:8000").href
    : null;

  return `
    <div class="card h-100 shadow-sm">
      ${imageUrl ? `<img src="${imageUrl}" alt="${product.name}" class="card-img-top" />` : ''}
      <div class="card-body">
        <h5 class="card-title">${product.name}</h5>
        <p class="card-text">${product.description}</p>
        <p><strong>Precio:</strong> ${product.price} €</p>
        <p><strong>Tipo:</strong> ${product.type === "buy" ? "Compra" : "Venta"}</p>
        <p><strong>Fecha:</strong> ${date.toLocaleString()}</p>
        ${product.tags?.length > 0 ? `<p><strong>Tags:</strong> ${product.tags.join(", ")}</p>` : ''}
      </div>
    </div>
  `;
};


export const buildNoProductsAdvice = () => {
  return '<h3>Lo siento, no hay productos disponibles!</h3>'
}
