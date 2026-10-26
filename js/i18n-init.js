(function () {
  const supportedLanguages = ["ru", "en", "de", "zh"];

  function readSavedLanguage() {
    try {
      return localStorage.getItem("preferredLanguage");
    } catch (error) {
      return null;
    }
  }

  const savedLanguage = readSavedLanguage();
  const browserLanguage = (navigator.language || "ru")
    .slice(0, 2)
    .toLowerCase();
  const language = supportedLanguages.includes(savedLanguage)
    ? savedLanguage
    : supportedLanguages.includes(browserLanguage)
      ? browserLanguage
      : "ru";

  window.__panzziInitialLanguage = language;
  document.documentElement.lang = language === "zh" ? "zh-CN" : language;

  if (language !== "ru") {
    document.documentElement.dataset.i18nPending = "true";
    document.documentElement.style.visibility = "hidden";
    document.documentElement.style.backgroundColor = "#1a1a1a";

    window.setTimeout(function () {
      document.documentElement.style.visibility = "";
      document.documentElement.style.backgroundColor = "";
      delete document.documentElement.dataset.i18nPending;
    }, 2000);
  }
})();
