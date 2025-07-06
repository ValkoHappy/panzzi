document.addEventListener('DOMContentLoaded', function() {
  let currentLanguage = 'ru';
  
  // Initialize language from localStorage or browser preference
  const savedLanguage = localStorage.getItem('preferredLanguage');
  const browserLanguage = navigator.language.slice(0, 2);
  
  if (savedLanguage) {
    currentLanguage = savedLanguage;
  } else if (browserLanguage === 'ru' || browserLanguage === 'en') {
    currentLanguage = browserLanguage;
  }
  
  // Apply initial language
  applyLanguage(currentLanguage);
  updateToggleButton(currentLanguage);
  
  // Language toggle event listener
  document.getElementById('language-toggle').addEventListener('click', function() {
    const newLang = currentLanguage === 'ru' ? 'en' : 'ru';
    changeLanguage(newLang);
  });
  
  function changeLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem('preferredLanguage', lang);
    applyLanguage(lang);
    updateToggleButton(lang);
  }
  
  function applyLanguage(lang) {
    // Update all translatable elements
    document.querySelectorAll('[data-translate]').forEach(element => {
      const key = element.getAttribute('data-translate');
      if (translations[lang] && translations[lang][key]) {
        if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
          element.value = translations[lang][key];
        } else if (element.tagName === 'IMG' && element.hasAttribute('alt')) {
          element.alt = translations[lang][key];
        } else {
          element.textContent = translations[lang][key];
        }
      }
    });
    
    // Update html lang attribute
    document.documentElement.lang = lang;
  }
  
  function updateToggleButton(lang) {
    const toggleBtn = document.getElementById('language-toggle');
    toggleBtn.textContent = lang === 'ru' ? 'RU' : 'EN';
    toggleBtn.setAttribute('data-lang', lang);
  }
});