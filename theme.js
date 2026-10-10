/**
 * js/theme.js
 * Переключение темы и акцентного цвета.
 */

const THEMES = ["light", "dark", "contrast"];
const themeButtons = document.querySelectorAll("[data-theme-value]");
const accentInput = document.getElementById("accent-color");
const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");

function markThemeButtons(theme) {
  themeButtons.forEach((button) => {
    const active = button.dataset.themeValue === theme;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", active ? "true" : "false");
  });
}

function applyTheme(theme, save) {
  document.documentElement.setAttribute("data-theme", theme);
  markThemeButtons(theme);
  if (save) {
    localStorage.setItem("am-theme", theme);
  }
}

function hexToRgb(hex) {
  const value = hex.replace("#", "");
  return {
    r: parseInt(value.slice(0, 2), 16),
    g: parseInt(value.slice(2, 4), 16),
    b: parseInt(value.slice(4, 6), 16)
  };
}

function applyAccent(hex, save) {
  const color = hexToRgb(hex);
  const root = document.documentElement.style;
  root.setProperty("--color-accent", hex);
  root.setProperty("--accent-rgb", color.r + ", " + color.g + ", " + color.b);
  accentInput.value = hex;
  if (save) {
    localStorage.setItem("am-accent", hex);
  }
}

themeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    applyTheme(button.dataset.themeValue, true);
  });
});

accentInput.addEventListener("input", () => {
  applyAccent(accentInput.value, true);
});

systemTheme.addEventListener("change", (event) => {
  if (localStorage.getItem("am-theme")) return;
  applyTheme(event.matches ? "dark" : "light", false);
});

const current = document.documentElement.getAttribute("data-theme") || "light";
markThemeButtons(THEMES.includes(current) ? current : "light");

const savedAccent = localStorage.getItem("am-accent");
if (savedAccent && /^#[0-9a-fA-F]{6}$/.test(savedAccent)) {
  accentInput.value = savedAccent;
}
