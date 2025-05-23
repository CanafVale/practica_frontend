import { productDetailController } from "./product-detail/productDetailController.js";

document.addEventListener("DOMContentLoaded", () => {
  const searchParams = new URLSearchParams(window.location.search);
  const productId = searchParams.get("id");

  if (productId) {
    const productContainer = document.getElementById("product-detail");  // <== CAMBIADO
    productDetailController(productContainer, productId);
  } else {
    window.location = '/';
  }
});