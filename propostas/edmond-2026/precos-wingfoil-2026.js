/* Sessões Wingfoil semiprivativas escolhidas por Edmond & Caroline | Jeri Rota */
(function () {
  "use strict";
  const lessons = {
    icarai: {
      semi: {
        cents: 30900,
        pt: ["Wingfoil semiprivativo — instrutor certificado francófono", "Aula semiprivativa de 2 horas para Edmond e Caroline, com um instrutor certificado que fala francês, equipamentos completos para ambos. Prática simultânea, com atenção especial à Caroline. Busca no Makena Hotel e retorno incluídos, sem custo extra. Aula prevista para 30/10.", "Na modalidade semiprivativa, a escola informou um instrutor certificado que fala francês, dois equipamentos completos, permitindo prática simultânea.", "Wingfoil Icaraizinho · semiprivativa"],
        fr: ["Wingfoil semi-privé — moniteur certifié francophone", "Cours semi-privé de deux heures pour Edmond et Caroline, avec un moniteur certifié francophone, un équipement complet pour chacun. Pratique simultanée, avec une attention particulière à Caroline. Transfert aller-retour depuis le Makena Hotel inclus sans supplément. Cours prévu le 30/10.", "Pour la formule semi-privée, l'école prévoit un moniteur certifié francophone, deux équipements complets, permettant de pratiquer en même temps.", "Wingfoil Icaraizinho · semi-privé"],
        en: ["Semi-private Wingfoil — certified French-speaking instructor", "Two-hour semi-private lesson for Edmond and Caroline, with a certified French-speaking instructor, complete equipment for each. Simultaneous practice, with extra attention for Caroline. Round-trip transfer from Makena Hotel included at no extra charge. Lesson scheduled for October 30.", "For the semi-private lesson, the school offers a certified French-speaking instructor, two complete equipment sets for simultaneous practice.", "Wingfoil Icaraizinho · semi-private"]
      }
    },
    prea: {
      semi: {
        cents: 40900,
        pt: ["Wingfoil semiprivativo — instrutor certificado francófono", "Aula de 2 horas para Edmond e Caroline com um instrutor certificado que fala francês, dois equipamentos e prática simultânea. Transporte de ida e volta incluído; início sugerido às 13h.", "Um instrutor certificado que fala francês para o casal, com dois equipamentos para prática simultânea e maior atenção à Caroline.", "Wingfoil Preá · semiprivativa"],
        fr: ["Wingfoil semi-privé — moniteur certifié francophone", "Cours de 2 heures pour Edmond et Caroline, avec un moniteur certifié francophone, deux équipements et pratique simultanée. Transfert aller-retour inclus ; début conseillé à 13h.", "Un moniteur certifié francophone pour le couple, deux équipements pour pratiquer simultanément et une attention particulière à Caroline.", "Wingfoil à Preá · semi-privé"],
        en: ["Semi-private Wingfoil — certified French-speaking instructor", "Two-hour lesson for Edmond and Caroline with one certified French-speaking instructor, two equipment sets and simultaneous practice. Round-trip transport included; suggested start at 1 pm.", "One certified French-speaking instructor for the couple, two equipment sets for simultaneous practice, with extra attention for Caroline.", "Wingfoil Preá · semi-private"]
      }
    }
  };
  function start() {
    const total = document.querySelector("[data-proposal-total]");
    if (!total) return;
    const lang = () => /^fr/i.test(document.documentElement.lang) ? "fr" : /^en/i.test(document.documentElement.lang) ? "en" : "pt";
    const euros = cents => "€ " + (cents / 100).toLocaleString("de-DE", {minimumFractionDigits: 2, maximumFractionDigits: 2});
    function update() {
      for (const [place, options] of Object.entries(lessons)) {
        const option = options.semi;
        const [title, description, equipment, label] = option[lang()];
        const parts = {
          heading: title, description, equipment,
          "price-label": label, "summary-label": label,
          "trip-price": euros(option.cents), "summary-price": euros(option.cents)
        };
        for (const [part, value] of Object.entries(parts)) {
          const el = document.querySelector("[data-" + place + "-" + part + "]");
          if (el) el.textContent = value;
        }
        const row = document.querySelector('[data-variable-service="' + place + '"]');
        if (row) row.setAttribute("data-service-cents", String(option.cents));
      }
      let sum = 0;
      document.querySelectorAll(".service-values [data-service-cents]").forEach(el => {
        const cents = Number(el.getAttribute("data-service-cents"));
        if (Number.isSafeInteger(cents) && cents >= 0) sum += cents;
      });
      total.textContent = euros(sum);
    }
    document.querySelectorAll("[data-language]").forEach(btn => btn.addEventListener("click", update));
    window.addEventListener("pageshow", update);
    update();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start, {once:true});
  else start();
})();
