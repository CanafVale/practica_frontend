import {
  getProductDetail,
  getLoggedInUserInfo,
  deleteProduct
} from "./productDetailModel.js";

import {
  buildProductDetailView,
  buildRemoveProductButton
} from "./productDetailView.js";

export const productDetailController = async (container, productId) => {

  const showRemoveProductButton = async (product) => {
    try {
      const user = await getLoggedInUserInfo();
      if (user.id === product.userId) {
        const removeButton = buildRemoveProductButton();
        container.appendChild(removeButton);

        removeButton.addEventListener("click", async () => {
          const confirmed = confirm("¿estás seguro de borrar el producto?");
          if (confirmed) {
            await deleteProduct(productId);
            window.location = "/";
          }
        });
      }
    } catch (error) {
      // Si no hay sesión iniciada, no hacemos nada
    }
  };

  try {
    const product = await getProductDetail(productId);
    container.innerHTML = buildProductDetailView(product);

    await showRemoveProductButton(product);
  } catch (error) {
    alert(error.message);
  }
};
