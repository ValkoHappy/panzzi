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

// Gallery data (replace with your actual images)
const galleryData = {
  dishes: [
    { src: "content/services/dishes/photo_1_2025-07-06_13-26-00.jpg", alt: "Посуда 1" },
    { src: "content/services/dishes/photo_2_2025-07-06_13-26-00.jpg", alt: "Посуда 2" },
    { src: "content/services/dishes/photo_3_2025-07-06_13-26-00.jpg", alt: "Посуда 3" },
    { src: "content/services/dishes/photo_4_2025-07-06_13-26-00.jpg", alt: "Посуда 4" },
    { src: "content/services/dishes/photo_5_2025-07-06_13-26-00.jpg", alt: "Посуда 5" },
    { src: "content/services/dishes/photo_6_2025-07-06_13-26-00.jpg", alt: "Посуда 6" },
    { src: "content/services/dishes/photo_7_2025-07-06_13-26-00.jpg", alt: "Посуда 7" },
    { src: "content/services/dishes/photo_8_2025-07-06_13-26-00.jpg", alt: "Посуда 8" },
    { src: "content/services/dishes/photo_9_2025-07-06_13-26-00.jpg", alt: "Посуда 9" },
  ],
  lighting: [
    { src: "content/services/lighting/photo_1_2025-07-06_13-34-13.jpg", alt: "Освещение 1" },
    { src: "content/services/lighting/photo_2_2025-07-06_13-34-13.jpg", alt: "Освещение 2" },
    { src: "content/services/lighting/photo_3_2025-07-06_13-34-13.jpg", alt: "Освещение 3" },
    { src: "content/services/lighting/photo_4_2025-07-06_13-34-13.jpg", alt: "Освещение 4" },
    { src: "content/services/lighting/photo_5_2025-07-06_13-34-13.jpg", alt: "Освещение 5" },
    { src: "content/services/lighting/photo_6_2025-07-06_13-34-13.jpg", alt: "Освещение 6" },
    { src: "content/services/lighting/photo_7_2025-07-06_13-34-13.jpg", alt: "Освещение 7" },
  ],
  furniture: [
    { src: "content/services/furniture/photo_1_2025-07-06_13-29-46.jpg", alt: "Мебель 1" },
    { src: "content/services/furniture/photo_2_2025-07-06_13-29-46.jpg", alt: "Мебель 2" },
    { src: "content/services/furniture/photo_3_2025-07-06_13-29-46.jpg", alt: "Мебель 3" },
    { src: "content/services/furniture/photo_4_2025-07-06_13-29-46.jpg", alt: "Мебель 4" },
    { src: "content/services/furniture/photo_5_2025-07-06_13-29-46.jpg", alt: "Мебель 5" },
    { src: "content/services/furniture/photo_6_2025-07-06_13-29-46.jpg", alt: "Мебель 6" },
    { src: "content/services/furniture/photo_7_2025-07-06_13-29-46.jpg", alt: "Мебель 7" },
  ],
    materials: [
    { src: "content/services/materials/photo_1_2025-07-06_13-38-58.jpg", alt: "Материал 1" },
    { src: "content/services/materials/photo_2_2025-07-06_13-38-58.jpg", alt: "Материал 2" },
    { src: "content/services/materials/photo_3_2025-07-06_13-38-58.jpg", alt: "Материал 3" },
    { src: "content/services/materials/photo_4_2025-07-06_13-38-58.jpg", alt: "Материал 4" },
    { src: "content/services/materials/photo_5_2025-07-06_13-38-58.jpg", alt: "Материал 5" },
  ],
    turnkey_projects: [
    { src: "content/services/turnkey_projects/photo_1_2025-07-06_13-36-40.jpg", alt: "Проект под ключ 1" },
    { src: "content/services/turnkey_projects/photo_2_2025-07-06_13-36-40.jpg", alt: "Проект под ключ 2" },
    { src: "content/services/turnkey_projects/photo_3_2025-07-06_13-36-40.jpg", alt: "Проект под ключ 3" },
    { src: "content/services/turnkey_projects/photo_4_2025-07-06_13-36-40.jpg", alt: "Проект под ключ 4" },
    { src: "content/services/turnkey_projects/photo_5_2025-07-06_13-36-40.jpg", alt: "Проект под ключ 5" },
  ],
};

// Gallery functionality
let currentGalleryIndex = 0;
let currentGalleryImages = [];

function initGallery(galleryKey) {
  currentGalleryImages = galleryData[galleryKey] || [];
  currentGalleryIndex = 0;

  const mainImage = document.querySelector(".active-gallery-image");
  const thumbnailsContainer = document.querySelector(".gallery-thumbnails");

  // Clear previous thumbnails
  thumbnailsContainer.innerHTML = "";

  if (currentGalleryImages.length === 0) {
    mainImage.src = "";
    mainImage.alt = "Нет изображений";
    return;
  }

  // Set main image
  updateMainImage();

  // Create thumbnails
  currentGalleryImages.forEach((img, index) => {
    const thumbnail = document.createElement("img");
    thumbnail.src = img.src;
    thumbnail.alt = img.alt;
    thumbnail.classList.add("thumbnail");
    if (index === 0) thumbnail.classList.add("active");

    thumbnail.addEventListener("click", () => {
      updateGallery(index);
    });

    thumbnailsContainer.appendChild(thumbnail);
  });
}

function updateMainImage() {
  const mainImage = document.querySelector(".active-gallery-image");
  const currentImage = currentGalleryImages[currentGalleryIndex];

  // Add loading state
  mainImage.src = "";
  mainImage.alt = "Загрузка...";

  const img = new Image();
  img.src = currentImage.src;
  img.alt = currentImage.alt;

  img.onload = () => {
    mainImage.src = currentImage.src;
    mainImage.alt = currentImage.alt;
    centerActiveThumbnail();
  };
}

function updateGallery(index) {
  const thumbnails = document.querySelectorAll(".thumbnail");

  currentGalleryIndex = index;
  updateMainImage();

  thumbnails.forEach((thumb, i) => {
    thumb.classList.toggle("active", i === index);
  });
}

function centerActiveThumbnail() {
  const thumbnailsContainer = document.querySelector(".gallery-thumbnails");
  const activeThumb = document.querySelector(".thumbnail.active");

  if (activeThumb) {
    const containerWidth = thumbnailsContainer.offsetWidth;
    const thumbOffset = activeThumb.offsetLeft;
    const thumbWidth = activeThumb.offsetWidth;

    thumbnailsContainer.scrollTo({
      left: thumbOffset - containerWidth / 2 + thumbWidth / 2,
      behavior: "smooth",
    });
  }
}

// Initialize gallery buttons
document.querySelectorAll(".btn-gallery").forEach((button) => {
  button.addEventListener("click", function () {
    const galleryKey = this.getAttribute("data-gallery");
    initGallery(galleryKey);
    openModal("gallery-modal");
  });
});

// Navigation buttons
document.querySelector(".gallery-prev").addEventListener("click", () => {
  const newIndex =
    (currentGalleryIndex - 1 + currentGalleryImages.length) %
    currentGalleryImages.length;
  updateGallery(newIndex);
});

document.querySelector(".gallery-next").addEventListener("click", () => {
  const newIndex = (currentGalleryIndex + 1) % currentGalleryImages.length;
  updateGallery(newIndex);
});

// Keyboard navigation
document.addEventListener("keydown", function (e) {
  if (document.getElementById("gallery-modal").style.display === "block") {
    if (e.key === "ArrowLeft") {
      const newIndex =
        (currentGalleryIndex - 1 + currentGalleryImages.length) %
        currentGalleryImages.length;
      updateGallery(newIndex);
    } else if (e.key === "ArrowRight") {
      const newIndex = (currentGalleryIndex + 1) % currentGalleryImages.length;
      updateGallery(newIndex);
    } else if (e.key === "Escape") {
      closeModal("gallery-modal");
    }
  }
});

// Close modal when clicking outside
document.querySelector(".modal-overlay").addEventListener("click", () => {
  closeModal("gallery-modal");
});

// Prevent closing when clicking inside modal
document
  .querySelector(".gallery-modal-content")
  .addEventListener("click", (e) => {
    e.stopPropagation();
  });
