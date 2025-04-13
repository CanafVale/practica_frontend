export const createProduct = async (product) => {
  
  const token = localStorage.getItem("token");

  const response = await fetch("http://localhost:8000/api/products", {
    method: "POST",
    body: JSON.stringify(product),
    headers: {
      "Content-type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  });

  if (!response.ok) {
    const data = response.json();
    throw new Error("No se ha podido crear el producto")
  }
}
