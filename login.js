import { loginController } from "./login/loginController.js"
 
document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.querySelector("form")
  loginController(loginForm)
})
