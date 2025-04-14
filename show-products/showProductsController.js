import { getProducts } from "./showProductsModel.js";
import { buildProduct, buildNoProductsAdvice } from './showProductsView.js';

let currentPage = 1;
let totalPages = 1;
let currentFilter = "";

export async function showProductsController(container, filter = "") {
  currentFilter = filter;
  currentPage = 1; // reinicia la página al buscar
  await loadAndRenderPage(container, currentPage, currentFilter);
  drawPagination(container);
}

async function loadAndRenderPage(container, page, filter) {
  try {
    container.dispatchEvent(new CustomEvent("load-products-started"));

    const { products, totalCount } = await getProducts(page, 5, filter);
    drawProducts(products, container);
    totalPages = Math.ceil(totalCount / 5);

  } catch (error) {
    container.dispatchEvent(new CustomEvent("load-products-error", {
      detail: error.message
    }));
  } finally {
    container.dispatchEvent(new CustomEvent("load-products-finished"));
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
      await loadAndRenderPage(container, currentPage, currentFilter);
      drawPagination(container);
    }
  });

  nextBtn.addEventListener("click", async () => {
    if (currentPage < totalPages) {
      currentPage++;
      await loadAndRenderPage(container, currentPage, currentFilter);
      drawPagination(container);
    }
  });

  paginationWrapper.appendChild(prevBtn);
  paginationWrapper.appendChild(info);
  paginationWrapper.appendChild(nextBtn);

  container.parentElement.appendChild(paginationWrapper);
}
