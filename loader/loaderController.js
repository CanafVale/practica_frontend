export function loaderController(loader) {

  const show = () => {
    loader.classList.remove("hidden");
  }
  const hide = () => {
    loader.classList.add("hidden");
  }

  return {
    show,
    hide
  }
}
