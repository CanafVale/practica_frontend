export const buildProduct = (product) => {
  const date = new Date(product.updatedAt);
  const imageUrl = product.image ? new URL(product.image, "http://localhost:8000").href : null;

  return `
    <div class="card h-100 shadow-sm">
      ${imageUrl ? `<img src="${imageUrl}" class="card-img-top product-image" alt="${product.name}" />` : ""}
      <div class="card-body d-flex flex-column justify-content-between">
        <div>
          <h5 class="card-title">${product.name}</h5>
          <p class="card-text">${product.description}</p>
          <p class="text-muted mb-1"><strong>Precio:</strong> ${product.price} €</p>
          <p class="text-muted mb-1"><strong>Tipo:</strong> ${product.type === "buy" ? "Compra" : "Venta"}</p>
          <p class="text-muted mb-1"><strong>Fecha:</strong> ${date.toLocaleString()}</p>
          ${product.tags?.length ? `<p class="text-muted"><strong>Tags:</strong> ${product.tags.join(", ")}</p>` : ""}
        </div>
      </div>
    </div>
  `;
};



export const buildNoProductsAdvice = () => {
  return '<h3>Lo siento, no hay productos disponibles!</h3>'
}
