/* Aprovação personalizada da proposta Edmond & Caroline — Jeri Rota
   Reúne escolhas em tempo real, serviços e valor final para WhatsApp. */
(function () {
  "use strict";

  var whatsapp = "5588982274666";
  var euro = function (cents) {
    return "€ " + (cents / 100).toLocaleString("de-DE", {minimumFractionDigits:2,maximumFractionDigits:2});
  };

  var labels = {
    pt: {
      missingHotel:"Selecione uma das duas hospedagens em Taíba antes de aprovar a proposta.",
      intro:"Olá, Christhofer. Analisamos a proposta de viagem privativa de Edmond Michel e Caroline (28/10 a 06/11/2026) e gostaríamos de aprová-la com as escolhas abaixo.",
      hotel:"Hospedagem escolhida em Taíba",
      wing:"Modalidades de Wingfoil escolhidas",
      ic:"Icaraizinho — 30/10",
      pr:"Preá — 03/11",
      semi:"Semiprivativa · dois equipamentos",
      shared:"Compartilhada · um equipamento alternado",
      included:"SERVIÇOS APROVADOS E VALORES",
      total:"TOTAL DA PROPOSTA PARA DUAS PESSOAS",
      gifts:"CORTESIAS DA JERI ROTA",
      giftMeal:"Refeição fria de boas-vindas no Makena, preparada e entregue pelo restaurante parceiro (escolha dos pratos por e-mail).",
      giftTax:"Taxa de Turismo Sustentável de Jericoacoara para os dois hóspedes (€ 14,84).",
      extras:"PAGAMENTOS LOCAIS NÃO INCLUÍDOS",
      extrasDesc:"Entradas e balsa: aprox. € 67,92 para o casal; atividades opcionais até € 41,12 para o casal, se escolhidas. Alimentação e bebidas dos passeios são pagas à parte.",
      taiba:"No dia 06/11, guarda de bagagens e acesso a banho/troca de roupa antes do transfer ao aeroporto.",
      close:"Por favor, confirmem os próximos passos para formalizar a reserva."
    },
    fr: {
      missingHotel:"Veuillez sélectionner l'un des deux hébergements à Taíba avant de valider la proposition.",
      intro:"Bonjour Christhofer, nous avons étudié la proposition de voyage privé d'Edmond Michel et Caroline (du 28 octobre au 6 novembre 2026) et souhaitons la valider avec les choix suivants.",
      hotel:"Hébergement choisi à Taíba",
      wing:"Formules de Wingfoil sélectionnées",
      ic:"Icaraizinho — 30/10",
      pr:"Préa — 03/11",
      semi:"Semi-privé · deux équipements",
      shared:"Partagé · un équipement utilisé à tour de rôle",
      included:"PRESTATIONS APPROUVÉES ET PRIX",
      total:"MONTANT TOTAL DE LA PROPOSITION POUR DEUX PERSONNES",
      gifts:"ATTENTIONS OFFERTES PAR JERI ROTA",
      giftMeal:"Repas froid de bienvenue au Makena, préparé et livré par le restaurant partenaire (choix des plats par e-mail).",
      giftTax:"Taxe de tourisme durable de Jericoacoara pour les deux voyageurs (14,84 €).",
      extras:"FRAIS LOCAUX NON COMPRIS",
      extrasDesc:"Entrées et bac : environ 67,92 € pour le couple ; activités optionnelles jusqu'à 41,12 € pour le couple si choisies. Repas et boissons pendant les excursions à régler séparément.",
      taiba:"Le 06/11, consigne des bagages et possibilité de prendre une douche et de se changer avant le transfert vers l'aéroport.",
      close:"Merci de nous indiquer les prochaines étapes pour finaliser la réservation."
    },
    en: {
      missingHotel:"Please select one of the two Taíba accommodations before approving the proposal.",
      intro:"Hello Christhofer, we have reviewed the private travel proposal for Edmond Michel and Caroline (October 28 to November 6, 2026) and would like to approve it with the following choices.",
      hotel:"Chosen accommodation in Taíba",
      wing:"Selected Wingfoil options",
      ic:"Icaraizinho — October 30",
      pr:"Préa — November 3",
      semi:"Semi-private · two equipment sets",
      shared:"Shared · one alternating equipment set",
      included:"APPROVED SERVICES AND PRICES",
      total:"TOTAL PROPOSAL FOR TWO PEOPLE",
      gifts:"COMPLIMENTARY SERVICES FROM JERI ROTA",
      giftMeal:"Cold welcome meal at Makena, prepared and delivered by the partner restaurant (meal selection by email).",
      giftTax:"Jericoacoara sustainable tourism tax for both guests (€14.84).",
      extras:"LOCAL COSTS NOT INCLUDED",
      extrasDesc:"Admissions and ferry: approximately €67.92 for the couple; optional activities up to €41.12 if selected. Meals and drinks on excursions are extra.",
      taiba:"On November 6, luggage storage and shower/changing facilities before the airport transfer.",
      close:"Please advise on the next steps to finalize the booking."
    }
  };

  function init() {
    var btn = document.querySelector("[data-approve]");
    if (!btn) return;

    btn.addEventListener("click", function (event) {
      var lang = /^fr/i.test(document.documentElement.lang) ? "fr" : /^en/i.test(document.documentElement.lang) ? "en" : "pt";
      var l = labels[lang];
      var hotel = document.querySelector('input[name="taiba-hotel"]:checked');
      if (!hotel) {
        event.preventDefault();
        window.alert(l.missingHotel);
        var hotels = document.querySelector(".taiba-lodging");
        if (hotels) hotels.scrollIntoView({behavior:"smooth",block:"center"});
        return;
      }

      var hotelName = hotel.value === "catavento" ? "Pousada Catavento Taíba" : "Arco Mundial Taíba";
      var ic = document.querySelector('input[name="icarai-wingfoil-plan"]:checked');
      var pr = document.querySelector('input[name="prea-wingfoil-plan"]:checked');
      var modality = function(input){return input && input.value === "shared" ? l.shared : l.semi;};

      var rows = Array.from(document.querySelectorAll(".service-values .service-line[data-service-cents]"));
      var total = 0;
      var services = rows.map(function (row) {
        var service = row.getAttribute("data-variable-service");
        var cents = Number(row.getAttribute("data-service-cents"));
        if (service === "icarai" && ic) cents = Number(ic.getAttribute("data-price-cents"));
        if (service === "prea" && pr) cents = Number(pr.getAttribute("data-price-cents"));
        if (!Number.isSafeInteger(cents) || cents < 0) return null;
        total += cents;
        var date = (row.querySelector(".service-date") || {}).textContent || "";
        var desc = (row.querySelector(".service-description") || {}).textContent || "";
        if (service === "icarai") desc = "Wingfoil Icaraizinho · " + modality(ic);
        if (service === "prea") desc = "Wingfoil Préa · " + modality(pr);
        if (row.querySelector("[data-taiba-hotel-summary]")) desc = hotelName + (lang === "fr" ? " · 1 nuit" : lang === "en" ? " · 1 night" : " · 1 noite");
        return "- " + date.trim() + " | " + desc.trim() + " | " + euro(cents);
      }).filter(Boolean);

      var msg = [
        l.intro,
        "",
        l.hotel + ": " + hotelName + " (05–06/11)",
        "",
        l.wing + ":",
        "- " + l.ic + ": " + modality(ic),
        "- " + l.pr + ": " + modality(pr),
        "",
        l.included + ":",
        services.join("\n"),
        "",
        l.total + ": " + euro(total),
        "",
        l.gifts + ":",
        "- " + l.giftMeal,
        "- " + l.giftTax,
        "- " + l.taiba,
        "",
        l.extras + ":",
        l.extrasDesc,
        "",
        l.close
      ].join("\n");

      btn.href = "https://wa.me/" + whatsapp + "?text=" + encodeURIComponent(msg);
      btn.target = "_blank";
      btn.rel = "noopener noreferrer";
    });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init, {once:true});
  else init();
})();
