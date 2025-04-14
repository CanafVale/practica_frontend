import { getProducts } from "./showProductsModel.js";
import { buildProduct, buildNoProductsAdvice } from './showProductsView.js';

let currentPage = 1;
let totalPages = 1;

export async function showProductsController(container) {
  await loadAndRenderPage(container, currentPage);
  drawPagination(container);
}

async function loadAndRenderPage(container, page) {
  try {
    const event = new CustomEvent("load-products-started");
    container.dispatchEvent(event);

    const { products, totalCount } = await getProducts(page);
    drawProducts(products, container);

    totalPages = Math.ceil(totalCount / 5); // ← 5 productos por página

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

    col.innerHTML = buildProduct(product);
    container.appendChild(col);
  });
}

function drawPagination(container) {
  // 🔄 Eliminar controles anteriores
  const oldPagination = document.querySelector(".pagination-wrapper");
  if (oldPagination) oldPagination.remove();

  const paginationWrapper = document.createElement("div");
  paginationWrapper.classList.add("pagination-wrapper", "d-flex", "justify-content-center", "my-4", "gap-2");

  const prevBtn = document.createElement("button");
  prevBtn.textContent = "⬅ Anterior";
  prevBtn.classList.add("btn", "btn-outline-primary", "btn-sm");
  prevBtn.disabled = currentPage === 1;

  const nextBtn = document.createElement("button");
  nextBtn.textContent = "Siguiente ➡";
  nextBtn.classList.add("btn", "btn-outline-primary", "btn-sm");
  nextBtn.disabled = currentPage === totalPages;

  const info = document.createElement("span");
  info.textContent = `Página ${currentPage} de ${totalPages}`;
  info.classList.add("align-self-center", "mx-3", "fw-semibold");

  prevBtn.addEventListener("click", async () => {
    if (currentPage > 1) {
      currentPage--;
      await loadAndRenderPage(container, currentPage);
      drawPagination(container);
    }
  });

  nextBtn.addEventListener("click", async () => {
    if (currentPage < totalPages) {
      currentPage++;
      await loadAndRenderPage(container, currentPage);
      drawPagination(container);
    }
  });

  paginationWrapper.appendChild(prevBtn);
  paginationWrapper.appendChild(info);
  paginationWrapper.appendChild(nextBtn);

  container.parentElement.appendChild(paginationWrapper);
}
