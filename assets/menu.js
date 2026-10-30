(function () {
  const toggleBtn = document.getElementById("menu-toggle");
  const mobileMenu = document.getElementById("mobile-menu");
  const iconMenu = document.getElementById("icon-menu");
  const iconClose = document.getElementById("icon-close");

  function closeMenu() {
    mobileMenu.classList.add("hidden");
    mobileMenu.classList.remove("flex");
    toggleBtn.setAttribute("aria-expanded", "false");
    toggleBtn.setAttribute("aria-label", "Open menu");
    iconMenu.classList.remove("hidden");
    iconClose.classList.add("hidden");
  }

  toggleBtn.addEventListener("click", () => {
    const isOpen = !mobileMenu.classList.contains("hidden");
    if (isOpen) {
      closeMenu();
    } else {
      mobileMenu.classList.remove("hidden");
      mobileMenu.classList.add("flex");
      toggleBtn.setAttribute("aria-expanded", "true");
      toggleBtn.setAttribute("aria-label", "Close menu");
      iconMenu.classList.add("hidden");
      iconClose.classList.remove("hidden");
    }
  });

  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });
})();
