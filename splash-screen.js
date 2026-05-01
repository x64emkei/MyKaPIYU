// Splash Screen with Mode Selection
// Shows a loading screen with options to choose between modern and basic HTML mode (like Gmail)

class SplashScreen {
  constructor(options = {}) {
    this.options = {
      duration: 5000,
      minDisplayTime: 2000,
      showModeSelection: true, // Show mode choice on splash
      ...options
    };
    
    this.splashElement = null;
    this.startTime = null;
    this.modeSelected = false;
    this.init();
  }

  init() {
    // Create splash screen if it doesn't exist
    if (!document.getElementById('splash-screen')) {
      this.createSplashScreen();
    } else {
      this.splashElement = document.getElementById('splash-screen');
    }

    this.startTime = Date.now();

    // Hide splash when page loads (if no mode selected)
    if (document.readyState === 'complete') {
      this.scheduleAutoHide();
    } else {
      window.addEventListener('load', () => this.scheduleAutoHide());
    }

    // Fallback timeout
    setTimeout(() => {
      if (!this.modeSelected) {
        this.hideSplash();
      }
    }, this.options.duration);
  }

  createSplashScreen() {
    const splash = document.createElement('div');
    splash.id = 'splash-screen';
    splash.className = 'splash-screen';
    
    const hasBasicModePref = localStorage.getItem('lspu-basic-mode') === 'true';
    
    splash.innerHTML = `
      <div class="splash-screen-content">
        <div class="splash-logo">
          <i class="fa-solid fa-graduation-cap"></i>
        </div>
        <div class="splash-text">LSPU Portal</div>
        <div class="splash-subtext">Loading...</div>
        
        ${this.options.showModeSelection && !hasBasicModePref ? `
          <div class="splash-mode-selector">
            <div class="splash-mode-label">Choose your experience:</div>
            <div class="splash-mode-buttons">
              <button class="splash-mode-btn splash-mode-modern" id="modernModeBtn">
                <i class="fa-solid fa-sparkles"></i>
                <div>Modern UI</div>
                <small>Rich graphics & animations</small>
              </button>
              <button class="splash-mode-btn splash-mode-basic" id="basicModeBtn">
                <i class="fa-solid fa-code"></i>
                <div>Basic HTML</div>
                <small>Simple & fast</small>
              </button>
            </div>
          </div>
        ` : ''}
      </div>
    `;

    document.body.insertBefore(splash, document.body.firstChild);
    this.splashElement = splash;

    // Attach event listeners
    const modernBtn = document.getElementById('modernModeBtn');
    const basicBtn = document.getElementById('basicModeBtn');

    if (modernBtn) {
      modernBtn.addEventListener('click', () => {
        this.selectMode('modern');
      });
    }

    if (basicBtn) {
      basicBtn.addEventListener('click', () => {
        this.selectMode('basic');
      });
    }
  }

  selectMode(mode) {
    this.modeSelected = true;

    if (mode === 'basic') {
      localStorage.setItem('lspu-basic-mode', 'true');
      document.body.classList.add('basic-mode');
    } else {
      localStorage.setItem('lspu-basic-mode', 'false');
      document.body.classList.remove('basic-mode');
    }

    // Hide splash immediately after selection
    this.hideSplash();
  }

  scheduleAutoHide() {
    if (this.modeSelected) return;

    const elapsedTime = Date.now() - this.startTime;
    const remainingTime = Math.max(0, this.options.minDisplayTime - elapsedTime);

    setTimeout(() => this.hideSplash(), remainingTime);
  }

  hideSplash() {
    if (!this.splashElement) return;

    this.splashElement.classList.add('hidden');

    // Remove from DOM after animation
    setTimeout(() => {
      if (this.splashElement && this.splashElement.parentElement) {
        this.splashElement.remove();
      }
    }, 500);
  }

  show() {
    if (this.splashElement) {
      this.splashElement.classList.remove('hidden');
    }
  }
}

// Initialize splash screen when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new SplashScreen();
  });
} else {
  new SplashScreen();
}

