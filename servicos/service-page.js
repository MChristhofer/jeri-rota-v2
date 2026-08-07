(function () {
  var root = document.querySelector("[data-service-page]");
  if (!root) return;
  var slug = root.dataset.servicePage;
  var data = window.JERI_ROTA_SERVICES && window.JERI_ROTA_SERVICES[slug];
  if (!data) {
    root.innerHTML = '<main class="not-found"><h1>Serviço não encontrado</h1><a href="/">Voltar ao site</a></main>';
    return;
  }

  var whatsappNumber = "5588982274666";
  var whatsappUrl = "https://wa.me/" + whatsappNumber + "?text=" + encodeURIComponent(data.message);
  var icon = '<svg aria-hidden="true" viewBox="0 0 32 32"><path d="M16 3a13 13 0 0 0-11 20L3 29l6-2a13 13 0 1 0 7-24Zm0 23a10 10 0 0 1-5-1.4l-.4-.2-3.5 1.1 1.1-3.4-.2-.4A10 10 0 1 1 16 26Zm5.5-7.3c-.3-.2-1.8-.9-2.1-1-.3-.1-.5-.2-.7.2l-1 1.2c-.2.2-.4.2-.7.1-1.8-.9-3-1.7-4.2-3.8-.3-.5.3-.5.9-1.7.1-.2 0-.5 0-.7l-.9-2.2c-.2-.5-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.4-1.2 1.2-1.2 2.9s1.3 3.4 1.4 3.6c.2.2 2.5 3.8 6 5.3 2.3 1 3.2 1.1 4.4.9.7-.1 1.8-.7 2-1.4.3-.7.3-1.3.2-1.4-.2-.3-.5-.4-.9-.5Z"/></svg>';
  function list(items) { return items.map(function (item) { return "<li>" + item + "</li>"; }).join(""); }
  function wa(label, className) { return '<a class="' + (className || "button") + '" data-action="whatsapp" data-service="' + slug + '" href="' + whatsappUrl + '" target="_blank" rel="noopener noreferrer">' + icon + label + "</a>"; }

  root.innerHTML = `
    <header class="site-header"><a class="brand" href="/" aria-label="Jeri Rota — início"><img src="/logo.png" alt="Jeri Rota"></a><button class="menu-toggle" type="button" aria-expanded="false" aria-controls="service-nav"><span></span><span></span><span></span><span class="sr-only">Abrir menu</span></button><nav id="service-nav" aria-label="Navegação principal"><a href="/">Início</a><a href="/hospedagem-jericoacoara/" ${slug === "hospedagem-jericoacoara" ? 'aria-current="page"' : ""}>Hospedagem</a><div class="nav-group"><button type="button" aria-expanded="false">Passeios <span>⌄</span></button><div class="nav-submenu"><a href="/passeio-lado-leste/" ${slug === "passeio-lado-leste" ? 'aria-current="page"' : ""}>Lado Leste</a><a href="/passeio-lado-oeste/" ${slug === "passeio-lado-oeste" ? 'aria-current="page"' : ""}>Lado Oeste</a><a href="/extremo-leste/" ${slug === "extremo-leste" ? 'aria-current="page"' : ""}>Extremo Leste</a></div></div><div class="nav-group"><button type="button" aria-expanded="false">Transfers <span>⌄</span></button><div class="nav-submenu"><a href="/transfer-4x4/" ${slug === "transfer-4x4" ? 'aria-current="page"' : ""}>Hilux 4x4</a><a href="/onibus-madrugada/" ${slug === "onibus-madrugada" ? 'aria-current="page"' : ""}>Ônibus da Madrugada</a></div></div><a href="/rota-das-emocoes/" ${slug === "rota-das-emocoes" ? 'aria-current="page"' : ""}>Rota das Emoções</a></nav>${wa("Falar no WhatsApp", "header-wa")}</header>
    <main>
      <section class="hero" style="--hero-image:url('${data.hero}')"><div class="hero-shade"></div><div class="hero-content"><span class="eyebrow">${data.eyebrow}</span><h1>${data.title}</h1><p>${data.lead}</p>${wa("Consultar disponibilidade")}</div></section>
      <section class="summary wrap" aria-label="Resumo do serviço">${data.summary.map(function (item) { return `<article><span>${item[0]}</span><strong>${item[1]}</strong></article>`; }).join("")}</section>
      <section class="intro wrap section"><div><span class="eyebrow dark">Jeri Rota</span><h2>Planeje com atendimento local</h2></div><p>${data.description}</p></section>
      <section class="route section"><div class="wrap"><span class="eyebrow">Como funciona</span><h2>Do primeiro contato à confirmação</h2><ol>${data.route.map(function (item, i) { return `<li><span>${String(i + 1).padStart(2, "0")}</span><p>${item}</p></li>`; }).join("")}</ol></div></section>
      <section class="lists wrap section"><article><h2>O que está previsto</h2><ul class="check">${list(data.included)}</ul></article><article><h2>Consulte antes de contratar</h2><ul class="cross">${list(data.notIncluded)}</ul></article></section>
      <section class="gallery wrap section"><span class="eyebrow dark">Galeria</span><h2>Uma prévia da experiência</h2><div>${data.gallery.map(function (img, i) { return `<figure><img src="${img[0]}" alt="${img[1]}" ${i ? 'loading="lazy"' : ""} width="900" height="700"><figcaption>${img[1]}</figcaption></figure>`; }).join("")}</div></section>
      <section class="important section"><div class="wrap"><span class="eyebrow">Antes de reservar</span><h2>Informações importantes</h2><ul>${list(data.important)}</ul></div></section>
      <section class="final-cta"><div class="wrap"><span class="eyebrow">Atendimento direto</span><h2>Vamos organizar ${data.title.toLowerCase()}?</h2><p>Envie sua data e a quantidade de pessoas. A equipe responde com as opções disponíveis.</p>${wa("Pedir informações no WhatsApp")}</div></section>
    </main>
    <footer><div class="wrap"><a class="footer-brand" href="/"><img src="/logo.png" alt="Jeri Rota"></a><p>Transfer, hospedagem e passeios em Jericoacoara com atendimento pelo WhatsApp.</p><nav aria-label="Links do rodapé"><a href="/">Início</a><a href="/politica-privacidade.html">Privacidade</a><a href="/termos-uso.html">Termos de uso</a></nav><small>© ${new Date().getFullYear()} Jeri Rota. Todos os direitos reservados.</small></div></footer>
    ${wa("<span>Falar no WhatsApp</span>", "mobile-wa")}`;

  document.querySelectorAll('[data-action="whatsapp"]').forEach(function (link) {
    link.addEventListener("click", function () {
      if (window.fbq) window.fbq("trackCustom", "WhatsAppClick", { service: slug });
    });
  });
  var menuToggle = document.querySelector(".menu-toggle");
  var serviceNav = document.querySelector("#service-nav");
  menuToggle.addEventListener("click", function () {
    var open = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!open));
    serviceNav.classList.toggle("is-open", !open);
  });
  document.querySelectorAll(".nav-group > button").forEach(function (button) {
    button.addEventListener("click", function () {
      var open = button.getAttribute("aria-expanded") === "true";
      document.querySelectorAll(".nav-group > button").forEach(function (other) { if (other !== button) other.setAttribute("aria-expanded", "false"); });
      button.setAttribute("aria-expanded", String(!open));
    });
  });
})();
