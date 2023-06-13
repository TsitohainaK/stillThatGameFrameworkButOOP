export function ChangeDOMTitle(name: string) {
  document.title = name;
}

export function DOMContentLoaded(callback: Function) {
  if (document.readyState === "complete" || document.readyState === "interactive") {
    callback();
    return;
  }

  function done() {
    document.removeEventListener("DOMContentLoaded", done, true);
    window.removeEventListener("load", done, true);
    callback();
  }

  document.addEventListener("DOMContentLoaded", done, false);
  window.addEventListener("load", done, false);
}
