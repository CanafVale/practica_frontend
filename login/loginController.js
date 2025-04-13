import { REGEXP } from "../utils/constants.js";
import { loginUser } from "./loginModel.js";

export function loginController(loginForm) {
  
  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();
  
    const userEmailElement = loginForm.querySelector("#mail");
    const passwordElement = loginForm.querySelector("#password");
    
    const userEmail = userEmailElement.value;
    const password = passwordElement.value;

    const emailRegExp = new RegExp(REGEXP.mail);
    if (!emailRegExp.test(userEmail)) {
      alert('El formato del email es incorrecto');
    } else {
      handleLoginUser(userEmail, password);
    }
  });

  async function handleLoginUser(userEmail, password) {
    try {
      const token = await loginUser(userEmail, password);
      localStorage.setItem("token", token);
      window.location = "/"; // Redirige al inicio
    } catch (error) {
      alert(error.message);
    }
  }
}