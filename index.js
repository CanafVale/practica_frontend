import { loaderController } from "./loader/loaderController.js";
import { notificationsController } from "./notifications/notificationsController.js";
import { sessionController } from "./session/sessionController.js";
import { showProductsController } from "./show-products/showProductsController.js";

document.addEventListener("DOMContentLoaded", async () => {
  const container = document.querySelector(".products-container"); 
  const loader = document.querySelector(".loader");
  const notifications = document.querySelector(".notifications");
  const searchInput = document.getElementById("search-input");
  const headerHtml = await fetch("header.html").then(res => res.text());
  document.getElementById("header-container").innerHTML = headerHtml;

  const { show, hide } = loaderController(loader);
  const { showNotification } = notificationsController(notifications);

  let shouldNotify = true;
  let currentSearch = "";

  container.addEventListener("load-products-started", () => {
    show();
  });

  container.addEventListener("load-products-finished", (event) => {
    hide();
  
    if (!event.detail?.silent) {
      showNotification("Ya he terminado de cargar productos");
    }
  });
  

  container.addEventListener("load-products-error", (event) => {
    const errorMessage = event.detail;
    showNotification(errorMessage);
  });


  searchInput.addEventListener("input", () => {
    currentSearch = searchInput.value.trim();
    showProductsController(container, currentSearch);
  });


  showProductsController(container, currentSearch);

  const session = document.querySelector(".session");
  sessionController(session);
});
