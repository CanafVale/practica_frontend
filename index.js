import { loaderController } from "./loader/loaderController.js";
import { notificationsController } from "./notifications/notificationsController.js";
import { sessionController } from "./session/sessionController.js";
import { showProductsController } from "./show-products/showProductsController.js";

document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".products-container"); 
  const loader = document.querySelector(".loader");
  const notifications = document.querySelector(".notifications");
  const session = document.querySelector(".session");

  const { show, hide } = loaderController(loader);
  const { showNotification } = notificationsController(notifications);

  container.addEventListener("load-products-started", () => {
    show();
  });

  container.addEventListener("load-products-finished", () => {
    hide();
    showNotification("Ya he terminado de cargar productos");
  });

  container.addEventListener("load-products-error", (event) => {
    const errorMessage = event.detail;
    showNotification(errorMessage);
  });

  showProductsController(container);
  sessionController(session);
});
