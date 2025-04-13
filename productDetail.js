import { tweetDetailController } from "./tweet-detail/tweetDetailController.js";

document.addEventListener("DOMContentLoaded", () => {

  // fuera del controlador -  sacar id de la url
  const searchParams = new URLSearchParams(window.location.search);
  const tweetId = searchParams.get("id");

  // fuera del controlador - gestionar id inexistente
  if (tweetId) {
    const tweetContainer = document.querySelector(".tweet-container")
    // ejecutar un controlador
    tweetDetailController(tweetContainer, tweetId)
  } else {
    window.location = '/'
  }


})
