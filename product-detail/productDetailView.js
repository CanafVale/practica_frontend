export const buildProductDetailView = (product) => {
  const date = new Date(product.updatedAt);
  const imageUrl = product.image
    ? new URL(product.image, "http://localhost:8000").href
    : null;

  return `
    ${imageUrl ? `<img src="${imageUrl}" alt="${product.name}" class="img-fluid rounded mb-4" style="max-height: 300px; object-fit: contain;" />` : ''}
    <h2 class="display-5 text-primary mb-3">${product.name}</h2>
    <p class="lead mb-3">${product.description}</p>
    <p><strong>Precio:</strong> ${product.price} €</p>
    <p><strong>Tipo:</strong> ${product.type === "buy" ? "Compra" : "Venta"}</p>
    <p><strong>Fecha:</strong> ${date.toLocaleString()}</p>
    ${product.tags?.length > 0 ? `<p><strong>Tags:</strong> ${product.tags.join(", ")}</p>` : ''}

    <button class="btn btn-outline-secondary mt-4" onclick="window.history.back()">Volver</button>
    
  `;
};

export const buildRemoveProductButton = () => {
  const removeButton = document.createElement("button");
  removeButton.textContent = "Eliminar producto";
  removeButton.classList.add("btn", "btn-danger", "mt-4");
  return removeButton;
};
