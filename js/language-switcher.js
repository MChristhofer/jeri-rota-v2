(() => {
  const languages = [
    { code: "en", flag: "/assets/lang-us.svg", label: "Traduzir para inglês" },
    { code: "es", flag: "/assets/lang-es.svg", label: "Traduzir para espanhol" },
    { code: "fr", flag: "/assets/flag-fr.svg", label: "Traduzir para francês" },
  ];

  const switcher = document.createElement("nav");
  switcher.className = "language-switcher";
  switcher.setAttribute("aria-label", "Traduzir o site");

  languages.forEach(({ code, flag, label }) => {
    const link = document.createElement("a");
    const pageUrl = `https://www.jerirota.com.br/${window.location.hash}`;
    link.className = "language-flag";
    link.href = `https://translate.google.com/translate?sl=pt&tl=${code}&u=${encodeURIComponent(pageUrl)}`;
    link.title = label;
    link.setAttribute("aria-label", label);
    link.rel = "noopener";
    const image = document.createElement("img");
    image.src = flag;
    image.alt = "";
    image.setAttribute("aria-hidden", "true");
    link.appendChild(image);
    switcher.appendChild(link);
  });

  const mount = () => {
    const header = document.querySelector(".header-inner");
    if (!header || header.querySelector(".language-switcher")) return;
    const menuButton = header.querySelector(".menu-toggle");
    header.insertBefore(switcher, menuButton || header.querySelector(".nav"));
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mount, { once: true });
  } else {
    mount();
  }
})();
