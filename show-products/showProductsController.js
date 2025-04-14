import { getProducts } from "./showProductsModel.js"
import { buildProduct, buildNoProductsAdvice } from './showProductsView.js';

export async function showProductsController(container) {

  try {
    const event = new CustomEvent("load-products-started");
    container.dispatchEvent(event);

    const products = await getProducts();
    drawProducts(products, container);
  } catch (error) {
    const event = new CustomEvent("load-products-error", {
      detail: error.message
    });
    container.dispatchEvent(event);
  } finally {
    const event = new CustomEvent("load-products-finished");
    container.dispatchEvent(event);
  }
}

function drawProducts(products, container) {
  container.innerHTML = '';

  if (products.length === 0) {
    container.innerHTML = buildNoProductsAdvice();
    return;
  }

  products.forEach((product) => {
    const col = document.createElement("div");
    col.classList.add("col");

    const card = document.createElement("div");
    card.classList.add("card", "h-100", "shadow-sm", "border-0");

    if (product.image) {
      const imageUrl = new URL(product.image, "http://localhost:8000").href;
      const img = document.createElement("img");
      img.src = imageUrl;
      img.classList.add("card-img-top", "object-fit-cover");
      img.style.maxHeight = "200px";
      img.style.objectFit = "cover";
      img.alt = product.name;
      card.appendChild(img);
    }

    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");

    const nameLink = document.createElement("a");
    nameLink.setAttribute("href", `./product-detail.html?id=${product.id}`);
    nameLink.classList.add("text-decoration-none", "text-dark");

    const title = document.createElement("h5");
    title.classList.add("card-title");
    title.textContent = product.name;

    nameLink.appendChild(title);
    cardBody.appendChild(nameLink);

    const description = document.createElement("p");
    description.classList.add("card-text");
    description.textContent = product.description;
    cardBody.appendChild(description);

    const price = document.createElement("p");
    price.innerHTML = `<strong>Precio:</strong> ${product.price} €`;
    cardBody.appendChild(price);

    const type = document.createElement("p");
    type.innerHTML = `<strong>Tipo:</strong> ${product.type === "buy" ? "Compra" : "Venta"}`;
    cardBody.appendChild(type);

    const date = new Date(product.updatedAt);
    const updated = document.createElement("p");
    updated.innerHTML = `<strong>Fecha:</strong> ${date.toLocaleString()}`;
    cardBody.appendChild(updated);

    if (product.tags && product.tags.length > 0) {
      const tags = document.createElement("p");
      tags.innerHTML = `<strong>Tags:</strong> ${product.tags.join(", ")}`;
      cardBody.appendChild(tags);
    }

    card.appendChild(cardBody);
    col.appendChild(card);
    container.appendChild(col);
  });
}