/**
 * PANZZI Catalog Logic
 */

// ======================================
// IMAGE OPTIMIZATION
// ======================================

// Add lazy loading to all hotspot preview images
document.addEventListener('DOMContentLoaded', () => {
    const previewImages = document.querySelectorAll('.hotspot-preview-image img');
    previewImages.forEach(img => {
        img.setAttribute('loading', 'lazy');
    });
});

// ======================================
// NAVIGATION & BURGER MENU
// ======================================

const burgerMenu = document.getElementById('burger-menu');
const navMenu = document.getElementById('nav-menu');
const navbar = document.getElementById('navbar');
const navOverlay = document.getElementById('nav-overlay');

if (burgerMenu && navMenu) {
    burgerMenu.addEventListener('click', () => {
        burgerMenu.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.classList.toggle('menu-open');
        if (navOverlay) navOverlay.classList.toggle('active');
    });

    // Close menu when clicking on nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            burgerMenu.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
            if (navOverlay) navOverlay.classList.remove('active');
        });
    });

    // Close menu when clicking on overlay
    if (navOverlay) {
        navOverlay.addEventListener('click', () => {
            burgerMenu.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
            navOverlay.classList.remove('active');
        });
    }
}

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
});

// ======================================
// INTERACTIVE MAP SLIDER
// ======================================

// Initialize all map sliders independently
document.querySelectorAll('.map-slider-container').forEach((sliderContainer) => {
    let currentMapSlide = 0;
    const mapSlides = sliderContainer.querySelectorAll('.interactive-map-wrapper');
    const mapDots = sliderContainer.querySelectorAll('.map-dots .dot');
    const mapPrevBtn = sliderContainer.querySelector('.map-nav-btn.prev');
    const mapNextBtn = sliderContainer.querySelector('.map-nav-btn.next');

    function showMapSlide(index) {
        // Wrap around
        if (index >= mapSlides.length) {
            currentMapSlide = 0;
        } else if (index < 0) {
            currentMapSlide = mapSlides.length - 1;
        } else {
            currentMapSlide = index;
        }

        // Hide all slides
        mapSlides.forEach(slide => slide.classList.remove('active'));
        
        // Show current slide
        if (mapSlides[currentMapSlide]) {
            mapSlides[currentMapSlide].classList.add('active');
        }

        // Update dots
        mapDots.forEach((dot, i) => {
            if (i === currentMapSlide) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    // Navigation buttons
    if (mapPrevBtn) {
        mapPrevBtn.addEventListener('click', () => {
            showMapSlide(currentMapSlide - 1);
        });
    }

    if (mapNextBtn) {
        mapNextBtn.addEventListener('click', () => {
            showMapSlide(currentMapSlide + 1);
        });
    }

    // Dots navigation
    mapDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showMapSlide(index);
        });
    });

    // Initialize
    showMapSlide(0);
});

// ======================================
// CATEGORY NAVIGATION - DROPDOWN
// ======================================

// Mobile dropdown toggle
let activeDropdown = null;

document.querySelectorAll('.category-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const dropdown = btn.nextElementSibling;
        const isMobile = window.innerWidth <= 768;

        if (isMobile) {
            e.preventDefault();
            e.stopPropagation();

            // Close other dropdowns
            document.querySelectorAll('.dropdown-menu').forEach(menu => {
                if (menu !== dropdown) {
                    menu.classList.remove('active');
                }
            });

            // Toggle current dropdown
            dropdown.classList.toggle('active');
            activeDropdown = dropdown.classList.contains('active') ? dropdown : null;
        }
    });
});

// Close dropdown when clicking outside on mobile
document.addEventListener('click', (e) => {
    const isMobile = window.innerWidth <= 768;
    if (isMobile && activeDropdown && !e.target.closest('.category-dropdown')) {
        activeDropdown.classList.remove('active');
        activeDropdown = null;
    }
});

// Smooth scroll for dropdown links
document.querySelectorAll('.dropdown-column a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        // Close mobile dropdown
        if (window.innerWidth <= 768 && activeDropdown) {
            activeDropdown.classList.remove('active');
            activeDropdown = null;
        }

        if (targetSection) {
            const navHeight = document.querySelector('.catalog-navigation').offsetHeight + 70;
            const targetPosition = targetSection.offsetTop - navHeight - 20;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Кнопки-ссылки (Свет, Материалы для интерьера) — сразу скролл к секции
document.querySelectorAll('.category-btn-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            const catalogNav = document.querySelector('.catalog-navigation');
            const navHeight = catalogNav ? catalogNav.offsetHeight + 70 : 90;
            const targetPosition = targetSection.offsetTop - navHeight - 20;
            window.scrollTo({ top: targetPosition, behavior: 'smooth' });
        }
    });
});

// ======================================
// CATALOG PRODUCTS
// ======================================

const products = [
    // Мягкая мебель -> Стулья
    { id: 1, category: 'chairs', title: 'Стул 1', img: 'imgs/cataloge/стул1.png' },
    { id: 2, category: 'chairs', title: 'Стул 2', img: 'imgs/cataloge/стул2.png' },
    { id: 3, category: 'chairs', title: 'Стул 3', img: 'imgs/cataloge/стул 3.png' },
    { id: 4, category: 'chairs', title: 'Стул 4', img: 'imgs/cataloge/стул4.png' },
    { id: 5, category: 'chairs', title: 'Стул 5', img: 'imgs/cataloge/стул5.png' },
    { id: 6, category: 'chairs', title: 'Стул 6', img: 'imgs/cataloge/стул6.png' },
    { id: 7, category: 'chairs', title: 'Стул 7', img: 'imgs/cataloge/стул7.png' },
    { id: 8, category: 'chairs', title: 'Стул 8', img: 'imgs/cataloge/стул8.png' },
    { id: 9, category: 'chairs', title: 'Стул 9', img: 'imgs/cataloge/стул9.png' },
    { id: 10, category: 'chairs', title: 'Стул 10', img: 'imgs/cataloge/стул10.png' },
    { id: 11, category: 'chairs', title: 'Стул 11', img: 'imgs/cataloge/стул11.png' },
    { id: 12, category: 'chairs', title: 'Стул 12', img: 'imgs/cataloge/стул12.png' },
    { id: 13, category: 'chairs', title: 'Стул 13', img: 'imgs/cataloge/стул13.png' },
    { id: 14, category: 'chairs', title: 'Стул 14', img: 'imgs/cataloge/стул14.png' },
    { id: 15, category: 'chairs', title: 'Стул 15', img: 'imgs/cataloge/стул15.png' },
    { id: 16, category: 'chairs', title: 'Стул 16', img: 'imgs/cataloge/стул16.png' },
    { id: 17, category: 'chairs', title: 'Стул 17', img: 'imgs/cataloge/стул17.png' },
    { id: 18, category: 'chairs', title: 'Стул 18', img: 'imgs/cataloge/стул18.png' },
    { id: 19, category: 'chairs', title: 'Стул 19', img: 'imgs/cataloge/стул19.png' },
    { id: 20, category: 'chairs', title: 'Стул 20', img: 'imgs/cataloge/стул20.png' },
    { id: 21, category: 'chairs', title: 'Стул 21', img: 'imgs/cataloge/стул21.png' },
    { id: 22, category: 'chairs', title: 'Стул 22', img: 'imgs/cataloge/стул22.png' },
    { id: 23, category: 'chairs', title: 'Стул 23', img: 'imgs/cataloge/стул23.png' },
    { id: 24, category: 'chairs', title: 'Стул 24', img: 'imgs/cataloge/стул24.png' },

    // Барные стулья
    ...Array.from({ length: 18 }, (_, i) => ({
        id: 100 + i, category: 'bar-stools', title: `Барный стул ${i + 1}`, img: `imgs/cataloge/бар${i + 1}.png`
    })),

    // Кресла
    ...Array.from({ length: 14 }, (_, i) => ({
        id: 200 + i, category: 'armchairs', title: `Кресло ${i + 1}`, img: `imgs/cataloge/кресло${i + 1}.png`
    })),

    // Диваны
    ...Array.from({ length: 7 }, (_, i) => ({
        id: 300 + i, category: 'sofas', title: `Диван ${i + 1}`, img: `imgs/cataloge/диван ${i + 1}.png`.replace('диван 1.png', 'диван 1.png').replace('диван 2.png', 'диван2.png').replace('диван 3.png', 'диван3.png').replace('диван 4.png', 'диван4.png').replace('диван 5.png', 'диван5.png').replace('диван 6.png', 'диван6.png').replace('диван 7.png', 'диван7.png')
    })).map(p => {
        // Fix spaces based on the file list
        if (p.id === 300) p.img = 'imgs/cataloge/диван 1.png';
        else p.img = p.img.replace('диван ', 'диван');
        return p;
    }),

    // Кровати (мягкая мебель)
    ...Array.from({ length: 8 }, (_, i) => ({
        id: 350 + i, category: 'beds', title: `Кровать ${i + 1}`, img: `imgs/cataloge/кровать${i + 1}.png`
    })),

    // Обеденные столы
    ...[1, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((n, i) => ({
        id: 400 + i, category: 'dining-tables', title: `Стол ${n}`, img: `imgs/cataloge/стол${n}.png`
    })),

    // Кофейные столы
    ...Array.from({ length: 6 }, (_, i) => ({
        id: 500 + i, category: 'coffee-tables', title: `Кофейный стол ${i + 1}`, img: `imgs/cataloge/столкофе${i + 1}.png`
    })),
    { id: 506, category: 'coffee-tables', title: 'Кофейный стол 7', img: 'imgs/cataloge/кофестол7.png' },
    { id: 507, category: 'coffee-tables', title: 'Кофейный стол 8', img: 'imgs/cataloge/кофестол8.png' },
    { id: 508, category: 'coffee-tables', title: 'Кофейный стол 9', img: 'imgs/cataloge/столкафе9.png' },
    { id: 509, category: 'coffee-tables', title: 'Кофейный стол 10', img: 'imgs/cataloge/столкофе10.png' },

    // Тумбы (Прикроватные тумбы)
    { id: 601, category: 'bedside-tables', title: 'Тумба 1', img: 'imgs/cataloge/тумба1.png' },
    { id: 602, category: 'bedside-tables', title: 'Тумба 2', img: 'imgs/cataloge/тумба2.png' },
    { id: 603, category: 'bedside-tables', title: 'Тумба 3', img: 'imgs/cataloge/тумба3.png' },
    { id: 604, category: 'bedside-tables', title: 'Тумба 4', img: 'imgs/cataloge/шкаф13.png' },
    { id: 605, category: 'bedside-tables', title: 'Тумба 5', img: 'imgs/cataloge/шкаф14.png' },
    { id: 606, category: 'bedside-tables', title: 'Тумба 6', img: 'imgs/cataloge/шкаф15.png' },

    // Комоды
    { id: 701, category: 'dresser', title: 'Комод 1', img: 'imgs/cataloge/шкаф1.png' },
    { id: 702, category: 'dresser', title: 'Комод 2', img: 'imgs/cataloge/шкаф8.png' },
    { id: 703, category: 'dresser', title: 'Комод 3', img: 'imgs/cataloge/шкаф10.png' },
    { id: 704, category: 'dresser', title: 'Комод 4', img: 'imgs/cataloge/шкаф12.png' },

    // Буфеты (Буфет)
    { id: 711, category: 'buffet', title: 'Буфет 1', img: 'imgs/cataloge/шкаф2.png' },
    { id: 712, category: 'buffet', title: 'Буфет 2', img: 'imgs/cataloge/шкаф3.png' },
    { id: 713, category: 'buffet', title: 'Буфет 3', img: 'imgs/cataloge/шкаф4.png' },
    { id: 714, category: 'buffet', title: 'Буфет 4', img: 'imgs/cataloge/шкаф5.png' },
    { id: 715, category: 'buffet', title: 'Буфет 5', img: 'imgs/cataloge/шкаф6.png' },
    { id: 716, category: 'buffet', title: 'Буфет 6', img: 'imgs/cataloge/шкаф7.png' },

    // Стеллажи (Стеллаж)
    { id: 721, category: 'shelving', title: 'Стеллаж 1', img: 'imgs/cataloge/шкаф9.png' },
    { id: 722, category: 'shelving', title: 'Стеллаж 2', img: 'imgs/cataloge/шкаф11.png' },
    { id: 723, category: 'shelving', title: 'Стеллаж 3', img: 'imgs/cataloge/шкаф16.png' },

    // Уличная мебель (диван 1 в конце)
    ...Array.from({ length: 12 }, (_, i) => ({
        id: 800 + i, category: 'outdoor-sofa', title: `Уличный диван ${i + 2}`, img: `imgs/cataloge/улицадиван${i + 2}.png`
    })),
    { id: 812, category: 'outdoor-sofa', title: 'Уличный диван 1', img: 'imgs/cataloge/улицадиван1.png' },
    ...Array.from({ length: 10 }, (_, i) => ({
        id: 820 + i, category: 'outdoor-armchair', title: `Уличное кресло ${i + 1}`, img: `imgs/cataloge/улицакресло${i + 1}.png`
    })).map(p => {
        if (p.id === 821) p.img = 'imgs/cataloge/улицакресло2.png';
        return p;
    }),
    // Уличные столы
    ...Array.from({ length: 11 }, (_, i) => ({
        id: 840 + i, category: 'outdoor-tables', title: `Уличный стол ${i + 1}`, img: `imgs/cataloge/улицастол${i + 1}.png`
    })),

    // Уличные кровати
    ...Array.from({ length: 4 }, (_, i) => ({
        id: 860 + i, category: 'outdoor-beds', title: `Уличная кровать ${i + 1}`, img: `imgs/cataloge/улицакровать${i + 1}.png`
    })),

    // Качели
    ...Array.from({ length: 4 }, (_, i) => ({
        id: 870 + i, category: 'swings', title: `Качели ${i + 1}`, img: `imgs/cataloge/улицакачель${i + 1}.png`
    })),

    // Лежаки
    ...Array.from({ length: 4 }, (_, i) => ({
        id: 880 + i, category: 'lounger', title: `Лежак ${i + 1}`, img: `imgs/cataloge/улицалежак${i + 1}.png`
    })),

    // Декор -> Вазы
    ...[1, 2, 3, 8, 9, 10].map((n, i) => ({
        id: 900 + i, category: 'vases', title: `Ваза ${i + 1}`, img: `imgs/cataloge/ваза${n}.png`
    })),

    // Декор -> Скульптуры
    ...Array.from({ length: 15 }, (_, i) => ({
        id: 920 + i, category: 'sculptures', title: `Скульптура ${i + 1}`, img: `imgs/cataloge/скульптуры${i + 1}.png`
    })),

    // Декор -> Зеркала
    ...Array.from({ length: 10 }, (_, i) => ({
        id: 940 + i, category: 'mirrors', title: `Зеркало ${i + 1}`, img: `imgs/cataloge/зеркало${i + 1}.png`
    })),

    // Декор -> Настенные акценты
    ...Array.from({ length: 6 }, (_, i) => ({
        id: 960 + i, category: 'wall-accents', title: `Настенный акцент ${i + 1}`, img: `imgs/cataloge/настеная${i + 1}.png`
    })),
    ...Array.from({ length: 6 }, (_, i) => ({
        id: 970 + i, category: 'wall-accents', title: `Настенный декор ${i + 1}`, img: `imgs/cataloge/стена${i + 1}.png`
    })),
    { id: 976, category: 'wall-accents', title: 'Настенный декор 7', img: 'imgs/cataloge/стена66.png' },

    // Декор -> Поставка посуды (галерея с главной)
    { id: 1050, category: 'dishes', title: 'Посуда 1', img: 'content/services/dishes/photo_1_2025-07-06_13-26-00.jpg' },
    { id: 1051, category: 'dishes', title: 'Посуда 2', img: 'content/services/dishes/photo_2_2025-07-06_13-26-00.jpg' },
    { id: 1052, category: 'dishes', title: 'Посуда 3', img: 'content/services/dishes/photo_3_2025-07-06_13-26-00.jpg' },
    { id: 1053, category: 'dishes', title: 'Посуда 4', img: 'content/services/dishes/photo_4_2025-07-06_13-26-00.jpg' },
    { id: 1054, category: 'dishes', title: 'Посуда 5', img: 'content/services/dishes/photo_5_2025-07-06_13-26-00.jpg' },
    { id: 1055, category: 'dishes', title: 'Посуда 6', img: 'content/services/dishes/photo_6_2025-07-06_13-26-00.jpg' },
    { id: 1056, category: 'dishes', title: 'Посуда 7', img: 'content/services/dishes/photo_7_2025-07-06_13-26-00.jpg' },
    { id: 1057, category: 'dishes', title: 'Посуда 8', img: 'content/services/dishes/photo_8_2025-07-06_13-26-00.jpg' },
    { id: 1058, category: 'dishes', title: 'Посуда 9', img: 'content/services/dishes/photo_9_2025-07-06_13-26-00.jpg' },

    // Декор -> Стекло
    ...[1, 2, 3, 4, 7, 8].map((n, i) => ({
        id: 980 + i, category: 'glass', title: `Стекло ${i + 1}`, img: `imgs/cataloge/глас${n}.png`
    })),

    // Декор -> Тарелки
    ...Array.from({ length: 10 }, (_, i) => ({
        id: 1000 + i, category: 'plates', title: `Тарелка ${i + 1}`, img: `imgs/cataloge/тарелка${i + 1}.png`
    })),

    // Декор -> Уличный декор
    ...Array.from({ length: 9 }, (_, i) => ({
        id: 1020 + i, category: 'outdoor-decor', title: `Уличный декор ${i + 1}`, img: `imgs/cataloge/улицадекор${i + 1}.png`
    })),

    // Свет (из галереи на главной странице)
    { id: 1100, category: 'lighting', title: 'Освещение 1', img: 'content/services/lighting/photo_1_2025-07-06_13-34-13.jpg' },
    { id: 1101, category: 'lighting', title: 'Освещение 2', img: 'content/services/lighting/photo_2_2025-07-06_13-34-13.jpg' },
    { id: 1102, category: 'lighting', title: 'Освещение 3', img: 'content/services/lighting/photo_3_2025-07-06_13-34-13.jpg' },
    { id: 1103, category: 'lighting', title: 'Освещение 4', img: 'content/services/lighting/photo_4_2025-07-06_13-34-13.jpg' },
    { id: 1104, category: 'lighting', title: 'Освещение 5', img: 'content/services/lighting/photo_5_2025-07-06_13-34-13.jpg' },
    { id: 1105, category: 'lighting', title: 'Освещение 6', img: 'content/services/lighting/photo_6_2025-07-06_13-34-13.jpg' },
    { id: 1106, category: 'lighting', title: 'Освещение 7', img: 'content/services/lighting/photo_7_2025-07-06_13-34-13.jpg' },

    // Материалы для интерьера: сначала фото из галереи главной (14), потом карточки каталога (12)
    { id: 1200, category: 'interior-materials', title: 'Материал 1', img: 'content/services/materials/photo_1_2025-07-06_13-38-58.jpg' },
    { id: 1201, category: 'interior-materials', title: 'Материал 2', img: 'content/services/materials/photo_2_2025-07-06_13-38-58.jpg' },
    { id: 1202, category: 'interior-materials', title: 'Материал 3', img: 'content/services/materials/photo_3_2025-07-06_13-38-58.jpg' },
    { id: 1203, category: 'interior-materials', title: 'Материал 4', img: 'content/services/materials/photo_4_2025-07-06_13-38-58.jpg' },
    { id: 1204, category: 'interior-materials', title: 'Материал 5', img: 'content/services/materials/photo_5_2025-07-06_13-38-58.jpg' },
    { id: 1205, category: 'interior-materials', title: 'Материал 6', img: 'content/services/materials/photo_1_2025-07-20_18-14-14.jpg' },
    { id: 1206, category: 'interior-materials', title: 'Материал 7', img: 'content/services/materials/photo_2_2025-07-20_18-14-14.jpg' },
    { id: 1207, category: 'interior-materials', title: 'Материал 8', img: 'content/services/materials/photo_3_2025-07-20_18-14-14.jpg' },
    { id: 1208, category: 'interior-materials', title: 'Материал 9', img: 'content/services/materials/photo_4_2025-07-20_18-14-14.jpg' },
    { id: 1209, category: 'interior-materials', title: 'Материал 10', img: 'content/services/materials/photo_5_2025-07-20_18-14-14.jpg' },
    { id: 1210, category: 'interior-materials', title: 'Материал 11', img: 'content/services/materials/photo_6_2025-07-20_18-14-14.jpg' },
    { id: 1211, category: 'interior-materials', title: 'Материал 12', img: 'content/services/materials/photo_7_2025-07-20_18-14-14.jpg' },
    { id: 1212, category: 'interior-materials', title: 'Материал 13', img: 'content/services/materials/photo_8_2025-07-20_18-14-14.jpg' },
    { id: 1213, category: 'interior-materials', title: 'Материал 14', img: 'content/services/materials/photo_9_2025-07-20_18-14-14.jpg' },
    ...Array.from({ length: 12 }, (_, i) => ({
        id: 1214 + i, category: 'interior-materials', title: `Материалы для интерьера ${i + 1}`, img: `imgs/cataloge/Материалы для интерьера${i + 1}.png`
    })),
];


const categories = [
    'chairs', 'bar-stools', 'armchairs', 'sofas', 'beds',
    'dining-tables', 'coffee-tables',
    'bedside-tables', 'buffet', 'dresser', 'shelving',
    'outdoor-sofa', 'outdoor-armchair', 'outdoor-tables', 'outdoor-beds', 'swings', 'lounger',
    'vases', 'sculptures',
    'mirrors', 'wall-accents',
    'dishes', 'glass', 'plates',
    'outdoor-decor',
    'lighting',
    'interior-materials'
];

let currentGalleryProducts = [];
let currentGalleryIndex = 0;

function renderProducts(filter = 'all', searchQuery = '') {
    categories.forEach(cat => {
        const grid = document.getElementById(`grid-${cat}`);
        const section = document.getElementById(`${cat}-section`);
        if (!grid || !section) return;

        grid.innerHTML = '';

        const filteredProducts = products.filter(p => {
            const matchesCat = (filter === 'all' || filter === p.category || isParentCategory(filter, p.category));
            const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesCat && matchesSearch && p.category === cat;
        });

        if (filteredProducts.length > 0) {
            section.style.display = 'block';
            filteredProducts.forEach(p => {
                const card = document.createElement('div');
                card.className = 'product-card fade-in';
                card.innerHTML = `
                    <div class="product-img">
                        <img src="${p.img}" alt="${p.title}" loading="lazy">
                    </div>
                `;
                card.addEventListener('click', () => openGallery(filteredProducts, p.id));
                grid.appendChild(card);
            });
        } else {
            section.style.display = 'none';
        }
    });

    // Handle high-level title visibility
    updateHeaderVisibility();
}

function openGallery(productList, productId) {
    currentGalleryProducts = productList;
    currentGalleryIndex = productList.findIndex(p => p.id === productId);

    const mainGallerySlide = document.querySelector(".main-gallery-slide");
    const thumbnailsContainer = document.querySelector(".gallery-thumbnails");

    // Clear previous content
    mainGallerySlide.innerHTML = '';
    thumbnailsContainer.innerHTML = "";

    if (currentGalleryProducts.length === 0) {
        const noContent = document.createElement('div');
        noContent.textContent = "Нет контента для отображения";
        mainGallerySlide.appendChild(noContent);
        return;
    }

    // Set main image
    updateMainContent();

    // Preload all images in the gallery
    currentGalleryProducts.forEach(item => {
        const preloadLink = new Image();
        preloadLink.src = item.img;
    });

    // Create thumbnails
    currentGalleryProducts.forEach((item, index) => {
        const thumbnail = document.createElement("div");
        thumbnail.classList.add("thumbnail");
        if (index === currentGalleryIndex) thumbnail.classList.add("active");

        const imgThumb = document.createElement("img");
        imgThumb.src = item.img;
        imgThumb.alt = item.title;
        thumbnail.appendChild(imgThumb);

        thumbnail.addEventListener("click", () => {
            updateGallery(index);
        });

        thumbnailsContainer.appendChild(thumbnail);
    });

    openModal("gallery-modal");
    centerActiveThumbnail();
}

function updateMainContent() {
    const mainGallerySlide = document.querySelector(".main-gallery-slide");
    const currentItem = currentGalleryProducts[currentGalleryIndex];

    // Clear previous content
    mainGallerySlide.innerHTML = '';

    // Create image
    const img = new Image();
    img.src = currentItem.img;
    img.alt = currentItem.title;
    img.classList.add("active-gallery-image");
    mainGallerySlide.appendChild(img);
}

function updateGallery(index) {
    const thumbnails = document.querySelectorAll(".thumbnail");

    currentGalleryIndex = index;
    updateMainContent();

    thumbnails.forEach((thumb, i) => {
        thumb.classList.toggle("active", i === index);
    });

    centerActiveThumbnail();
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

function isParentCategory(parent, child) {
    const map = {
        'furniture': ['soft-furniture', 'chairs', 'bar-stools', 'armchairs', 'sofas', 'beds', 'tables', 'dining-tables', 'coffee-tables', 'cabinets', 'bedside-tables', 'buffet', 'dresser', 'shelving', 'outdoor-furniture', 'outdoor-sofa', 'outdoor-armchair', 'outdoor-tables', 'outdoor-beds', 'swings', 'lounger'],
        'soft-furniture': ['chairs', 'bar-stools', 'armchairs', 'sofas', 'beds'],
        'tables': ['dining-tables', 'coffee-tables'],
        'cabinets': ['bedside-tables', 'buffet', 'dresser', 'shelving'],
        'outdoor-furniture': ['outdoor-sofa', 'outdoor-armchair', 'outdoor-tables', 'outdoor-beds', 'swings', 'lounger'],
        'decor': ['decorative-objects', 'vases', 'sculptures', 'wall-decor', 'mirrors', 'wall-accents', 'tableware', 'glass', 'plates', 'outdoor-decor'],
        'decorative-objects': ['vases', 'sculptures'],
        'wall-decor': ['mirrors', 'wall-accents'],
        'tableware': ['glass', 'plates']
    };
    return map[parent] && map[parent].includes(child);
}

function updateHeaderVisibility() {
    const mainGroups = ['furniture-group', 'decor-group', 'lighting-group', 'interior-materials-group'];

    mainGroups.forEach(groupId => {
        const group = document.getElementById(groupId);
        if (!group) return;

        // Check subgroups
        const subgroups = group.querySelectorAll('.catalog-subgroup');
        let groupHasVisibleContent = false;

        subgroups.forEach(sub => {
            const sections = sub.querySelectorAll('.catalog-section');
            const hasVisibleSection = Array.from(sections).some(sec => sec.style.display !== 'none');

            sub.style.display = hasVisibleSection ? 'block' : 'none';
            if (hasVisibleSection) groupHasVisibleContent = true;
        });

        // Special case for single sections directly in group (like outdoor-decor)
        const directSections = group.querySelectorAll(':scope > .catalog-section');
        const hasVisibleDirect = Array.from(directSections).some(sec => sec.style.display !== 'none');
        if (hasVisibleDirect) groupHasVisibleContent = true;

        group.style.display = groupHasVisibleContent ? 'block' : 'none';
    });
}

document.addEventListener('DOMContentLoaded', () => {
    renderProducts();

    // Gallery event listeners
    document.querySelector('.close-modal').addEventListener('click', () => closeModal('gallery-modal'));
    document.querySelector('.gallery-prev').addEventListener('click', () => {
        const newIndex = (currentGalleryIndex - 1 + currentGalleryProducts.length) % currentGalleryProducts.length;
        updateGallery(newIndex);
    });
    document.querySelector('.gallery-next').addEventListener('click', () => {
        const newIndex = (currentGalleryIndex + 1) % currentGalleryProducts.length;
        updateGallery(newIndex);
    });

    // Close on click outside
    document.querySelector('.modal-overlay').addEventListener('click', () => closeModal('gallery-modal'));

    // Prevent closing when clicking inside modal
    document.querySelector('.gallery-modal-content').addEventListener('click', (e) => {
        e.stopPropagation();
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (document.getElementById('gallery-modal').style.display === 'flex') {
            if (e.key === 'ArrowRight') {
                const newIndex = (currentGalleryIndex + 1) % currentGalleryProducts.length;
                updateGallery(newIndex);
            }
            if (e.key === 'ArrowLeft') {
                const newIndex = (currentGalleryIndex - 1 + currentGalleryProducts.length) % currentGalleryProducts.length;
                updateGallery(newIndex);
            }
            if (e.key === 'Escape') closeModal('gallery-modal');
        }
    });

    // Slider navigation - using event delegation for dynamic support if needed
    document.addEventListener('click', (e) => {
        const btn = e.target.closest('.slider-btn');
        if (btn) {
            const targetId = btn.dataset.target;
            const grid = document.getElementById(targetId);
            if (grid) {
                const scrollAmount = grid.clientWidth * 0.8;
                if (btn.classList.contains('prev')) {
                    grid.scrollLeft -= scrollAmount;
                } else {
                    grid.scrollLeft += scrollAmount;
                }
            }
        }
    });

    // ======================================
    // INTERACTIVE HOTSPOTS
    // ======================================
    document.querySelectorAll('.hotspot').forEach(hotspot => {
        hotspot.addEventListener('click', function () {
            const category = this.getAttribute('data-category');

            // Get all products from this category
            const categoryProducts = products.filter(p => p.category === category);

            if (categoryProducts.length > 0) {
                // Open gallery directly with products from this category
                openGallery(categoryProducts, categoryProducts[0].id);
            }
        });
    });
});
