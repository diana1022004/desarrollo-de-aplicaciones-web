/* Página principal: arma la lista de trabajos a partir de js/projects.js,
   los filtros, el "Último trabajo" y el contador de visitas de la sesión
   (sessionStorage). */
(function () {
  var SITE = window.SITE || {};
  var PROJECTS = window.PROJECTS || [];

  var ARROW =
    '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" ' +
    'stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
    '<path d="M5 12h14M13 6l6 6-6 6"/></svg>';

  function $(selector) { return document.querySelector(selector); }

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  function isExternal(url) { return /^https?:\/\//i.test(url); }

  function openInNewTab(anchor) {
    anchor.target = "_blank";
    anchor.rel = "noopener";
  }

  function metaOf(project) {
    if (project.meta) return project.meta;
    return project.clase ? "Clase " + project.clase : "";
  }

  /* ---------- Enlaces al repositorio ---------- */
  document.querySelectorAll("[data-repo-link]").forEach(function (a) {
    if (SITE.repo) a.href = SITE.repo;
  });

  /* ---------- Lista de trabajos ---------- */
  var list = $("#projectList");
  var rows = [];

  function buildRow(project) {
    var row = el("article", "row");
    row.dataset.type = project.type || "";

    row.appendChild(el("p", "row-meta", metaOf(project)));

    var main = el("div", "row-main");
    var title = el("h3", "row-title");
    var link = el("a", "row-link", project.title);
    link.href = project.href;
    if (isExternal(project.href)) {
      openInNewTab(link);
      link.appendChild(el("span", "sr-only", " (se abre en una pestaña nueva)"));
    }
    title.appendChild(link);
    main.appendChild(title);
    if (project.description) main.appendChild(el("p", "row-desc", project.description));
    if (project.code) {
      var code = el("a", "row-code", "Ver código");
      code.href = project.code;
      openInNewTab(code);
      main.appendChild(code);
    }
    row.appendChild(main);

    var tags = el("ul", "row-tags");
    tags.setAttribute("aria-label", "Etiquetas");
    [project.type].concat(project.tags || []).forEach(function (tag) {
      if (tag) tags.appendChild(el("li", "", tag));
    });
    row.appendChild(tags);

    var arrow = el("span", "row-arrow");
    arrow.setAttribute("aria-hidden", "true");
    arrow.innerHTML = ARROW;
    row.appendChild(arrow);

    return row;
  }

  PROJECTS.forEach(function (project) {
    var row = buildRow(project);
    rows.push(row);
    list.appendChild(row);
  });

  var soon = null;
  if (SITE.comingSoon) {
    soon = el("div", "row row-soon");
    soon.appendChild(el("p", "row-meta", "Próximamente"));
    soon.appendChild(el("p", "row-desc", "El próximo trabajo de la clase aparecerá aquí."));
    list.appendChild(soon);
  }

  /* ---------- Filtros ---------- */
  var filters = $("#filters");
  var types = ["Todos"];
  PROJECTS.forEach(function (p) {
    if (p.type && types.indexOf(p.type) === -1) types.push(p.type);
  });

  var buttons = types.map(function (type) {
    var button = el("button", "pill filter", type);
    button.type = "button";
    button.setAttribute("aria-pressed", type === "Todos" ? "true" : "false");
    button.addEventListener("click", function () { applyFilter(type); });
    filters.appendChild(button);
    return button;
  });

  function applyFilter(type) {
    rows.forEach(function (row) {
      row.hidden = !(type === "Todos" || row.dataset.type === type);
    });
    if (soon) soon.hidden = type !== "Todos";
    buttons.forEach(function (button) {
      button.setAttribute("aria-pressed", button.textContent === type ? "true" : "false");
    });
  }

  if (types.length < 3) filters.hidden = true;

  /* ---------- Último trabajo (panel del inicio) ---------- */
  var latest = PROJECTS[0];
  if (latest) {
    $("#latestTitle").textContent = latest.title;
    $("#latestDesc").textContent = latest.description || "";
    var latestLink = $("#latestLink");
    latestLink.href = latest.href;
    if (isExternal(latest.href)) openInNewTab(latestLink);
  }
  $("#projectCount").textContent = PROJECTS.length;

  /* ---------- Contador de visitas de la sesión (sessionStorage) ---------- */
  var visits = 1;
  try {
    visits = Number(sessionStorage.getItem("sessionVisits") || 0) + 1;
    sessionStorage.setItem("sessionVisits", visits);
    if (!sessionStorage.getItem("sessionStart")) {
      sessionStorage.setItem("sessionStart", new Date().toLocaleString("es-CO"));
    }
  } catch (e) { /* sin almacenamiento */ }
  $("#visitCount").textContent = visits;

  function paintStorageInfo() {
    var dark = document.documentElement.getAttribute("data-theme") === "dark";
    $("#storageInfo").textContent =
      "Tema guardado en localStorage: " + (dark ? "oscuro" : "claro") +
      ". Visitas de esta sesión: " + visits + ".";
  }
  paintStorageInfo();
  document.addEventListener("themechange", paintStorageInfo);

  $("#year").textContent = new Date().getFullYear();

  /* ---------- Resalta la sección visible en el menú ---------- */
  var links = document.querySelectorAll(".nav-pill a");
  var sections = Array.prototype.map.call(links, function (a) {
    return document.getElementById(a.getAttribute("href").slice(1));
  });

  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        links.forEach(function (a) {
          var active = a.getAttribute("href") === "#" + entry.target.id;
          a.classList.toggle("is-active", active);
          if (active) a.setAttribute("aria-current", "true");
          else a.removeAttribute("aria-current");
        });
      });
    }, { rootMargin: "-40% 0px -55% 0px" });
    sections.forEach(function (section) { if (section) observer.observe(section); });
  }
})();
