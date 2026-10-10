/* Aprovação concisa da proposta Edmond & Caroline — Jeri Rota.
   A mensagem envia somente hospedagem, modalidades Wingfoil e total atualizado. */
(function () {
  "use strict";

  var whatsapp = "5588982274666";
  var euro = function (cents) {
    return "€ " + (cents / 100).toLocaleString("de-DE", {
      minimumFractionDigits: 2, maximumFractionDigits: 2
    });
  };

  var labels = {
    pt: {
      missingHotel: "Selecione a hospedagem em Taíba antes de aprovar a proposta.",
      intro: "Olá, Christhofer! Confirmamos as escolhas da proposta de Edmond e Caroline (28/10 a 06/11/2026) com as seguintes escolhas:",
      hotel: "Hospedagem em Taíba (05–06/11)",
      wing: "Wingfoil",
      ic: "Icaraizinho · 30/10",
      pr: "Preá · 03/11",
      semi: "Semiprivativa (dois equipamentos)",
      shared: "Compartilhada (um equipamento alternado)",
      total: "Valor total previsto para o casal",
      close: "A categoria Apartamento da Vila Kalango substitui o bangalô. Aguardamos a reconfirmação da disponibilidade e enviaremos por e-mail as condições de pagamento."
    },
    fr: {
      missingHotel: "Veuillez sélectionner votre hébergement à Taíba avant de valider la proposition.",
      intro: "Bonjour Christhofer ! Nous confirmons les choix de la proposition d'Edmond et Caroline (du 28/10 au 06/11/2026) avec les choix suivants :",
      hotel: "Hébergement à Taíba (05–06/11)",
      wing: "Wingfoil",
      ic: "Icaraizinho · 30/10",
      pr: "Préa · 03/11",
      semi: "Semi-privé (deux équipements)",
      shared: "Partagé (un équipement utilisé à tour de rôle)",
      total: "Montant total prévu pour deux personnes",
      close: "L’Appartement de Vila Kalango remplace le bungalow. Sa disponibilité sera reconfirmée avant l’envoi par e-mail des modalités de paiement."
    },
    en: {
      missingHotel: "Please select your Taíba accommodation before approving the proposal.",
      intro: "Hello Christhofer! We confirm the selections for Edmond and Caroline's proposal (October 28 to November 6, 2026) with the following choices:",
      hotel: "Taíba accommodation (November 5–6)",
      wing: "Wingfoil",
      ic: "Icaraizinho · October 30",
      pr: "Préa · November 3",
      semi: "Semi-private (two equipment sets)",
      shared: "Shared (one alternating equipment set)",
      total: "Estimated total for two people",
      close: "The Vila Kalango Apartment replaces the bungalow. Availability will be reconfirmed before payment details are emailed."
    }
  };

  function init() {
    var btn = document.querySelector("[data-approve]");
    if (!btn) return;

    btn.addEventListener("click", function (event) {
      var lang = /^fr/i.test(document.documentElement.lang) ? "fr" :
        /^en/i.test(document.documentElement.lang) ? "en" : "pt";
      var l = labels[lang];
      var hotelName = "Carlore Taíba";
      var ic = document.querySelector('input[name="icarai-wingfoil-plan"]:checked');
      var pr = document.querySelector('input[name="prea-wingfoil-plan"]:checked');
      var modality = function (input) {
        return input && input.value === "shared" ? l.shared : l.semi;
      };

      var total = 0;
      document.querySelectorAll(".service-values .service-line[data-service-cents]").forEach(function (row) {
        var service = row.getAttribute("data-variable-service");
        var cents = Number(row.getAttribute("data-service-cents"));
        if (Number.isSafeInteger(cents) && cents >= 0) total += cents;
      });

      var msg = [
        l.intro,
        "",
        l.hotel + ": " + hotelName,
        "",
        l.wing + ":",
        "• " + l.ic + ": " + modality(ic),
        "• " + l.pr + ": " + modality(pr),
        "",
        l.total + ": " + euro(total) + (lang === "fr" ? " + Carlore Taíba (tarif en attente)" : lang === "en" ? " + Carlore Taíba (rate pending)" : " + Carlore Taíba (valor pendente)"),
        "",
        l.close
      ].join("\n");

      btn.href = "https://wa.me/" + whatsapp + "?text=" + encodeURIComponent(msg);
      btn.target = "_blank";
      btn.rel = "noopener noreferrer";
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();
