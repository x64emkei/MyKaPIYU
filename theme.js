document.addEventListener('DOMContentLoaded', () => {
  const themeToggleBtns = document.querySelectorAll('.theme-toggle');
  
  // Check local storage or system preference
  const currentTheme = localStorage.getItem('theme') || 
    (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");

  if (currentTheme === 'dark') {
    document.body.setAttribute('data-theme', 'dark');
    updateToggleIcons('dark');
  } else {
    updateToggleIcons('light');
  }

  themeToggleBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const current = document.body.getAttribute('data-theme');
      if (current === 'dark') {
        document.body.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
        updateToggleIcons('light');
      } else {
        document.body.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        updateToggleIcons('dark');
      }
    });
  });

  function updateToggleIcons(theme) {
    themeToggleBtns.forEach(btn => {
      if (theme === 'dark') {
        btn.innerHTML = '<i class="fa-solid fa-sun text-accent"></i>';
      } else {
        btn.innerHTML = '<i class="fa-solid fa-moon text-muted"></i>';
      }
    });
  }
});
