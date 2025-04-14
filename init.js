
async function loadHeaderAndInitPage() {
    const headerContainer = document.getElementById("header-container");
    const response = await fetch("header.html");
    const headerHtml = await response.text();
    headerContainer.innerHTML = headerHtml;
  
   
    const searchParams = new URLSearchParams(window.location.search);
    const productId = searchParams.get("id");
  
    if (productId) {
      const { productDetailController } = await import("./product-detail/productDetailController.js");
      const productContainer = document.getElementById("product-detail");
      productDetailController(productContainer, productId);
    } else {
      window.location = "/";
    }
  }
  
  document.addEventListener("DOMContentLoaded", loadHeaderAndInitPage);
  