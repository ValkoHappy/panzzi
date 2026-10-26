export function initNavigation() {
  const burgerMenu = document.getElementById("burger-menu"),
    navMenu = document.getElementById("nav-menu"),
    navbar = document.getElementById("navbar"),
    navOverlay = document.getElementById("nav-overlay");

  (burgerMenu &&
    navMenu &&
    (burgerMenu.addEventListener("click", () => {
      (burgerMenu.classList.toggle("active"),
        navMenu.classList.toggle("active"),
        document.body.classList.toggle("menu-open"),
        navOverlay && navOverlay.classList.toggle("active"));
    }),
    document.querySelectorAll(".nav-link").forEach((e) => {
      e.addEventListener("click", () => {
        (burgerMenu.classList.remove("active"),
          navMenu.classList.remove("active"),
          document.body.classList.remove("menu-open"),
          navOverlay && navOverlay.classList.remove("active"));
      });
    }),
    navOverlay &&
      navOverlay.addEventListener("click", () => {
        (burgerMenu.classList.remove("active"),
          navMenu.classList.remove("active"),
          document.body.classList.remove("menu-open"),
          navOverlay.classList.remove("active"));
      })),
    window.addEventListener("scroll", () => {
      navbar &&
        (window.scrollY > 50
          ? navbar.classList.add("scrolled")
          : navbar.classList.remove("scrolled"));
    }));

  let currentSlide = 0;

  const slides = document.querySelectorAll(".hero-slide"),
    totalSlides = slides.length;

  if (slides.length > 0) {
    function changeSlide() {
      (slides[currentSlide].classList.remove("active"),
        (currentSlide = (currentSlide + 1) % totalSlides),
        slides[currentSlide].classList.add("active"),
        setTimeout(changeSlide, 5e3));
    }
    setTimeout(changeSlide, 5e3);
  }

  (document.querySelectorAll('a[href^="#"]').forEach((e) => {
    e.addEventListener("click", function (e) {
      (e.preventDefault(),
        this.getAttribute("href") !== "#" &&
          document
            .querySelector(this.getAttribute("href"))
            ?.scrollIntoView({ behavior: "smooth" }));
    });
  }),
    document.querySelector(".scroll-down")?.addEventListener("click", () => {
      window.scrollBy({ top: window.innerHeight - 100, behavior: "smooth" });
    }));
}
