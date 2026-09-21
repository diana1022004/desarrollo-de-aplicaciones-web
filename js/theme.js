 (function () {
  var KEY = "theme";
  var root = document.documentElement;

  function read() {
    try { return localStorage.getItem(KEY); } catch (e) { return null; }
  }
  function write(value) {
    try { localStorage.setItem(KEY, value); } catch (e) { /* sin almacenamiento */ }
  }

  var saved = read();
  root.setAttribute("data-theme", saved === "light" || saved === "dark" ? saved : "dark");

  document.addEventListener("DOMContentLoaded", function () {
    var button = document.getElementById("themeToggle");
    if (!button) return;
    var label = document.getElementById("themeText");

    function paint() {
      var dark = root.getAttribute("data-theme") === "dark";
      if (label) label.textContent = dark ? "Modo claro" : "Modo oscuro";
      button.setAttribute("aria-label", dark ? "Cambiar a modo claro" : "Cambiar a modo oscuro");
    }

    button.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      write(next);
      paint();
      document.dispatchEvent(new CustomEvent("themechange", { detail: next }));
    });

    paint();
  });
})();
