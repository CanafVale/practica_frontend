import { createTweetController } from "./create-tweet/createTweetController.js";

document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem('token');

  if (!token) {
    window.location = '/login.html'
  }

  const createTweetForm = document.querySelector('form')
  createTweetController(createTweetForm)
})
