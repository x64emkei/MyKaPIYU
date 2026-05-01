// Basic HTML Mode Toggle Functionality
// Allows users to switch between modern UI and lightweight HTML mode
// Integrates with splash screen mode selection

class BasicHTMLMode {
  constructor() {
    this.storageKey = 'lspu-basic-mode';
    this.init();
  }

  init() {
    // Check localStorage (set by splash screen or previous selection)
    if (localStorage.getItem(this.storageKey) === 'true') {
      this.enable();
    }

    // Create toggle button in header
    this.createToggleButton();

    // Listen for mode changes from other tabs/windows
    window.addEventListener('storage', (e) => {
      if (e.key === this.storageKey) {
        if (e.newValue === 'true') {
          this.enable();
        } else {
          this.disable();
        }
      }
    });
  }

  createToggleButton() {
    const header = document.querySelector('.top-header');
    if (!header) return;

    // Check if button already exists
    if (document.getElementById('html-mode-toggle-btn')) return;

    const toggleBtn = document.createElement('button');
    toggleBtn.id = 'html-mode-toggle-btn';
    toggleBtn.className = 'html-mode-toggle';
    toggleBtn.title = 'Toggle Basic HTML Mode';
    toggleBtn.innerHTML = '<i class="fa-solid fa-code"></i> <span class="mode-text">Basic</span>';

    if (document.body.classList.contains('basic-mode')) {
      toggleBtn.classList.add('active');
    }

    toggleBtn.addEventListener('click', (e) => {
      e.preventDefault();
      this.toggle();
    });

    // Insert before theme toggle or at end of header
    const themeToggle = header.querySelector('.theme-toggle');
    if (themeToggle) {
      themeToggle.parentElement.insertBefore(toggleBtn, themeToggle);
    } else {
      header.appendChild(toggleBtn);
    }
  }

  enable() {
    document.body.classList.add('basic-mode');
    localStorage.setItem(this.storageKey, 'true');

    // Update button state
    const btn = document.getElementById('html-mode-toggle-btn');
    if (btn) {
      btn.classList.add('active');
      btn.title = 'Click to enable modern mode';
    }

    // Log for debugging
    console.log('[BasicHTMLMode] Enabled');
  }

  disable() {
    document.body.classList.remove('basic-mode');
    localStorage.setItem(this.storageKey, 'false');

    // Update button state
    const btn = document.getElementById('html-mode-toggle-btn');
    if (btn) {
      btn.classList.remove('active');
      btn.title = 'Click to enable basic HTML mode';
    }

    // Log for debugging
    console.log('[BasicHTMLMode] Disabled');
  }

  toggle() {
    if (document.body.classList.contains('basic-mode')) {
      this.disable();
    } else {
      this.enable();
    }
  }

  // Programmatically set mode
  setMode(mode) {
    if (mode === 'basic') {
      this.enable();
    } else {
      this.disable();
    }
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.basicHTMLMode = new BasicHTMLMode();
  });
} else {
  window.basicHTMLMode = new BasicHTMLMode();
}
