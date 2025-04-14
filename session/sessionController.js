import { buildAuthorizedSession, buildUnauthorizedSession } from "./sessionView.js";

export const sessionController = async (container) => {
  const token = localStorage.getItem("token");

  if (token) {
    try {
      const response = await fetch("http://localhost:8000/auth/me", {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });

      if (!response.ok) {
        throw new Error("Sesión inválida");
      }

      const user = await response.json();
      container.innerHTML = buildAuthorizedSession(user.username);

      const logoutButton = container.querySelector('.logout');
      logoutButton.addEventListener("click", () => {
        localStorage.removeItem("token");
        sessionController(container);
      });

    } catch (error) {
      localStorage.removeItem("token");
      container.innerHTML = buildUnauthorizedSession();
    }
  } else {
    container.innerHTML = buildUnauthorizedSession();
  }
};
