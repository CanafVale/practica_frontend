import { REGEXP } from "../utils/constants.js";
import { createUser } from "./registerModel.js";

export const registerController = (form) => {
  
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const nameElement = form.querySelector('#name');
    const name = nameElement.value;
    const emailElement = form.querySelector('#email');
    const email = emailElement.value;
    const passwordElement = form.querySelector('#password');
    const password = passwordElement.value;
    const passwordConfirmElement = form.querySelector('#password-confirm');
    const passwordConfirm = passwordConfirmElement.value;
    const errors = []

    // validate email format
    const emailRegExp = REGEXP.mail;
    if (!emailRegExp.test(email)) {
      errors.push('El formato del email es incorrecto')
    }

    // check passwords
    if (password !== passwordConfirm) {
      errors.push('Las contraseñas no son iguales')
    }

    if(errors.length === 0) {
      handleCreateUser(name, email, password, form)
    } else {
      errors.forEach(error => {
        const event = new CustomEvent("register-error", {
          detail: error
        });
        form.dispatchEvent(event)
      })
    }
  })

  const handleCreateUser = async (name, email, password, form) => {
    try {
      await createUser(name, email, password);
      const okEvent = new CustomEvent("register-ok", {
        detail: {
          message: 'Te has registrado correctamente. Se te redigirá a la página principal para que puedas iniciar sesión',
          type: 'success'
        }
      });
      form.dispatchEvent(okEvent);

      setTimeout(() => {
        window.location = "login.html";
      }, 3000);
    } catch (error) {
      const errEvent = new CustomEvent("register-error", {
        detail: error.message || "Error inesperado al registrar el usuario",
      });
      form.dispatchEvent(errEvent);
    }
  }
}
