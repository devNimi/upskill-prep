// Theme management class
class ThemeManager {
  constructor() {
    this.themeToggle = document.getElementById("theme-toggle");
    this.root = document.documentElement;
    this.mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    // Initialize theme
    this.initializeTheme();
    // Set up event listeners
    this.setupEventListeners();
  }

  initializeTheme() {
    // Check for saved preference first
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      this.setTheme(savedTheme);
    } else {
      // Otherwise use system preference
      this.setTheme(this.mediaQuery.matches ? "dark" : "light");
    }
  }

  setupEventListeners() {
    // Theme toggle button click
    this.themeToggle.addEventListener("click", () => {
      const currentTheme = this.root.getAttribute("data-theme");
      const newTheme = currentTheme === "dark" ? "light" : "dark";
      this.setTheme(newTheme);
    });

    // System theme change
    this.mediaQuery.addEventListener("change", (e) => {
      if (!localStorage.getItem("theme")) {
        // Only update if user hasn't manually set a preference
        this.setTheme(e.matches ? "dark" : "light");
      }
    });
  }

  setTheme(theme) {
    this.root.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);

    // Update toggle button text/icon
    const icon = theme === "dark" ? "🌙" : "☀️";
    this.themeToggle.querySelector(".icon").textContent = icon;
  }
}

// Initialize theme manager when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  new ThemeManager();
});
