import { getProducts } from "./showProductsModel.js";
import { buildProduct, buildNoProductsAdvice } from './showProductsView.js';

let currentPage = 1;
let totalPages = 1;

export async function showProductsController(container, search = "") {
  await loadAndRenderPage(container, currentPage, search);
  drawPagination(container, search);
}

async function loadAndRenderPage(container, page, search) {
  try {
    const event = new CustomEvent("load-products-started");
    container.dispatchEvent(event);

    const { products, totalCount } = await getProducts(page, 5, search);
    drawProducts(products, container);

    totalPages = Math.ceil(totalCount / 5);

    
    if (!search) {
      const finishEvent = new CustomEvent("load-products-finished");
      container.dispatchEvent(finishEvent);
    } else {
    
      const finishEvent = new CustomEvent("load-products-finished", { detail: { silent: true } });
      container.dispatchEvent(finishEvent);
    }

  } catch (error) {
    const errorEvent = new CustomEvent("load-products-error", {
      detail: error.message
    });
    container.dispatchEvent(errorEvent);
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

function drawPagination(container, search) {
  const oldPagination = document.querySelector(".pagination-wrapper");
  if (oldPagination) oldPagination.remove();

  if (totalPages <= 1) return;

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
      await loadAndRenderPage(container, currentPage, search);
      drawPagination(container, search);
    }
  });

  nextBtn.addEventListener("click", async () => {
    if (currentPage < totalPages) {
      currentPage++;
      await loadAndRenderPage(container, currentPage, search);
      drawPagination(container, search);
    }
  });

  paginationWrapper.appendChild(prevBtn);
  paginationWrapper.appendChild(info);
  paginationWrapper.appendChild(nextBtn);

  container.parentElement.appendChild(paginationWrapper);
}
