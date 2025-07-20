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
let currentVideoElement = null;

function openModal(modalId) {
  bodyScrollPosition = window.scrollY;
  document.body.style.position = "fixed";
  document.body.style.top = `-${bodyScrollPosition}px`;
  document.body.style.width = "100%";
  document.body.style.overflow = "hidden";
  document.getElementById(modalId).style.display = "flex";
}

function closeModal(modalId) {
  // Останавливаем видео перед закрытием
  if (currentVideoElement) {
    currentVideoElement.pause();
    currentVideoElement = null;
  }
  
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
    // Останавливаем видео перед закрытием
    if (currentVideoElement) {
      currentVideoElement.pause();
      currentVideoElement = null;
    }
    closeModal(this.closest(".modal").id);
  });
});

window.addEventListener("click", function (event) {
  if (event.target.classList.contains("modal")) {
    // Останавливаем видео перед закрытием
    if (currentVideoElement) {
      currentVideoElement.pause();
      currentVideoElement = null;
    }
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
    { src: "content/services/materials/photo_1_2025-07-20_18-14-14.jpg", alt: "Материал 6" },
    { src: "content/services/materials/photo_2_2025-07-20_18-14-14.jpg", alt: "Материал 7" },
    { src: "content/services/materials/photo_3_2025-07-20_18-14-14.jpg", alt: "Материал 8" },
    { src: "content/services/materials/photo_4_2025-07-20_18-14-14.jpg", alt: "Материал 9" },
    { src: "content/services/materials/photo_5_2025-07-20_18-14-14.jpg", alt: "Материал 10" },
    { src: "content/services/materials/photo_6_2025-07-20_18-14-14.jpg", alt: "Материал 11" },
    { src: "content/services/materials/photo_7_2025-07-20_18-14-14.jpg", alt: "Материал 12" },
    { src: "content/services/materials/photo_8_2025-07-20_18-14-14.jpg", alt: "Материал 13" },
    { src: "content/services/materials/photo_9_2025-07-20_18-14-14.jpg", alt: "Материал 14" },
  ],
    turnkey_projects: [
    { src: "content/services/turnkey_projects/photo_1_2025-07-06_13-36-40.jpg", alt: "Проект под ключ 1" },
    { src: "content/services/turnkey_projects/photo_2_2025-07-06_13-36-40.jpg", alt: "Проект под ключ 2" },
    { src: "content/services/turnkey_projects/photo_3_2025-07-06_13-36-40.jpg", alt: "Проект под ключ 3" },
    { src: "content/services/turnkey_projects/photo_4_2025-07-06_13-36-40.jpg", alt: "Проект под ключ 4" },
    { src: "content/services/turnkey_projects/photo_5_2025-07-06_13-36-40.jpg", alt: "Проект под ключ 5" },
  ],
   lazy_bar: [
    { src: "content/projects/lazy_bar/photo_1_2025-07-07_12-58-50.jpg", alt: "Lazy Bar 1" },
    { src: "content/projects/lazy_bar/photo_2_2025-07-07_12-58-50.jpg", alt: "Lazy Bar 2" },
    { src: "content/projects/lazy_bar/photo_3_2025-07-07_12-58-50.jpg", alt: "Lazy Bar 3" },
    { src: "content/projects/lazy_bar/photo_4_2025-07-07_12-58-50.jpg", alt: "Lazy Bar 4" },
    { src: "content/projects/lazy_bar/photo_5_2025-07-07_12-58-50.jpg", alt: "Lazy Bar 5" },
    { src: "content/projects/lazy_bar/photo_6_2025-07-07_12-58-50.jpg", alt: "Lazy Bar 6" },
    { src: "content/projects/lazy_bar/photo_7_2025-07-07_12-58-50.jpg", alt: "Lazy Bar 7" },
    { src: "content/projects/lazy_bar/photo_8_2025-07-07_12-58-50.jpg", alt: "Lazy Bar 8" },
    { src: "content/projects/lazy_bar/photo_9_2025-07-07_12-58-50.jpg", alt: "Lazy Bar 9" },
  ],
  mom_restaurant: [
    { src: "content/projects/mom_restaurant/photo_1_2025-07-07_12-59-31.jpg", alt: "MOM ресторан 1" },
    { src: "content/projects/mom_restaurant/photo_2_2025-07-07_12-59-31.jpg", alt: "MOM ресторан 2" },
    { src: "content/projects/mom_restaurant/photo_3_2025-07-07_12-59-31.jpg", alt: "MOM ресторан 3" },
    { src: "content/projects/mom_restaurant/photo_4_2025-07-07_12-59-31.jpg", alt: "MOM ресторан 4" },
    { src: "content/projects/mom_restaurant/photo_5_2025-07-07_12-59-31.jpg", alt: "MOM ресторан 5" },
    { src: "content/projects/mom_restaurant/photo_6_2025-07-07_12-59-31.jpg", alt: "MOM ресторан 6" },
    { src: "content/projects/mom_restaurant/photo_7_2025-07-07_12-59-31.jpg", alt: "MOM ресторан 7" },
  ],
  panzzi_showroom: [
    { src: "content/projects/panzzi_showroom/photo_1_2025-07-07_13-00-12.jpg", alt: "Showroom Panzzi 1" },
    { src: "content/projects/panzzi_showroom/photo_2_2025-07-07_13-00-12.jpg", alt: "Showroom Panzzi 2" },
    { src: "content/projects/panzzi_showroom/photo_3_2025-07-07_13-00-12.jpg", alt: "Showroom Panzzi 3" },
    { src: "content/projects/panzzi_showroom/photo_4_2025-07-07_13-00-12.jpg", alt: "Showroom Panzzi 4" },
    { src: "content/projects/panzzi_showroom/photo_5_2025-07-07_13-00-12.jpg", alt: "Showroom Panzzi 5" },
    { src: "content/projects/panzzi_showroom/photo_6_2025-07-07_13-00-12.jpg", alt: "Showroom Panzzi 6" },
    { src: "content/projects/panzzi_showroom/photo_7_2025-07-07_13-00-12.jpg", alt: "Showroom Panzzi 7" },
    { src: "content/projects/panzzi_showroom/photo_8_2025-07-07_13-00-12.jpg", alt: "Showroom Panzzi 8" },
  ],
  villa_project: [
    { src: "content/projects/villa_project/villa_project1.jpg", alt: "Вилла 2" },
    { src: "content/projects/villa_project/PalmParadise.mp4", alt: "Вилла 1", type: "video" },
    { src: "content/projects/villa_project/villa_project_video1.MOV", alt: "Вилла 2", type: "video" },
  ],
    villa_gangzhou : [
    { src: "content/projects/villa_gangzhou/photo_1_2025-07-20_18-18-12.jpg", alt: "Вилла 1" },
    { src: "content/projects/villa_gangzhou/photo_2_2025-07-20_18-18-12.jpg", alt: "Вилла 2" },
    { src: "content/projects/villa_gangzhou/photo_3_2025-07-20_18-18-12.jpg", alt: "Вилла 3" },
    { src: "content/projects/villa_gangzhou/photo_4_2025-07-20_18-18-12.jpg", alt: "Вилла 4" },
    { src: "content/projects/villa_gangzhou/photo_5_2025-07-20_18-18-12.jpg", alt: "Вилла 5" },
    { src: "content/projects/villa_gangzhou/photo_6_2025-07-20_18-18-12.jpg", alt: "Вилла 6" },
    { src: "content/projects/villa_gangzhou/photo_7_2025-07-20_18-18-12.jpg", alt: "Вилла 7" },
    { src: "content/projects/villa_gangzhou/photo_8_2025-07-20_18-18-12.jpg", alt: "Вилла 8" },
    { src: "content/projects/villa_gangzhou/photo_9_2025-07-20_18-18-12.jpg", alt: "Вилла 9" },
],
    wechat: [
    { src: "content/wechat/photo_2025-07-11_10-43-59.jpg", alt: "wechat 1" },
  ],
};

// Gallery functionality
let currentGalleryIndex = 0;
let currentGalleryImages = [];
const VIDEO_VOLUME_LEVEL = 0.03;

function initGallery(galleryKey) {
  currentGalleryImages = galleryData[galleryKey] || [];
  currentGalleryIndex = 0;
  currentVideoElement = null;

  const mainGallerySlide = document.querySelector(".main-gallery-slide");
  const thumbnailsContainer = document.querySelector(".gallery-thumbnails");

  // Clear previous content
  mainGallerySlide.innerHTML = '';
  thumbnailsContainer.innerHTML = "";

  if (currentGalleryImages.length === 0) {
    const noContent = document.createElement('div');
    noContent.textContent = "Нет контента для отображения";
    mainGallerySlide.appendChild(noContent);
    return;
  }

  // Set main content (image or video)
  updateMainContent();

  // Create thumbnails
  currentGalleryImages.forEach((item, index) => {
    const thumbnail = document.createElement("div");
    thumbnail.classList.add("thumbnail");
    if (index === 0) thumbnail.classList.add("active");

    if (item.type === "video") {
      // Видео превью
      const videoThumb = document.createElement("video");
      videoThumb.src = item.src;
      videoThumb.muted = true; // Превью всегда без звука
      videoThumb.loop = true;
      videoThumb.playsInline = true;
      videoThumb.volume = 0; // На всякий случай отключаем звук
      videoThumb.addEventListener('loadeddata', () => {
        videoThumb.currentTime = 0;
      });
      videoThumb.addEventListener('seeked', () => {
        videoThumb.play().catch(e => {});
      });
      thumbnail.appendChild(videoThumb);
      
      // Добавляем иконку видео
      const videoIcon = document.createElement("i");
      videoIcon.className = "fas fa-video thumbnail-video-icon";
      thumbnail.appendChild(videoIcon);
    } else {
      // Обычное изображение
      const imgThumb = document.createElement("img");
      imgThumb.src = item.src;
      imgThumb.alt = item.alt;
      thumbnail.appendChild(imgThumb);
    }

    thumbnail.addEventListener("click", () => {
      updateGallery(index);
    });

    thumbnailsContainer.appendChild(thumbnail);
  });
}
function updateMainContent() {
  const mainGallerySlide = document.querySelector(".main-gallery-slide");
  const currentItem = currentGalleryImages[currentGalleryIndex];

  // Очищаем предыдущий контент
  mainGallerySlide.innerHTML = '';

  // Останавливаем текущее видео, если оно есть
  if (currentVideoElement) {
    currentVideoElement.pause();
    currentVideoElement = null;
  }

  if (currentItem.type === "video") {
    // Создаем видео элемент
    const video = document.createElement("video");
    video.src = currentItem.src;
    video.controls = true;
    video.autoplay = true;
    video.loop = true;
    video.classList.add("active-gallery-video");
    
    // Устанавливаем громкость
    video.volume = VIDEO_VOLUME_LEVEL;
    
    // Обработчик для сохранения громкости при включении звука
    video.addEventListener('volumechange', function() {
      if (video.volume > VIDEO_VOLUME_LEVEL) {
        video.volume = VIDEO_VOLUME_LEVEL;
      }
    });
    
    // Добавляем иконку видео
    const videoIcon = document.createElement("i");
    videoIcon.className = "fas fa-video gallery-video-icon";
    mainGallerySlide.appendChild(videoIcon);
    
    mainGallerySlide.appendChild(video);
    currentVideoElement = video;
  } else {
    // Создаем изображение
    const img = new Image();
    img.src = currentItem.src;
    img.alt = currentItem.alt;
    img.classList.add("active-gallery-image");
    mainGallerySlide.appendChild(img);
  }

  centerActiveThumbnail();
}

function updateGallery(index) {
  const thumbnails = document.querySelectorAll(".thumbnail");

  // Stop current video before switching
  if (currentVideoElement) {
    currentVideoElement.pause();
    currentVideoElement = null;
  }

  currentGalleryIndex = index;
  updateMainContent();

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
function handleGalleryOpen(element) {
  const galleryKey = element.getAttribute("data-gallery");
  if (galleryKey) {
    initGallery(galleryKey);
    openModal("gallery-modal");
  }
}

// Initialize gallery buttons and links
document.querySelectorAll(".btn-gallery, a[data-gallery]").forEach((element) => {
  element.addEventListener("click", function(e) {
    if (element.tagName.toLowerCase() === "a") {
      e.preventDefault();
    }
    handleGalleryOpen(this);
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
  if (document.getElementById("gallery-modal").style.display === "flex") {
    if (e.key === "ArrowLeft") {
      const newIndex =
        (currentGalleryIndex - 1 + currentGalleryImages.length) %
        currentGalleryImages.length;
      updateGallery(newIndex);
    } else if (e.key === "ArrowRight") {
      const newIndex = (currentGalleryIndex + 1) % currentGalleryImages.length;
      updateGallery(newIndex);
    } else if (e.key === "Escape") {
      // Stop video before closing
      if (currentVideoElement) {
        currentVideoElement.pause();
        currentVideoElement = null;
      }
      closeModal("gallery-modal");
    }
  }
});

// Close modal when clicking outside
document.querySelector(".modal-overlay").addEventListener("click", () => {
  // Stop video before closing
  if (currentVideoElement) {
    currentVideoElement.pause();
    currentVideoElement = null;
  }
  closeModal("gallery-modal");
});

// Prevent closing when clicking inside modal
document.querySelector(".gallery-modal-content").addEventListener("click", (e) => {
  e.stopPropagation();
});