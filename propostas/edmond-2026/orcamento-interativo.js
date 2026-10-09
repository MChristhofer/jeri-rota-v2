/* Jeri Rota | Edmond & Caroline — duas aulas de Wingfoil, orçamento dinâmico */
(function () {
  "use strict";

  function initialize() {
    var preaVariants = {
      semi: {
        cents: 37900,
        pt: {
          title: "Wingfoil semiprivativo — instrutor francófono",
          description: "Aula de 2 horas para Edmond e Caroline com um instrutor francófono, dois equipamentos e prática simultânea. Transporte de ida e volta incluído; saída sugerida para iniciar a aula às 13h.",
          detail: "Um instrutor francófono para o casal, com dois equipamentos para prática simultânea e maior atenção à Caroline.",
          priceLabel: "Wingfoil Preá · semiprivativa",
          summary: "Wingfoil Preá · semiprivativa"
        },
        fr: {
          title: "Wingfoil semi-privé — moniteur francophone",
          description: "Cours de 2 heures pour Edmond et Caroline, avec un moniteur francophone, deux équipements et pratique simultanée. Transfert aller-retour inclus ; début du cours conseillé à 13h.",
          detail: "Un moniteur francophone pour le couple, deux équipements pour pratiquer simultanément et une attention particulière accordée à Caroline.",
          priceLabel: "Wingfoil à Preá · semi-privé",
          summary: "Wingfoil à Preá · semi-privé"
        },
        en: {
          title: "Semi-private Wingfoil — French-speaking instructor",
          description: "Two-hour lesson for Edmond and Caroline, with one French-speaking instructor, two equipment sets and simultaneous practice. Round-trip transport included; suggested lesson start at 1 pm.",
          detail: "One French-speaking instructor for the couple, two equipment sets for simultaneous practice, with extra attention to Caroline.",
          priceLabel: "Wingfoil Preá · semi-private",
          summary: "Wingfoil Preá · semi-private"
        }
      },
      shared: {
        cents: 29900,
        pt: {
          title: "Wingfoil compartilhado — instrutor francófono",
          description: "Aula de 2 horas para Edmond e Caroline com um instrutor francófono e um equipamento compartilhado. Os dois alternam a prática durante a sessão, com atenção especial à Caroline. Transporte de ida e volta incluído; início sugerido às 13h.",
          detail: "Um instrutor francófono e um equipamento compartilhado entre Edmond e Caroline, que se alternam durante as duas horas de aula.",
          priceLabel: "Wingfoil Preá · compartilhada",
          summary: "Wingfoil Preá · compartilhada"
        },
        fr: {
          title: "Wingfoil partagé — moniteur francophone",
          description: "Cours de 2 heures pour Edmond et Caroline avec un moniteur francophone et un seul équipement partagé. Vous pratiquez à tour de rôle, avec une attention particulière accordée à Caroline. Transfert aller-retour inclus ; début conseillé à 13h.",
          detail: "Un moniteur francophone et un équipement partagé entre Edmond et Caroline, qui pratiquent à tour de rôle pendant les deux heures.",
          priceLabel: "Wingfoil à Preá · partagé",
          summary: "Wingfoil à Preá · partagé"
        },
        en: {
          title: "Shared Wingfoil — French-speaking instructor",
          description: "Two-hour lesson for Edmond and Caroline with one French-speaking instructor and one shared equipment set. You take turns practising, with extra attention to Caroline. Round-trip transport included; suggested start at 1 pm.",
          detail: "One French-speaking instructor and one shared equipment set, with Edmond and Caroline taking turns throughout the two-hour lesson.",
          priceLabel: "Wingfoil Preá · shared",
          summary: "Wingfoil Preá · shared"
        }
      }
    };
    var icaraiVariants = {
    "semi": {
        "cents": 37900,
        "pt": {
            "title": "Wingfoil semiprivativo — um instrutor para o casal",
            "description": "Aula prevista de 2 horas para Edmond e Caroline, com um instrutor para ambos, dois equipamentos e prática simultânea. Maior atenção à Caroline; horários a combinar com a escola.",
            "detail": "Modalidade semiprivativa prevista: dois equipamentos para prática simultânea, sujeitos à confirmação da escola.",
            "priceLabel": "Wingfoil Icaraizinho · semiprivativa",
            "summary": "Wingfoil Icaraizinho · semiprivativa (estimativa)"
        },
        "fr": {
            "title": "Wingfoil semi-privé — un moniteur pour le couple",
            "description": "Séance de 2 heures envisagée pour Edmond et Caroline avec un seul moniteur, deux équipements et une pratique simultanée. Plus d'attention à Caroline ; horaires à confirmer auprès de l'école.",
            "detail": "Formule semi-privée envisagée : deux équipements pour pratiquer simultanément, sous réserve de confirmation par l'école.",
            "priceLabel": "Wingfoil à Icaraizinho · semi-privé",
            "summary": "Wingfoil Icaraizinho · semi-privé (estimation)"
        },
        "en": {
            "title": "Semi-private Wingfoil — one instructor for the couple",
            "description": "Proposed two-hour lesson for Edmond and Caroline with one instructor, two equipment sets and simultaneous practice. Extra attention for Caroline; time to be confirmed by the school.",
            "detail": "Proposed semi-private option: two equipment sets for simultaneous practice, subject to the school's confirmation.",
            "priceLabel": "Wingfoil Icaraizinho · semi-private",
            "summary": "Wingfoil Icaraizinho · semi-private (estimate)"
        }
    },
    "shared": {
        "cents": 29900,
        "pt": {
            "title": "Wingfoil compartilhado — um instrutor para o casal",
            "description": "Aula prevista de 2 horas para Edmond e Caroline, com um instrutor e um equipamento compartilhado. O casal alterna a prática, com atenção especial à Caroline. Horários a confirmar.",
            "detail": "Modalidade compartilhada prevista: um equipamento para os dois, alternando a prática durante a aula; sujeita à confirmação da escola.",
            "priceLabel": "Wingfoil Icaraizinho · compartilhada",
            "summary": "Wingfoil Icaraizinho · compartilhada (estimativa)"
        },
        "fr": {
            "title": "Wingfoil partagé — un moniteur pour le couple",
            "description": "Séance de 2 heures envisagée pour Edmond et Caroline, avec un seul moniteur et un équipement partagé. Vous pratiquez à tour de rôle, avec une attention particulière à Caroline. Horaires à confirmer.",
            "detail": "Formule partagée envisagée : un équipement pour le couple, utilisé à tour de rôle ; sous réserve de confirmation par l'école.",
            "priceLabel": "Wingfoil à Icaraizinho · partagé",
            "summary": "Wingfoil Icaraizinho · partagé (estimation)"
        },
        "en": {
            "title": "Shared Wingfoil — one instructor for the couple",
            "description": "Proposed two-hour lesson for Edmond and Caroline with one instructor and one shared equipment set. You take turns practising, with extra attention for Caroline. Schedule to be confirmed.",
            "detail": "Proposed shared option: one equipment set used alternately by the couple; subject to the school's confirmation.",
            "priceLabel": "Wingfoil Icaraizinho · shared",
            "summary": "Wingfoil Icaraizinho · shared (estimate)"
        }
    }
};

    function formatEuro(cents) {
      return "€ " + (cents / 100).toLocaleString("de-DE", {
        minimumFractionDigits: 2, maximumFractionDigits: 2
      });
    }

    function currentLanguage() {
      var lang = document.documentElement.lang || "";
      if (/^fr/i.test(lang)) return "fr";
      if (/^en/i.test(lang)) return "en";
      return "pt";
    }

    var total = document.querySelector('[data-proposal-total]');
    if (!total) return;

    function updateOne(destination, variants) {
      var selected = document.querySelector('input[name="' + destination + '-wingfoil-plan"]:checked');
      var heading = document.querySelector('[data-' + destination + '-heading]');
      var description = document.querySelector('[data-' + destination + '-description]');
      var detail = document.querySelector('[data-' + destination + '-equipment]');
      var priceLabel = document.querySelector('[data-' + destination + '-price-label]');
      var itineraryPrice = document.querySelector('[data-' + destination + '-trip-price]');
      var summaryLabel = document.querySelector('[data-' + destination + '-summary-label]');
      var summaryPrice = document.querySelector('[data-' + destination + '-summary-price]');
      var row = document.querySelector('[data-variable-service="' + destination + '"]');
      if (!selected || !heading || !description || !detail || !priceLabel || !itineraryPrice ||
          !summaryLabel || !summaryPrice || !row) return;

      var selectedVariant = variants[selected.value];
      if (!selectedVariant) return;
      var content = selectedVariant[currentLanguage()];
      var amount = formatEuro(selectedVariant.cents);

      heading.textContent = content.title;
      description.textContent = content.description;
      detail.textContent = content.detail;
      priceLabel.textContent = content.priceLabel;
      itineraryPrice.textContent = amount;
      summaryLabel.textContent = content.summary;
      summaryPrice.textContent = amount;
      row.setAttribute("data-service-cents", String(selectedVariant.cents));
    }

    function refresh() {
      updateOne("icarai", icaraiVariants);
      updateOne("prea", preaVariants);

      var sum = 0;
      document.querySelectorAll(".service-values [data-service-cents]").forEach(function (row) {
        var cents = Number(row.getAttribute("data-service-cents"));
        if (Number.isSafeInteger(cents) && cents >= 0) sum += cents;
      });
      total.textContent = formatEuro(sum);
    }

    document.querySelectorAll('.wingfoil-plan-picker').forEach(function (picker) {
      picker.addEventListener("change", refresh);
      picker.addEventListener("input", refresh);
    });
    document.querySelectorAll('[data-language]').forEach(function (button) {
      button.addEventListener("click", refresh);
    });
    window.addEventListener("pageshow", refresh);
    refresh();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialize, { once: true });
  } else {
    initialize();
  }
})();
