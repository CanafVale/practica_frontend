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

    // validar formato del email
    const emailRegExp = REGEXP.mail;
    if (!emailRegExp.test(email)) {
      errors.push('El formato del email es incorrecto')
    }

    // comprobar que las contraseñas son iguales
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
      const event = new CustomEvent("register-ok", {
        detail: {
          message: 'Te has registrado correctamente',
          type: 'success'
        }
      });
      form.dispatchEvent(event)
      setTimeout(() => {
        window.location = '/'
      }, 5000);
    } catch (error) {
      const event = new CustomEvent("register-error", {
        detail: error
      });
      form.dispatchEvent(event)
    }
  }
}
