 // Hero slider
      let currentSlide = 0;
      const slides = document.querySelectorAll(".hero-slide");
      const totalSlides = slides.length;

      function changeSlide() {
        slides[currentSlide].classList.remove("active");
        currentSlide = (currentSlide + 1) % totalSlides;
        slides[currentSlide].classList.add("active");
        setTimeout(changeSlide, 5000);
      }

      setTimeout(changeSlide, 5000);

      // Smooth scrolling for anchor links
      document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
          e.preventDefault();
          document.querySelector(this.getAttribute("href")).scrollIntoView({
            behavior: "smooth",
          });
        });
      });

      // Scroll down button
      document.querySelector(".scroll-down").addEventListener("click", () => {
        window.scrollBy({
          top: window.innerHeight - 100,
          behavior: "smooth",
        });
      });


      // Modal functionality
      let bodyScrollPosition = 0;

      function openModal(modalId) {
        bodyScrollPosition = window.scrollY;
        document.body.style.position = "fixed";
        document.body.style.top = `-${bodyScrollPosition}px`;
        document.body.style.width = "100%";
        document.body.style.overflow = "hidden";
        document.getElementById(modalId).style.display = "flex";
      }

      function closeModal(modalId) {
        document.getElementById(modalId).style.display = "none";
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.overflow = "";
        window.scrollTo(0, bodyScrollPosition);
      }

      document.querySelectorAll(".show-modal").forEach((button) => {
        button.addEventListener("click", function () {
          openModal(this.getAttribute("data-modal"));
        });
      });

      document.querySelectorAll(".close-modal").forEach((span) => {
        span.addEventListener("click", function () {
          closeModal(this.closest(".modal").id);
        });
      });

      window.addEventListener("click", function (event) {
        if (event.target.classList.contains("modal")) {
          closeModal(event.target.id);
        }
      });