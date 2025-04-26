
import { sessionController } from "./session/sessionController.js";

export async function loadHeader() {
  
  const headerContainer = document.getElementById("header-container");
  const resp = await fetch("header.html");
  headerContainer.innerHTML = await resp.text();

  
  const sessionDiv = document.getElementById("session-container");
  await sessionController(sessionDiv);
}


loadHeader();
