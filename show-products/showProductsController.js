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

    col.innerHTML = buildProduct(product);  // 👈 Usamos la vista reutilizable
    container.appendChild(col);
  });
}
