
class ThemeManager {
  constructor() {
    this.theme = localStorage.getItem("theme") || "light";
    this.init();
  }

  init() {
    this.applyTheme(this.theme);
    this.setupEventListeners();
    this.injectThemeSwitcher();
  }

  applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
    this.updateToggleButton(theme);

    // Добавляем анимацию переключения
    document.body.classList.add("theme-switching");
    setTimeout(() => {
      document.body.classList.remove("theme-switching");
    }, 500);
  }

  setupEventListeners() {
    // Обработка клавиатуры
    document.addEventListener("keydown", (e) => {
      if (e.altKey && e.key === "t") {
        e.preventDefault();
        this.toggleTheme();
      }
    });
  }

  injectThemeSwitcher() {
    const themeSwitcher = document.createElement("div");
    themeSwitcher.className = "theme-switcher";
    themeSwitcher.innerHTML = `
            <button class="theme-toggle" aria-label="Переключить тему">
                <span class="theme-icon"></span>
            </button>
        `;

    document.body.appendChild(themeSwitcher);

    // Добавляем обработчик клика
    const toggleButton = themeSwitcher.querySelector(".theme-toggle");
    toggleButton.addEventListener("click", () => {
      this.toggleTheme();
    });
  }

  toggleTheme() {
    this.theme = this.theme === "light" ? "dark" : "light";
    this.applyTheme(this.theme);
  }

  updateToggleButton(theme) {
    const button = document.querySelector(".theme-toggle");
    if (button) {
      button.setAttribute(
        "aria-label",
        theme === "light"
          ? "Переключить на темную тему"
          : "Переключить на светлую тему"
      );
    }
  }
}

// Инициализация при загрузке страницы
document.addEventListener("DOMContentLoaded", () => {
  new ThemeManager();
});

// Резервная инициализация для случаев, когда DOM уже загружен
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initTheme);
} else {
  initTheme();
}

function initTheme() {
  new ThemeManager();
}
