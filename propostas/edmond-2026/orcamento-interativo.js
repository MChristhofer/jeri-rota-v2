/* Jeri Rota | Proposta Edmond — orçamento interativo de Preá */
(function () {
  "use strict";

  function initialize() {
    var inputs = Array.prototype.slice.call(document.querySelectorAll('input[name="prea-wingfoil-plan"]'));
    var section = document.querySelector('.wingfoil-plan-picker');
    var heading = document.querySelector('[data-prea-heading]');
    var description = document.querySelector('[data-prea-description]');
    var included = document.querySelector('[data-prea-equipment]');
    var priceLabel = document.querySelector('[data-prea-price-label]');
    var itineraryPrice = document.querySelector('[data-prea-trip-price]');
    var summaryLabel = document.querySelector('[data-prea-summary-label]');
    var summaryPrice = document.querySelector('[data-prea-summary-price]');
    var row = document.querySelector('[data-variable-service="prea"]');
    var total = document.querySelector('[data-proposal-total]');
    if (!inputs.length || !section || !heading || !description || !included ||
        !priceLabel || !itineraryPrice || !summaryLabel || !summaryPrice || !row || !total) {
      return;
    }

    var variants = {
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

    function update() {
      var selected = inputs.filter(function (input) { return input.checked; })[0] || inputs[0];
      var variant = variants[selected.value];
      if (!variant) return;
      var text = variant[currentLanguage()];
      var formatted = formatEuro(variant.cents);

      heading.textContent = text.title;
      description.textContent = text.description;
      included.textContent = text.detail;
      priceLabel.textContent = text.priceLabel;
      itineraryPrice.textContent = formatted;
      summaryLabel.textContent = text.summary;
      summaryPrice.textContent = formatted;
      row.dataset.serviceCents = String(variant.cents);

      var sum = 0;
      document.querySelectorAll('.service-values [data-service-cents]').forEach(function (item) {
        var cents = Number(item.getAttribute('data-service-cents'));
        if (Number.isSafeInteger(cents) && cents >= 0) sum += cents;
      });
      total.textContent = formatEuro(sum);
    }

    section.addEventListener('change', update);
    section.addEventListener('input', update);
    document.querySelectorAll('[data-language]').forEach(function (button) {
      button.addEventListener('click', update);
    });
    window.addEventListener('pageshow', update);
    update();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialize, { once: true });
  } else {
    initialize();
  }
})();
