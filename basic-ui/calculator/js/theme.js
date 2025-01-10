window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", (event) => {
    userPreferredTheme = event.matches ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", userPreferredTheme);
  });

document.getElementById("theme-toggle").addEventListener("click", () => {
  const currentTheme = document.documentElement.getAttribute("data-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";

  document.documentElement.setAttribute("data-theme", newTheme);
});

function initializeTheme() {
  const systemPrefersDark = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;

  if (systemPrefersDark) {
    document.documentElement.setAttribute("data-theme", "dark");
  } else {
    document.documentElement.setAttribute("data-theme", "light");
  }
}

initializeTheme();
