import { galleryData } from "./gallery-data.js?v=20261027";

export function initProjectGallery() {
  function getTranslatedScriptTitle(title) {
    const documentLanguage = document.documentElement.lang || "ru";
    const language = documentLanguage === "zh-CN" ? "zh" : documentLanguage;
    const labels = {
      ru: {
        tableware: "Посуда",
        lighting: "Освещение",
        furniture: "Мебель",
        material: "Материал",
        turnkey: "Проект под ключ",
        restaurant: "Ресторан",
        villa: "Вилла",
        wechat: "QR-код WeChat",
      },
      en: {
        tableware: "Tableware",
        lighting: "Lighting",
        furniture: "Furniture",
        material: "Material",
        turnkey: "Turnkey project",
        restaurant: "Restaurant",
        villa: "Villa",
        wechat: "WeChat QR code",
      },
      de: {
        tableware: "Geschirr",
        lighting: "Beleuchtung",
        furniture: "Möbel",
        material: "Material",
        turnkey: "Schlüsselfertiges Projekt",
        restaurant: "Restaurant",
        villa: "Villa",
        wechat: "WeChat-QR-Code",
      },
      zh: {
        tableware: "餐具",
        lighting: "照明",
        furniture: "家具",
        material: "材料",
        turnkey: "整体交付项目",
        restaurant: "餐厅",
        villa: "别墅",
        wechat: "微信二维码",
      },
    };
    const dictionary = labels[language] || labels.ru;
    const replacements = [
      ["Р СџР С•РЎРѓРЎС“Р Т‘Р В°", "tableware"],
      ["Р С›РЎРѓР Р†Р ВµРЎвЂ°Р ВµР Р…Р С‘Р Вµ", "lighting"],
      ["Р СљР ВµР В±Р ВµР В»РЎРЉ", "furniture"],
      ["Р СљР В°РЎвЂљР ВµРЎР‚Р С‘Р В°Р В»", "material"],
      ["Р СџРЎР‚Р С•Р ВµР С”РЎвЂљ Р С—Р С•Р Т‘ Р С”Р В»РЎР‹РЎвЂЎ", "turnkey"],
      ["РЎР‚Р ВµРЎРѓРЎвЂљР С•РЎР‚Р В°Р Р…", "restaurant"],
      ["Р вЂ™Р С‘Р В»Р В»Р В°", "villa"],
      ["Р’РёР»Р»Р°", "villa"],
      ["Вилла", "villa"],
      ["wechat", "wechat"],
    ];

    for (const [source, key] of replacements) {
      if (title.includes(source)) return title.replace(source, dictionary[key]);
    }

    return title;
  }

  function getGalleryRuntimeText(key) {
    const documentLanguage = document.documentElement.lang || "ru";
    const language = documentLanguage === "zh-CN" ? "zh" : documentLanguage;
    return typeof translations !== "undefined"
      ? translations[language]?.[key] || translations.ru?.[key] || ""
      : "";
  }

  let bodyScrollPosition = 0,
    currentVideoElement = null;

  function openModal(e) {
    ((bodyScrollPosition = window.scrollY),
      (document.body.style.position = "fixed"),
      (document.body.style.top = `-${bodyScrollPosition}px`),
      (document.body.style.width = "100%"),
      (document.body.style.overflow = "hidden"),
      (document.getElementById(e).style.display = "flex"));
  }

  function closeModal(e) {
    (currentVideoElement &&
      (currentVideoElement.pause(), (currentVideoElement = null)),
      (document.getElementById(e).style.display = "none"),
      (document.body.style.position = ""),
      (document.body.style.top = ""),
      (document.body.style.overflow = ""),
      window.scrollTo(0, bodyScrollPosition));
  }

  (document.querySelectorAll(".show-modal").forEach((e) => {
    e.addEventListener("click", function () {
      openModal(this.getAttribute("data-modal"));
    });
  }),
    document.querySelectorAll(".close-modal").forEach((e) => {
      e.addEventListener("click", function () {
        (currentVideoElement &&
          (currentVideoElement.pause(), (currentVideoElement = null)),
          closeModal(this.closest(".modal").id));
      });
    }),
    window.addEventListener("click", function (e) {
      e.target.classList.contains("modal") &&
        (currentVideoElement &&
          (currentVideoElement.pause(), (currentVideoElement = null)),
        closeModal(e.target.id));
    }));

  let currentGalleryIndex = 0,
    currentGalleryImages = [];

  const VIDEO_VOLUME_LEVEL = 0.03;

  function initGallery(e) {
    ((currentGalleryImages = galleryData[e] || []),
      (currentGalleryIndex = 0),
      (currentVideoElement = null));
    const t = document.querySelector(".main-gallery-slide"),
      o = document.querySelector(".gallery-thumbnails");
    if (
      ((t.innerHTML = ""),
      (o.innerHTML = ""),
      0 === currentGalleryImages.length)
    ) {
      const e = document.createElement("div");
      return (
        (e.textContent = getGalleryRuntimeText("gallery-empty")),
        void t.appendChild(e)
      );
    }
    (updateMainContent(),
      currentGalleryImages.forEach((e) => {
        if ("video" !== e.type) {
          new Image().src = e.src;
        }
      }),
      currentGalleryImages.forEach((e, t) => {
        const n = document.createElement("div");
        if (
          (n.classList.add("thumbnail"),
          0 === t && n.classList.add("active"),
          "video" === e.type)
        ) {
          const t = document.createElement("video");
          ((t.src = e.src),
            (t.muted = !0),
            (t.loop = !0),
            (t.playsInline = !0),
            (t.volume = 0),
            t.addEventListener("loadeddata", () => {
              t.currentTime = 0;
            }),
            t.addEventListener("seeked", () => {
              t.play().catch((e) => {});
            }),
            n.appendChild(t));
          const o = document.createElement("i");
          ((o.className = "fas fa-video thumbnail-video-icon"),
            n.appendChild(o));
        } else {
          const t = document.createElement("img");
          ((t.src = e.src),
            (t.alt = getTranslatedScriptTitle(e.alt)),
            n.appendChild(t));
        }
        (n.addEventListener("click", () => {
          updateGallery(t);
        }),
          o.appendChild(n));
      }));
  }

  function updateMainContent() {
    const e = document.querySelector(".main-gallery-slide"),
      t = currentGalleryImages[currentGalleryIndex];
    if (
      ((e.innerHTML = ""),
      currentVideoElement &&
        (currentVideoElement.pause(), (currentVideoElement = null)),
      "video" === t.type)
    ) {
      const o = document.createElement("video");
      ((o.src = t.src),
        (o.controls = !0),
        (o.autoplay = !0),
        (o.loop = !0),
        o.classList.add("active-gallery-video"),
        (o.volume = 0.03),
        o.addEventListener("volumechange", function () {
          o.volume > 0.03 && (o.volume = 0.03);
        }));
      const n = document.createElement("i");
      ((n.className = "fas fa-video gallery-video-icon"),
        e.appendChild(n),
        e.appendChild(o),
        (currentVideoElement = o));
    } else {
      const o = new Image();
      ((o.src = t.src),
        (o.alt = getTranslatedScriptTitle(t.alt)),
        o.classList.add("active-gallery-image"),
        e.appendChild(o));
    }
    centerActiveThumbnail();
  }

  function updateGallery(e) {
    const t = document.querySelectorAll(".thumbnail");
    (currentVideoElement &&
      (currentVideoElement.pause(), (currentVideoElement = null)),
      (currentGalleryIndex = e),
      updateMainContent(),
      t.forEach((t, o) => {
        t.classList.toggle("active", o === e);
      }));
  }

  function centerActiveThumbnail() {
    const e = document.querySelector(".gallery-thumbnails"),
      t = document.querySelector(".thumbnail.active");
    if (t) {
      const o = e.offsetWidth,
        n = t.offsetLeft,
        r = t.offsetWidth;
      e.scrollTo({ left: n - o / 2 + r / 2, behavior: "smooth" });
    }
  }

  function handleGalleryOpen(e) {
    const t = e.getAttribute("data-gallery");
    t && (initGallery(t), openModal("gallery-modal"));
  }

  (document.querySelectorAll(".btn-gallery, a[data-gallery]").forEach((e) => {
    e.addEventListener("click", function (t) {
      e.getAttribute("data-gallery") &&
        (t.preventDefault(), handleGalleryOpen(this));
    });
  }),
    document.querySelector(".gallery-prev")?.addEventListener("click", () => {
      updateGallery(
        (currentGalleryIndex - 1 + currentGalleryImages.length) %
          currentGalleryImages.length,
      );
    }),
    document.querySelector(".gallery-next")?.addEventListener("click", () => {
      updateGallery((currentGalleryIndex + 1) % currentGalleryImages.length);
    }),
    document.addEventListener("keydown", function (e) {
      if ("flex" === document.getElementById("gallery-modal")?.style.display)
        if ("ArrowLeft" === e.key) {
          updateGallery(
            (currentGalleryIndex - 1 + currentGalleryImages.length) %
              currentGalleryImages.length,
          );
        } else if ("ArrowRight" === e.key) {
          updateGallery(
            (currentGalleryIndex + 1) % currentGalleryImages.length,
          );
        } else
          "Escape" === e.key &&
            (currentVideoElement &&
              (currentVideoElement.pause(), (currentVideoElement = null)),
            closeModal("gallery-modal"));
    }),
    document.querySelector(".modal-overlay")?.addEventListener("click", () => {
      (currentVideoElement &&
        (currentVideoElement.pause(), (currentVideoElement = null)),
        closeModal("gallery-modal"));
    }),
    document
      .querySelector(".gallery-modal-content")
      ?.addEventListener("click", (e) => {
        e.stopPropagation();
      }));
}
