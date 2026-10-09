/* Orçamento interativo Edmond & Caroline | Jeri Rota */
(function () {
  "use strict";
  const lessons = {
    icarai: {
      semi: {
        cents: 30900,
        pt: ["Wingfoil semiprivativo — instrutor certificado francófono", "Aula semiprivativa de 2 horas para Edmond e Caroline, com um instrutor certificado que fala francês, um assistente experiente e equipamentos completos para ambos. Prática simultânea, com atenção especial à Caroline; horário sujeito à confirmação.", "Na modalidade semiprivativa, a escola informou um instrutor certificado que fala francês, um assistente experiente e dois equipamentos completos, permitindo prática simultânea.", "Wingfoil Icaraizinho · semiprivativa"],
        fr: ["Wingfoil semi-privé — moniteur certifié francophone", "Cours semi-privé de deux heures pour Edmond et Caroline, avec un moniteur certifié francophone, un assistant expérimenté et un équipement complet pour chacun. Pratique simultanée, avec une attention particulière à Caroline ; horaire à confirmer.", "Pour la formule semi-privée, l'école prévoit un moniteur certifié francophone, un assistant expérimenté et deux équipements complets, permettant de pratiquer en même temps.", "Wingfoil Icaraizinho · semi-privé"],
        en: ["Semi-private Wingfoil — certified French-speaking instructor", "Two-hour semi-private lesson for Edmond and Caroline, with a certified French-speaking instructor, an experienced assistant and complete equipment for each. Simultaneous practice, with extra attention for Caroline; timing subject to confirmation.", "For the semi-private lesson, the school offers a certified French-speaking instructor, an experienced assistant and two complete equipment sets for simultaneous practice.", "Wingfoil Icaraizinho · semi-private"]
      },
      shared: {
        cents: 23900,
        pt: ["Wingfoil compartilhado — instrutor certificado francófono", "Aula de 2 horas para Edmond e Caroline, com um instrutor certificado que fala francês e um equipamento de Wingfoil utilizado alternadamente. Caroline terá atenção especial durante a prática; horário a confirmar com a escola.", "Um equipamento compartilhado pelo casal, com prática alternada ao longo das 2 horas. A disponibilidade para a data e as condições do traslado serão reconfirmadas com a escola.", "Wingfoil Icaraizinho · compartilhada"],
        fr: ["Wingfoil partagé — moniteur certifié francophone", "Cours de 2 heures pour Edmond et Caroline avec un moniteur certifié francophone et un seul équipement de Wingfoil, utilisé à tour de rôle. Caroline bénéficiera d'une attention particulière ; horaire à confirmer avec l'école.", "Un équipement partagé entre les deux élèves, avec pratique alternée pendant les 2 heures. La disponibilité pour la date et les modalités de transfert seront reconfirmées auprès de l'école.", "Wingfoil Icaraizinho · partagé"],
        en: ["Shared Wingfoil — certified French-speaking instructor", "Two-hour lesson for Edmond and Caroline with one certified French-speaking instructor and one Wingfoil equipment set, used alternately. Caroline receives special attention; time to be confirmed by the school.", "One equipment set shared by the couple, taking turns during the two-hour session. Lesson availability and transport arrangements will be reconfirmed for the requested date.", "Wingfoil Icaraizinho · shared"]
      }
    },
    prea: {
      semi: {
        cents: 40900,
        pt: ["Wingfoil semiprivativo — instrutor certificado francófono", "Aula de 2 horas para Edmond e Caroline com um instrutor certificado que fala francês, dois equipamentos e prática simultânea. Transporte de ida e volta incluído; início sugerido às 13h.", "Um instrutor certificado que fala francês para o casal, com dois equipamentos para prática simultânea e maior atenção à Caroline.", "Wingfoil Preá · semiprivativa"],
        fr: ["Wingfoil semi-privé — moniteur certifié francophone", "Cours de 2 heures pour Edmond et Caroline, avec un moniteur certifié francophone, deux équipements et pratique simultanée. Transfert aller-retour inclus ; début conseillé à 13h.", "Un moniteur certifié francophone pour le couple, deux équipements pour pratiquer simultanément et une attention particulière à Caroline.", "Wingfoil à Preá · semi-privé"],
        en: ["Semi-private Wingfoil — certified French-speaking instructor", "Two-hour lesson for Edmond and Caroline with one certified French-speaking instructor, two equipment sets and simultaneous practice. Round-trip transport included; suggested start at 1 pm.", "One certified French-speaking instructor for the couple, two equipment sets for simultaneous practice, with extra attention for Caroline.", "Wingfoil Preá · semi-private"]
      },
      shared: {
        cents: 33900,
        pt: ["Wingfoil compartilhado — instrutor certificado francófono", "Aula de 2 horas para Edmond e Caroline com um instrutor certificado que fala francês e um equipamento compartilhado. Os dois alternam a prática, com maior atenção à Caroline. Transporte de ida e volta incluído.", "Um instrutor certificado que fala francês e um equipamento compartilhado entre Edmond e Caroline, com prática alternada durante a aula.", "Wingfoil Preá · compartilhada"],
        fr: ["Wingfoil partagé — moniteur certifié francophone", "Cours de 2 heures pour Edmond et Caroline avec un moniteur certifié francophone et un seul équipement partagé. Vous pratiquez à tour de rôle, avec une attention particulière à Caroline. Transfert aller-retour inclus.", "Un moniteur certifié francophone et un équipement partagé entre Edmond et Caroline, utilisé à tour de rôle pendant le cours.", "Wingfoil à Preá · partagé"],
        en: ["Shared Wingfoil — certified French-speaking instructor", "Two-hour lesson for Edmond and Caroline with one certified French-speaking instructor and one shared equipment set. You take turns practising, with extra attention for Caroline. Round-trip transport included.", "One French-speaking instructor and one equipment set used alternately by the couple during the lesson.", "Wingfoil Preá · shared"]
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
        const selected = document.querySelector('input[name="' + place + '-wingfoil-plan"]:checked');
        if (!selected || !options[selected.value]) continue;
        const option = options[selected.value], [title, description, equipment, label] = option[lang()];
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
    document.querySelectorAll('.wingfoil-plan-picker').forEach(picker => {
      picker.addEventListener("change", update);
      picker.addEventListener("input", update);
    });
    document.querySelectorAll("[data-language]").forEach(btn => btn.addEventListener("click", update));
    window.addEventListener("pageshow", update);
    update();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start, {once:true});
  else start();
})();
