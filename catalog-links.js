(function () {
  var products = [
    ["Lado Leste", "Praias, lagoas e dunas para conhecer Jericoacoara por outro ângulo.", "/leste-lagoa-aerea.png", "/passeio-lado-leste/"],
    ["Lado Oeste", "Manguezais, travessias e lagoas em uma experiência completa.", "/oeste-lagoa-aerea.jpeg", "/passeio-lado-oeste/"],
    ["Extremo Leste", "Dunas, lagoas naturais e espaços de lazer para aproveitar o dia.", "/extremo-clube-piscina.png", "/extremo-leste/"],
    ["Rota das Emoções", "Uma viagem entre Ceará, Piauí e Maranhão, feita no seu ritmo.", "/rota-lencois-lagoa.png", "/rota-das-emocoes/"],
    ["Outros destinos", "Conte para onde você quer ir e receba uma orientação personalizada.", "/outros-destinos.png", "https://wa.me/5588982274666?text=Olá!%20Quero%20consultar%20um%20destino%20que%20não%20está%20na%20lista."]
  ];

  var reviewsReadUrl = "https://g.page/r/CQsf0i52NsLuEAE";
  var TERMS_VERSION = "2026-09-11";
  var PRIVACY_VERSION = "2026-09-11";

  function fixNavigation() {
    document.querySelectorAll('a[href="#destinos"]').forEach(function (link) { link.setAttribute("href", "#catalogo"); });
    document.querySelectorAll('a[href="/#destinos"]').forEach(function (link) { link.setAttribute("href", "/#catalogo"); });
  }

  function improveReviews() {
    var heroRating = document.querySelector(".hero-rating");
    if (heroRating) {
      heroRating.href = reviewsReadUrl;
      heroRating.setAttribute("aria-label", "Ler avaliações da Jeri Rota no Google");
      var small = heroRating.querySelector("small");
      if (small) small.textContent = "· Ler avaliações";
    }
    var earlyReviewLink = document.querySelector(".early-proof a");
    if (earlyReviewLink) { earlyReviewLink.href = reviewsReadUrl; earlyReviewLink.textContent = "Ler avaliações ↗"; }
    var testimonialHeading = document.querySelector(".testimonials .section-heading");
    var reviewButton = testimonialHeading && testimonialHeading.querySelector('a[href*="/review"]');
    if (testimonialHeading && reviewButton && !testimonialHeading.querySelector(".review-read-button")) {
      var readButton = document.createElement("a");
      readButton.className = "button button-outline review-read-button";
      readButton.href = reviewsReadUrl;
      readButton.target = "_blank";
      readButton.rel = "noopener noreferrer";
      readButton.textContent = "Ler avaliações ↗";
      reviewButton.insertAdjacentElement("beforebegin", readButton);
    }
  }

  function reinforceRealOperation() {
    var aboutImage = document.querySelector(".about .team-photo img");
    var aboutCaption = document.querySelector(".about .team-photo figcaption");
    if (aboutImage) { aboutImage.src = "/Hillux.jpg"; aboutImage.alt = "Veículo 4x4 utilizado em transfers da Jeri Rota"; }
    if (aboutCaption) aboutCaption.textContent = "Operação de transfer 4x4 da Jeri Rota";
  }

  function standardizeFooter() {
    var footerColumns = document.querySelectorAll(".footer .footer-grid > div");
    var toursColumn = footerColumns[2];
    if (toursColumn) {
      toursColumn.innerHTML = '<h3>Destinos principais</h3>' +
        '<a href="/passeio-lado-leste/">Lado Leste</a>' +
        '<a href="/passeio-lado-oeste/">Lado Oeste</a>' +
        '<a href="/extremo-leste/">Extremo Leste</a>' +
        '<a href="/rota-das-emocoes/">Rota das Emoções</a>';
    }
    var legal = document.querySelector(".footer .legal");
    if (legal && !legal.querySelector('[href="/termos-e-condicoes/"]')) {
      var links = document.createElement("span");
      links.className = "footer-legal-links";
      links.innerHTML = '<a href="/termos-e-condicoes/">Termos e Condições</a> · <a href="/politica-de-privacidade/">Política de Privacidade</a> · <a href="mailto:contato@jerirota.com.br">contato@jerirota.com.br</a>';
      legal.appendChild(links);
    }
  }

  function addQuoteConsent() {
    var form = document.querySelector(".quote-form");
    if (!form || form.querySelector("#legal-consent")) return;
    var actions = form.querySelector(".form-actions");
    if (!actions) return;
    var wrapper = document.createElement("label");
    wrapper.className = "legal-consent-field";
    wrapper.style.cssText = "display:flex;align-items:flex-start;gap:10px;margin:16px 0;font-size:.86rem;line-height:1.45;color:#52636d";
    wrapper.innerHTML = '<input id="legal-consent" name="legalConsent" type="checkbox" required style="margin-top:4px;flex:0 0 auto">' +
      '<span>Li e concordo com os <a href="/termos-e-condicoes/" target="_blank" rel="noopener noreferrer" style="font-weight:700;text-decoration:underline">Termos e Condições</a> e com a <a href="/politica-de-privacidade/" target="_blank" rel="noopener noreferrer" style="font-weight:700;text-decoration:underline">Política de Privacidade</a> da Jeri Rota.</span>';
    actions.insertAdjacentElement("beforebegin", wrapper);
    form.addEventListener("submit", function (event) {
      var checkbox = form.querySelector("#legal-consent");
      if (!checkbox || !checkbox.checked) {
        event.preventDefault();
        checkbox.setCustomValidity("Você precisa aceitar os Termos e a Política de Privacidade para continuar.");
        checkbox.reportValidity();
        return;
      }
      checkbox.setCustomValidity("");
      try {
        sessionStorage.setItem("jeriRotaLegalAcceptance", JSON.stringify({ termsVersion: TERMS_VERSION, privacyVersion: PRIVACY_VERSION, acceptedAt: new Date().toISOString(), source: "homepage-quote" }));
      } catch (e) {}
    }, true);
    form.addEventListener("change", function (event) { if (event.target && event.target.id === "legal-consent") event.target.setCustomValidity(""); });
  }

  function standardizeServices() {
    var cards = document.querySelectorAll(".service-grid .service-card");
    Array.prototype.slice.call(cards, 3).forEach(function (card) { card.remove(); });
  }

  function configureServiceCards() {
    var services = [
      { title: "Transfer Hilux 4x4", description: "Deslocamento privativo com conforto e segurança para sua chegada ou saída.", image: "/Hillux.jpg", href: "/transfer-4x4/" },
      { title: "Ônibus da Madrugada", description: "Transporte compartilhado para Jericoacoara, com roteiro pensado para a sua viagem.", image: "/Onibus.jpg", href: "/onibus-madrugada/" },
      { title: "Hospedagem em Jericoacoara", description: "Encontre uma hospedagem alinhada ao seu perfil, período e experiência em Jeri.", image: "/Hospedagem.jpg", href: "/hospedagem-jericoacoara/" }
    ];
    var cards = document.querySelectorAll(".service-grid .service-card");
    services.forEach(function (service, index) {
      var card = cards[index]; if (!card) return;
      var title = card.querySelector("h3"), description = card.querySelector("p"), link = card.querySelector(".card-link");
      if (title) title.textContent = service.title;
      if (description) description.textContent = service.description;
      card.style.backgroundImage = "linear-gradient(180deg, rgba(4, 22, 33, .08) 0%, rgba(4, 22, 33, .95) 100%), url('" + service.image + "')";
      card.style.cursor = "pointer"; card.setAttribute("role", "link"); card.setAttribute("tabindex", "0"); card.setAttribute("aria-label", "Ver detalhes: " + service.title);
      if (link) { link.href = service.href; link.removeAttribute("target"); link.removeAttribute("rel"); link.innerHTML = "Ver detalhes <span>→</span>"; }
      if (!card.dataset.serviceCardLinked) {
        card.dataset.serviceCardLinked = "true";
        card.addEventListener("click", function (event) { if (event.target.closest("a")) return; window.location.href = card.dataset.serviceHref; });
        card.addEventListener("keydown", function (event) { if (event.key !== "Enter" && event.key !== " ") return; event.preventDefault(); window.location.href = card.dataset.serviceHref; });
      }
      card.dataset.serviceHref = service.href;
    });
  }

  function standardizeDestinations() {
    var label = document.querySelector(".destination-line span"), list = document.querySelector(".destination-line p");
    if (label) label.textContent = "DESTINOS EM DESTAQUE";
    if (list) list.textContent = "Lado Leste · Lado Oeste · Extremo Leste · Rota das Emoções · Outros destinos";
  }

  function addCatalog() {
    if (document.querySelector("#catalogo")) return;
    var hero = document.querySelector("#inicio"), destinations = document.querySelector("#destinos");
    if (!hero || !destinations) return;
    var section = document.createElement("section");
    section.id = "catalogo"; section.className = "catalog-section"; section.setAttribute("aria-labelledby", "catalog-title");
    section.innerHTML = '<div class="container"><div class="catalog-heading"><span class="eyebrow light">DESTINOS JERI ROTA</span><h2 id="catalog-title">Escolha seu próximo <em>destino</em></h2><p>Conheça os roteiros disponíveis ou conte para a equipe qual experiência deseja realizar.</p></div><div class="catalog-grid">' + products.map(function (product, index) {
      var isOtherDestination = product[3].indexOf("wa.me") !== -1;
      return '<a class="catalog-card' + (index === 0 ? ' featured' : '') + '" href="' + product[3] + '"' + (isOtherDestination ? ' target="_blank" rel="noopener noreferrer"' : '') + ' style="--catalog-image:url(&quot;' + product[2] + '&quot;)"><img src="' + product[2] + '" alt="' + product[0] + '" loading="lazy" width="640" height="430"><span class="catalog-label">Destino</span><div class="catalog-card-copy"><h3>' + product[0] + '</h3><p>' + product[1] + '</p><strong>' + (isOtherDestination ? 'Consultar no WhatsApp' : 'Ver roteiro') + ' <i>→</i></strong></div></a>';
    }).join("") + '</div><p class="catalog-disclaimer">Roteiros, horários e disponibilidade são confirmados pela equipe antes da reserva.</p></div>';
    hero.insertAdjacentElement("afterend", section); destinations.remove();
    fixNavigation(); improveReviews(); reinforceRealOperation(); standardizeFooter(); standardizeServices(); configureServiceCards(); standardizeDestinations(); addQuoteConsent();
  }

  function init() {
    addCatalog(); fixNavigation(); improveReviews(); reinforceRealOperation(); standardizeFooter(); standardizeServices(); configureServiceCards(); standardizeDestinations(); addQuoteConsent();
  }
  if (document.readyState === "complete") init(); else window.addEventListener("load", init, { once: true });
})();
