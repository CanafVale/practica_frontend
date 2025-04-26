export const buildProduct = (product) => {
  const date = new Date(product.updatedAt);

  let imageUrl = null;
  if (product.image) {
    
    if (/^https?:\/\//i.test(product.image)) {
      imageUrl = product.image;
    } else {
      
      const fileName = product.image.replace(/^\/+/, "");
      imageUrl = `public/${fileName}`;
    }
  }

  return `
    <a href="./product-detail.html?id=${product.id}" class="text-decoration-none text-dark">
      <div class="card h-100 shadow-sm">
        ${imageUrl ? `<img src="${imageUrl}" alt="${product.name}" class="card-img-top" />` : ''}
        <div class="card-body">
          <h5 class="card-title">${product.name}</h5>
          <p class="card-text">${product.description}</p>
          <p><strong>Precio:</strong> ${product.price} €</p>
          <p><strong>Tipo:</strong> ${product.type === "buy" ? "Compra" : "Venta"}</p>
          <p><strong>Fecha:</strong> ${date.toLocaleString()}</p>
          ${product.tags?.length > 0 ? `<p><strong>Tags:</strong> ${product.tags.join(", ")}</p>` : ''}
          <p><strong>Vendido por:</strong> ${product.user?.username || 'Desconocido'}</p>
        </div>
      </div>
    </a>
  `;
};



export const buildNoProductsAdvice = () => {
  return '<h3>Lo siento, no hay productos disponibles!</h3>'
}
