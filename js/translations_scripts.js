document.addEventListener("DOMContentLoaded", function () {
  const languages = ["ru", "en"];
  const languageLabels = {
    ru: "RU",
    en: "EN",
    zh: "中文",
  };

  function readSavedLanguage() {
    try {
      return localStorage.getItem("preferredLanguage");
    } catch (error) {
      return null;
    }
  }

  function saveLanguage(language) {
    try {
      localStorage.setItem("preferredLanguage", language);
    } catch (error) {
      // Language still changes for the current page if storage is unavailable.
    }
  }

  const savedLanguage = readSavedLanguage();
  const browserLanguage = (navigator.language || "ru").slice(0, 2).toLowerCase();
  let currentLanguage = languages.includes(savedLanguage)
    ? savedLanguage
    : languages.includes(browserLanguage)
      ? browserLanguage
      : "ru";

  const selector = document.getElementById("language-selector");
  const languageButton = document.getElementById("language-toggle");
  const languageMenu = document.getElementById("language-menu");
  const languageOptions = document.querySelectorAll(".language-option");

  function getDictionary(language) {
    return translations[language] || translations.ru || {};
  }

  function applyTranslations(language) {
    const dictionary = getDictionary(language);
    const fallback = translations.ru || {};

    document.querySelectorAll("[data-translate]").forEach(function (element) {
      const key = element.getAttribute("data-translate");
      if (dictionary[key] || fallback[key]) {
        element.textContent = dictionary[key] || fallback[key];
      }
    });

    document.querySelectorAll("[data-translate-alt]").forEach(function (element) {
      const key = element.getAttribute("data-translate-alt");
      if (dictionary[key] || fallback[key]) {
        element.setAttribute("alt", dictionary[key] || fallback[key]);
      }
    });

    document.querySelectorAll("[data-translate-aria-label]").forEach(function (element) {
      const key = element.getAttribute("data-translate-aria-label");
      if (dictionary[key] || fallback[key]) {
        element.setAttribute("aria-label", dictionary[key] || fallback[key]);
      }
    });

    const translatedTitle = document.querySelector("title[data-translate]");
    if (translatedTitle) {
      const key = translatedTitle.getAttribute("data-translate");
      if (dictionary[key] || fallback[key]) {
        document.title = dictionary[key] || fallback[key];
      }
    }

    document.documentElement.lang = language === "zh" ? "zh-CN" : language;
  }

  function updateLanguageSelector(language) {
    if (!languageButton) return;

    languageButton.textContent = languageLabels[language] || "RU";
    languageButton.setAttribute("data-lang", language);

    languageOptions.forEach(function (option) {
      const isSelected = option.getAttribute("data-language") === language;
      option.classList.toggle("active", isSelected);
      option.setAttribute("aria-selected", isSelected ? "true" : "false");
    });
  }

  function closeLanguageMenu() {
    if (!selector || !languageButton) return;

    selector.classList.remove("open");
    languageButton.setAttribute("aria-expanded", "false");
  }

  function toggleLanguageMenu() {
    if (!selector || !languageButton) return;

    const isOpen = selector.classList.toggle("open");
    languageButton.setAttribute("aria-expanded", isOpen ? "true" : "false");
  }

  function setLanguage(language) {
    if (!languages.includes(language)) return;

    currentLanguage = language;
    saveLanguage(language);
    applyTranslations(language);
    updateLanguageSelector(language);
    closeLanguageMenu();
  }

  applyTranslations(currentLanguage);
  updateLanguageSelector(currentLanguage);

  if (languageButton) {
    languageButton.addEventListener("click", function (event) {
      event.stopPropagation();
      toggleLanguageMenu();
    });
  }

  languageOptions.forEach(function (option) {
    option.addEventListener("click", function (event) {
      event.stopPropagation();
      setLanguage(option.getAttribute("data-language"));
    });
  });

  document.addEventListener("click", function (event) {
    if (selector && !selector.contains(event.target)) {
      closeLanguageMenu();
    }
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      closeLanguageMenu();
    }
  });
});
