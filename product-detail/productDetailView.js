export const buildProductDetailView = (product) => {
  const date = new Date(product.updatedAt);

  let html = `
    <h2>${product.name}</h2>
    <p>${product.description}</p>
    <p>Precio: ${product.price} €</p>
    <p>Tipo: ${product.type === "buy" ? "Compra" : "Venta"}</p>
    <p>Fecha: ${date.toLocaleString()}</p>
  `;

  if (product.tags?.length > 0) {
    html += `<p>Tags: ${product.tags.join(", ")}</p>`;
  }

  return html;
};

export const buildRemoveProductButton = () => {
  const removeButton = document.createElement("button");
  removeButton.textContent = "Eliminar producto";
  return removeButton;
};
