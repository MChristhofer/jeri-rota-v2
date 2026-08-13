(function () {
  var products = [
    ["Transfer Hilux 4x4", "Transfer privativo com conforto e segurança.", "R$ 800", "/Hillux.jpg", "/transfer-4x4/"],
    ["Ônibus da Madrugada", "Transporte compartilhado em horário especial.", "R$ 200", "/Onibus.jpg", "/onibus-madrugada/"],
    ["Passeio Lado Leste", "Dunas, lagoas e paisagens do lado leste.", "R$ 100", "/Leste.jpg", "/passeio-lado-leste/"],
    ["Passeio Lado Oeste", "Mangue Seco e praias do lado oeste.", "R$ 110", "/Oeste.jpg", "/passeio-lado-oeste/"],
    ["Passeio Extremo Leste", "Uma experiência completa pelo litoral leste.", "R$ 150", "/Extremo.jpg", "/extremo-leste/"],
    ["Hospedagem em Jericoacoara", "Opções selecionadas para sua estadia em Jeri.", "R$ 350", "/Hospedagem.jpg", "/hospedagem-jericoacoara/"],
    ["Rota das Emoções", "Expedição personalizada entre Ceará e Maranhão.", "R$ 5.000", "/Rotaemoção.jpg", "/rota-das-emocoes/"]
  ];

  function addCatalog() {
    if (document.querySelector("#catalogo")) return;
    var destinations = document.querySelector("#destinos");
    if (!destinations) return;
    var section = document.createElement("section");
    section.id = "catalogo";
    section.className = "catalog-section";
    section.setAttribute("aria-labelledby", "catalog-title");
    section.innerHTML = '<div class="container"><div class="catalog-heading"><span class="eyebrow light">CATÁLOGO JERI ROTA</span><h2 id="catalog-title">Escolha sua próxima <em>experiência</em></h2><p>Conheça os sete serviços da Jeri Rota e acesse todos os detalhes antes de reservar.</p></div><div class="catalog-grid">' + products.map(function (product, index) {
      return '<a class="catalog-card' + (index === 0 ? ' featured' : '') + '" href="' + product[4] + '" style="--catalog-image:url(&quot;' + product[3] + '&quot;)"><img src="' + product[3] + '" alt="' + product[0] + '" loading="lazy" width="640" height="430"><span class="catalog-label">A partir de ' + product[2] + '</span><div class="catalog-card-copy"><h3>' + product[0] + '</h3><p>' + product[1] + '</p><strong>Ver detalhes <i>→</i></strong></div></a>';
    }).join("") + '</div></div>';
    destinations.insertAdjacentElement("beforebegin", section);
    var earlyReview = document.querySelector(".early-proof");
    if (earlyReview) earlyReview.remove();
    destinations.remove();
  }

  if (document.readyState === "complete") addCatalog();
  else window.addEventListener("load", addCatalog, { once: true });
})();
