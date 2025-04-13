import { createProduct } from "./createProductModel.js";

export const createProductController = (form) => {
  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const name = form.querySelector('#name').value;
    const description = form.querySelector('#description').value;
    const price = parseFloat(form.querySelector('#price').value);
    const type = form.querySelector('#type').value;

    const product = {
      name,
      description,
      price,
      type
    };

    try {
      await createProduct(product);  
      setTimeout(() => {
        window.location = '/';
      }, 2000);
    } catch (error) {
      alert(error.message);
    }
  });
};
