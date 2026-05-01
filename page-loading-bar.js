class PageLoadingBar {
  constructor() {
    this.bar = null;
    this.init();
  }

  init() {
    this.createBar();
    this.show();

    if (document.readyState === "complete") {
      this.hide();
    } else {
      window.addEventListener("load", () => this.hide());
    }

    window.addEventListener("beforeunload", () => this.show());
    document.addEventListener("submit", () => this.show(), true);
    document.addEventListener("click", (event) => this.handleLinkClick(event), true);
  }

  createBar() {
    if (document.getElementById("page-loading-bar")) return;

    const bar = document.createElement("div");
    bar.id = "page-loading-bar";
    bar.className = "page-loading-bar";
    bar.innerHTML = '<div class="page-loading-bar-indicator"></div>';
    document.body.prepend(bar);
    this.bar = bar;
  }

  show() {
    if (!this.bar) return;
    this.bar.classList.add("active");
  }

  hide() {
    if (!this.bar) return;
    this.bar.classList.remove("active");
  }

  handleLinkClick(event) {
    const target = event.target instanceof Element ? event.target.closest("a") : null;
    if (!target) return;

    const href = target.getAttribute("href");
    if (!href || href.startsWith("#") || href.startsWith("javascript:")) return;
    if (target.hasAttribute("download")) return;
    if (target.target && target.target !== "_self") return;

    this.show();
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => new PageLoadingBar());
} else {
  new PageLoadingBar();
}
