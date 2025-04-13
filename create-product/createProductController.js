import { createProduct } from "./createProductModel.js";

export const createProductController = (form) => {
  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const name = form.querySelector('#name').value;
    const description = form.querySelector('#description').value;
    const price = parseFloat(form.querySelector('#price').value);
    const type = form.querySelector('#type').value;
    const tagsString = form.querySelector('#tags').value;
    const imageFile = form.querySelector('#image').files[0];

    const tags = tagsString
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag.length > 0);

    let imageUrl = "";

    try {
      
      const token = localStorage.getItem("token");

      if (imageFile) {
        const formData = new FormData();
        formData.append("file", imageFile);

        const response = await fetch("http://localhost:8000/upload", {
          method: "POST",
          body: formData,
          headers: {
            Authorization: `Bearer ${token}` 
          }
        });

        if (!response.ok) {
          throw new Error("Error al subir la imagen");
        }

        const data = await response.json();
        imageUrl = data.path;
      }

      const product = {
        name,
        description,
        price,
        type,
        tags,
        image: imageUrl
      };

      await createProduct(product);

      setTimeout(() => {
        window.location = "/";
      }, 2000);
    } catch (error) {
      alert(error.message);
    }
  });
};
