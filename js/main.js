document.addEventListener("DOMContentLoaded", () => {

  // --- NAVIGATION & INTERACTION ---
  const navbar = document.getElementById("navbar");
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("navMenu");
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("section");

  // Hamburger Toggle
  if (hamburger) {
    hamburger.addEventListener("click", () => {
      navMenu.classList.toggle("active");
      const isActive = navMenu.classList.contains("active");

      hamburger.querySelector("span:nth-child(1)").style.transform = isActive
        ? "rotate(45deg) translate(5px, 6px)"
        : "none";

      hamburger.querySelector("span:nth-child(2)").style.opacity = isActive
        ? "0"
        : "1";

      hamburger.querySelector("span:nth-child(3)").style.transform = isActive
        ? "rotate(-45deg) translate(5px, -7px)"
        : "none";
    });
  }

  // Close menu on click
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active");
    });
  });

  // Intersection Observer
  const observerOptions = {
    root: null,
    threshold: 0.1,
    rootMargin: "0px 0px -10% 0px",
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {

      if (entry.isIntersecting && entry.target.classList.contains("reveal")) {
        entry.target.classList.add("visible");
      }

      if (entry.isIntersecting && entry.target.tagName === "SECTION") {
        const id = entry.target.getAttribute("id");
        navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${id}`) {
            link.classList.add("active");
          }
        });
      }

    });
  }, observerOptions);

  sections.forEach((section) => sectionObserver.observe(section));
  document.querySelectorAll(".reveal")
    .forEach((reveal) => sectionObserver.observe(reveal));

  // Navbar scroll background
  window.addEventListener("scroll", () => {
    if (navbar) {
      navbar.classList.toggle("scrolled", window.scrollY > 50);
    }
  }, { passive: true });

  /* ========================= */
  /* PORTFOLIO TAB SWITCH FIX */
  /* ========================= */
  const psTabs = document.querySelectorAll(".ps-tab");
  const psContents = document.querySelectorAll(".ps-content");

  if (psTabs.length > 0) {
    psTabs.forEach(tab => {
      tab.addEventListener("click", () => {

        psTabs.forEach(t => t.classList.remove("active"));
        psContents.forEach(c => c.classList.remove("active"));

        tab.classList.add("active");

        const target = document.getElementById(tab.dataset.tab);
        if (target) {
          target.classList.add("active");
        }

      });
    });
  }

});