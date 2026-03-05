// --- NAVIGATION & INTERACTION ---
const navbar = document.getElementById("navbar");
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("navMenu");
const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("section");

// Hamburger Toggle
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

// Close menu on click
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active");
  });
});

// Intersection Observer for Scroll Navigation
const observerOptions = {
  root: null,
  threshold: 0.1, // Nilai lebih kecil agar animasi terpicu lebih cepat
  rootMargin: "0px 0px -10% 0px", // Kurangi margin bawah agar elemen muncul sebelum sampai tengah
};

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    // Reveal animation - Trigger saat elemen mulai masuk viewport
    if (entry.isIntersecting && entry.target.classList.contains("reveal")) {
      entry.target.classList.add("visible");
    }

    // Update nav underline - Trigger saat section mendominasi viewport
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
document
  .querySelectorAll(".reveal")
  .forEach((reveal) => sectionObserver.observe(reveal));

// Background Navbar change
window.addEventListener(
  "scroll",
  () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  },
  { passive: true },
);
