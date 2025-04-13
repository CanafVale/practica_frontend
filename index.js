
import { loaderController } from "./loader/loaderController.js";
import { notificationsController } from "./notifications/notificationsController.js";
import { sessionController } from "./session/sessionController.js";
import { showTweetsController } from "./show-tweets/showTweetsController.js";

document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".tweets-container")
  const loader = document.querySelector(".loader")
  const notifications = document.querySelector(".notifications")
  const session = document.querySelector(".session")

  const { show, hide } = loaderController(loader)
  const { showNotification } = notificationsController(notifications)

  container.addEventListener('load-tweets-started', () => {
    show()
  })
  container.addEventListener('load-tweets-finished', () => {
    hide()
    showNotification('ya he terminado de cargar tweets')
  })
  container.addEventListener('load-tweets-error', (event) => {
    const errorMesage = event.detail;
    showNotification(errorMesage)
  })

  showTweetsController(container)
  sessionController(session)
  
})


