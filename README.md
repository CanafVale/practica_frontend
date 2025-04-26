
 # AnaPop (Frontend con JavaScript)

Esta práctica forma parte del Bootcamp "Frontend con JavaScript" y cumple todos los requisitos funcionales mínimos (y varios opcionales) para gestionar anuncios de compra/venta.

---

## Características principales

- **Listado de anuncios** (titular, descripción, precio, tipo, foto, usuario, fecha)
- **Detalle de anuncio** (ver foto, descripción detallada, botón de borrado para el propietario)
- **Creación de anuncio** (subida de imagen opcional, tags dinámicos, validaciones)
- **Autenticación** (Login / Registro con JWT, formularios gestionados con estados de carga/error/éxito)
- **Gestión de sesión** (pintado dinámico de cabecera: Login/Registro vs. Hola usuario / Cerrar sesión / Crear anuncio)
- **UX amigable** con loaders animados, notificaciones customizables y paginación/búsquedas en vivo

---



## Instalación y ejecución

### 1. Backend con Sparrest.js (json-server)
> El backend simulado está en el repositorio **sparrest.js** (json-server + JWT + upload).

```bash
# Clona el repo de sparrest.js y arranca el servidor
git clone https://github.com/albertocasero/sparrest.js.git
cd sparrest.js
npm install
npm start         # por defecto en http://localhost:8000
```

### 2. Frontend AnaPop

```bash
# Clona este repositorio
git clone https://github.com/tu-usuario/practica_frontend.git
cd practica_frontend

# Arranca el frontend con Live Server (VSCode)
```

- Abre en tu navegador: `http://127.0.0.1:8080/index.html` (o el puerto que use tu servidor estático)
- El frontend consumirá automáticamente la API de Sparrest en `http://localhost:8000`.

---

## Personalización

- **Loader**: modifica `loader.css` o sustituye el `<div class="loader">` con tu propia animación.
- **Notificaciones**: adapta colores y tipografías en `notifications/notifications.css`.
- **Temas y fuentes**: ajusta las variables CSS en `styles/main.css`.

---

## Buenas prácticas y arquitectura

- **Patrón MVC**:  
  - _Model_: llamadas a `fetch()` y lógica de acceso a datos en `*/Model.js`.  
  - _View_: funciones puras que generan HTML en `*/View.js`.  
  - _Controller_: orquesta eventos, disparo de CustomEvents, validaciones y navegación en `*/Controller.js`.  
- **Eventos personalizados**:  
  - `load-products-started` / `...-finished` / `...-error` para desacoplar lógica de carga y UI.  
  - `register-ok` / `register-error` y `login-ok` / `login-error` para formularios.  
- **Single entrypoint** (`init.js`) para la cabecera común y sesión.  
- **Sin frameworks** de JavaScript: puro ES Modules y DOM API.

---

## Recursos

- [Documentación JSON-Server](https://github.com/typicode/json-server)
- [Sparrest.js (API de apoyo)](https://github.com/albertocasero/sparrest.js)
- [Bootstrap 5](https://getbootstrap.com/)
- [Tailwind CDN](https://tailwindcss.com/docs/installation)

---
