/* Jeri Rota | escolha da hospedagem na Taíba — sem alterar o total */
(function () {
  "use strict";
  function start() {
    var inputs = document.querySelectorAll('input[name="taiba-hotel"]');
    var summary = document.querySelector("[data-taiba-hotel-summary]");
    if (!inputs.length || !summary) return;

    var options = {
      catavento: { pt: "Pousada Catavento Taíba · 1 noite", fr: "Pousada Catavento Taíba · 1 nuit", en: "Pousada Catavento Taíba · 1 night" },
      arco: { pt: "Arco Mundial Taíba · 1 noite", fr: "Arco Mundial Taíba · 1 nuit", en: "Arco Mundial Taíba · 1 night" }
    };
    var placeholder = { pt: "Hospedagem Taíba · escolha uma opção", fr: "Hébergement Taíba · choisir une option", en: "Taíba accommodation · select one option" };

    function language() {
      var lang = document.documentElement.lang || "pt";
      return /^fr/i.test(lang) ? "fr" : /^en/i.test(lang) ? "en" : "pt";
    }
    function refresh() {
      var selected = document.querySelector('input[name="taiba-hotel"]:checked');
      summary.textContent = selected && options[selected.value]
        ? options[selected.value][language()]
        : placeholder[language()];
      document.querySelectorAll('.taiba-stay-card').forEach(function (card) {
        var radio = card.querySelector('input[name="taiba-hotel"]');
        card.classList.toggle("taiba-chosen", Boolean(radio && radio.checked));
      });
    }
    inputs.forEach(function (input) { input.addEventListener("change", refresh); });
    document.querySelectorAll("[data-language]").forEach(function (button) { button.addEventListener("click", refresh); });
    window.addEventListener("pageshow", refresh);
    refresh();
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start, { once: true });
  } else {
    start();
  }
})();
