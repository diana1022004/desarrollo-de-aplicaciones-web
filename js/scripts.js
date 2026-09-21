document.addEventListener("DOMContentLoaded", () => {
    const body = document.body;
    const themeToggle = document.getElementById("themeToggle");
    const themeIcon = document.getElementById("themeIcon");
    const themeText = document.getElementById("themeText");
    const sessionMessage = document.getElementById("sessionMessage");
    const storageInfo = document.getElementById("storageInfo");

    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
        body.classList.add("dark-mode");
    } else if (savedTheme === "light") {
        body.classList.add("light-mode");
    }

    function updateThemeButton() {
        const darkMode = body.classList.contains("dark-mode");

        if (darkMode) {
            themeIcon.textContent = "☀️";
            themeText.textContent = "Modo claro";
            themeToggle.setAttribute("aria-label", "Cambiar a modo claro");
        } else {
            themeIcon.textContent = "🌙";
            themeText.textContent = "Modo oscuro";
            themeToggle.setAttribute("aria-label", "Cambiar a modo oscuro");
        }
    }

    themeToggle.addEventListener("click", () => {
        const willBeDark = !body.classList.contains("dark-mode");

        body.classList.toggle("dark-mode", willBeDark);
        body.classList.toggle("light-mode", !willBeDark);

        localStorage.setItem("theme", willBeDark ? "dark" : "light");

        updateThemeButton();
    });

    updateThemeButton();

    
    let visits = Number(sessionStorage.getItem("sessionVisits") || 0);
    visits += 1;
    sessionStorage.setItem("sessionVisits", visits);

    const sessionStart = sessionStorage.getItem("sessionStart");
    if (!sessionStart) {
        sessionStorage.setItem("sessionStart", new Date().toLocaleString("es-CO"));
    }

    sessionMessage.textContent = `Has visitado esta página ${visits} vez${visits === 1 ? "" : "es"} durante esta sesión.`;

    const savedThemeText = localStorage.getItem("theme") === "dark" ? "oscuro" : "claro";
    storageInfo.textContent = `Tema guardado en localStorage: ${savedThemeText} · Visitas de esta sesión: ${visits}`;
});
