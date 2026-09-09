(function () {
  var products = [
    ["Transfer Hilux 4x4", "Transfer privativo com conforto e segurança.", "R$ 800", "por veículo/trecho · rota confirmada no atendimento", "/Hillux.jpg", "/transfer-4x4/"],
    ["Ônibus da Madrugada", "Transporte compartilhado em horário especial.", "R$ 200", "por pessoa · trecho confirmado na proposta", "/Onibus.jpg", "/onibus-madrugada/"],
    ["Passeio Lado Leste", "Dunas, lagoas e paisagens do lado leste.", "R$ 100", "por pessoa na opção compartilhada · privativo sob consulta", "/Leste.jpg", "/passeio-lado-leste/"],
    ["Passeio Lado Oeste", "Mangue Seco e praias do lado oeste.", "R$ 110", "por pessoa na opção compartilhada · privativo sob consulta", "/Oeste.jpg", "/passeio-lado-oeste/"],
    ["Passeio Extremo Leste", "Uma experiência completa pelo litoral leste.", "R$ 150", "por pessoa na opção compartilhada · privativo sob consulta", "/Extremo.jpg", "/extremo-leste/"],
    ["Hospedagem em Jericoacoara", "Opções selecionadas para sua estadia em Jeri.", "R$ 350", "por diária · acomodação conforme disponibilidade", "/Hospedagem.jpg", "/hospedagem-jericoacoara/"],
    ["Rota das Emoções", "Expedição personalizada entre Ceará e Maranhão.", "R$ 5.000", "por pacote/roteiro · composição confirmada na proposta", "/Rotaemoção.jpg", "/rota-das-emocoes/"]
  ];

  var reviewsReadUrl = "https://g.page/r/CQsf0i52NsLuEAE";

  function fixNavigation() {
    document.querySelectorAll('a[href="#destinos"]').forEach(function (link) {
      link.setAttribute("href", "#catalogo");
    });
    document.querySelectorAll('a[href="/#destinos"]').forEach(function (link) {
      link.setAttribute("href", "/#catalogo");
    });
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
    if (earlyReviewLink) {
      earlyReviewLink.href = reviewsReadUrl;
      earlyReviewLink.textContent = "Ler avaliações ↗";
    }

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
    if (aboutImage) {
      aboutImage.src = "/Hillux.jpg";
      aboutImage.alt = "Veículo 4x4 utilizado em transfers da Jeri Rota";
    }
    if (aboutCaption) aboutCaption.textContent = "Operação de transfer 4x4 da Jeri Rota";
  }

  function standardizeFooter() {
    var footerColumns = document.querySelectorAll(".footer .footer-grid > div");
    var toursColumn = footerColumns[2];
    if (!toursColumn) return;

    toursColumn.innerHTML = '<h3>Passeios principais</h3>' +
      '<a href="/passeio-lado-leste/">Lado Leste</a>' +
      '<a href="/passeio-lado-oeste/">Lado Oeste</a>' +
      '<a href="/extremo-leste/">Extremo Leste</a>' +
      '<a href="/rota-das-emocoes/">Rota das Emoções</a>';
  }

  function addCatalog() {
    if (document.querySelector("#catalogo")) return;
    var hero = document.querySelector("#inicio");
    var destinations = document.querySelector("#destinos");
    if (!hero || !destinations) return;

    var section = document.createElement("section");
    section.id = "catalogo";
    section.className = "catalog-section";
    section.setAttribute("aria-labelledby", "catalog-title");
    section.innerHTML = '<div class="container"><div class="catalog-heading"><span class="eyebrow light">CATÁLOGO JERI ROTA</span><h2 id="catalog-title">Escolha sua próxima <em>experiência</em></h2><p>Veja valores iniciais, a forma de cobrança e os detalhes de cada serviço. A confirmação final depende da data, disponibilidade, rota e modalidade escolhidas.</p></div><div class="catalog-grid">' + products.map(function (product, index) {
      return '<a class="catalog-card' + (index === 0 ? ' featured' : '') + '" href="' + product[5] + '" style="--catalog-image:url(&quot;' + product[4] + '&quot;)"><img src="' + product[4] + '" alt="' + product[0] + '" loading="lazy" width="640" height="430"><span class="catalog-label">A partir de ' + product[2] + '</span><div class="catalog-card-copy"><h3>' + product[0] + '</h3><p>' + product[1] + '</p><small class="catalog-price-note">' + product[3] + '</small><strong>Ver detalhes <i>→</i></strong></div></a>';
    }).join("") + '</div><p class="catalog-disclaimer">Valores exibidos são referências iniciais. Antes do pagamento, a equipe informa disponibilidade, modalidade, inclusões, despesas extras e condições aplicáveis ao serviço escolhido.</p></div>';

    hero.insertAdjacentElement("afterend", section);
    destinations.remove();
    fixNavigation();
    improveReviews();
    reinforceRealOperation();
    standardizeFooter();
  }

  function init() {
    addCatalog();
    fixNavigation();
    improveReviews();
    reinforceRealOperation();
    standardizeFooter();
  }

  if (document.readyState === "complete") init();
  else window.addEventListener("load", init, { once: true });
})();
