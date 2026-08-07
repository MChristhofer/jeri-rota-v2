(function () {
  var page = document.querySelector('[data-service-page="transfer-4x4"]');
  if (!page) return;
  document.body.classList.add("reservation-enabled");
  var heroContent = document.querySelector(".hero-content");
  var existingCta = heroContent.querySelector(".button");
  var trigger = document.createElement("button");
  trigger.type = "button";
  trigger.className = "button reservation-trigger";
  trigger.dataset.service = "transfer-4x4";
  trigger.dataset.action = "reservation";
  trigger.textContent = "Reservar agora";
  existingCta.insertAdjacentElement("afterend", trigger);

  var mobileTrigger = document.createElement("button");
  mobileTrigger.type = "button";
  mobileTrigger.className = "mobile-reservation";
  mobileTrigger.dataset.service = "transfer-4x4";
  mobileTrigger.dataset.action = "reservation";
  mobileTrigger.textContent = "Reservar Transfer";
  document.body.appendChild(mobileTrigger);

  var modal = document.createElement("div");
  modal.className = "reservation-modal";
  modal.hidden = true;
  modal.innerHTML = `
    <div class="reservation-backdrop" data-close-reservation></div>
    <section class="reservation-dialog" role="dialog" aria-modal="true" aria-labelledby="reservation-title">
      <header class="reservation-head"><div><span class="eyebrow dark">Solicitação online</span><h2 id="reservation-title">Solicitar reserva</h2><p>Preencha os dados para consultar disponibilidade e valor.</p></div><button class="reservation-close" type="button" data-close-reservation aria-label="Fechar formulário">×</button></header>
      <div class="reservation-body">
        <div class="reservation-progress" aria-label="Etapas da solicitação"><span class="is-active" data-step-indicator="form">1</span> Dados <i></i><span data-step-indicator="summary">2</span> Revisão</div>
        <form id="reservation-form" novalidate>
          <div class="reservation-grid">
            ${field("name", "Nome completo", "text", true, "Seu nome e sobrenome", "name")}
            ${field("phone", "WhatsApp", "tel", true, "(00) 00000-0000", "tel")}
            ${field("date", "Data do transfer", "date", true, "", "")}
            ${field("passengers", "Quantidade de passageiros", "number", true, "", "numeric", 'min="1" step="1"')}
            ${field("origin", "Origem", "text", true, "Digite ou escolha um local", "", 'list="reservation-locations"')}
            ${field("destination", "Destino", "text", true, "Digite ou escolha um local", "", 'list="reservation-locations"')}
            ${field("time", "Horário desejado", "time", false, "", "")}
            ${field("flight", "Número do voo", "text", false, "Ex.: G3 1234", "")}
            <fieldset class="reservation-field full" style="border:0;padding:0;margin:0"><legend class="reservation-label">Tipo de transfer *</legend><div class="reservation-types"><label><input type="radio" name="transferType" value="Privativo"> Privativo</label><label><input type="radio" name="transferType" value="Compartilhado"> Compartilhado</label></div><span class="field-error" id="error-transferType" aria-live="polite"></span></fieldset>
            <div class="reservation-field full"><label for="reservation-notes">Observações</label><textarea id="reservation-notes" name="notes" placeholder="Bagagens, necessidades específicas ou outras informações"></textarea><span class="field-error" id="error-notes"></span></div>
          </div>
          <datalist id="reservation-locations"><option value="Aeroporto de Fortaleza"><option value="Fortaleza"><option value="Jericoacoara"><option value="Jijoca"><option value="Aeroporto de Jericoacoara"><option value="Preá"><option value="Cumbuco"><option value="Barra Grande"><option value="Parnaíba"><option value="Barreirinhas"><option value="São Luís"><option value="Outro"></datalist>
          <p class="reservation-note">Esta é uma solicitação. A reserva ficará aguardando confirmação manual da equipe Jeri Rota.</p>
          <div class="reservation-actions"><button class="reservation-button" type="submit" data-service="transfer-4x4" data-action="reservation-review">Revisar solicitação</button></div>
        </form>
        <section class="reservation-summary" hidden aria-labelledby="summary-title"><div class="reservation-summary-card"><span class="eyebrow dark">Confira antes de enviar</span><h3 id="summary-title" tabindex="-1">Confirme os dados da sua reserva</h3><p class="reservation-summary-route" data-summary-route></p><dl class="reservation-summary-list" data-summary-list></dl></div><p class="reservation-status">Solicitação aguardando confirmação da equipe.</p><div class="reservation-actions"><button class="reservation-button secondary" type="button" data-edit-reservation>Voltar e editar</button><a class="reservation-button whatsapp" href="#" target="_blank" rel="noopener noreferrer" data-service="transfer-4x4" data-action="whatsapp-reservation">Enviar pelo WhatsApp</a></div></section>
      </div>
    </section>`;
  document.body.appendChild(modal);

  var form = modal.querySelector("#reservation-form");
  var summary = modal.querySelector(".reservation-summary");
  var lastFocus = null;
  var today = new Date();
  var localToday = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
  form.elements.date.min = localToday;

  function field(name, label, type, required, placeholder, inputmode, extra) {
    return `<div class="reservation-field"><label for="reservation-${name}">${label}${required ? " *" : ""}</label><input id="reservation-${name}" name="${name}" type="${type}" ${required ? "required" : ""} ${placeholder ? `placeholder="${placeholder}"` : ""} ${inputmode ? `inputmode="${inputmode}"` : ""} ${extra || ""} aria-describedby="error-${name}"><span class="field-error" id="error-${name}" aria-live="polite"></span></div>`;
  }
  function track(event, parameters) { if (window.fbq) window.fbq("trackCustom", event, parameters || { service: "transfer-4x4" }); }
  function openModal() {
    lastFocus = document.activeElement;
    modal.hidden = false;
    document.body.classList.add("reservation-open");
    modal.querySelector("#reservation-name").focus();
    track("ReservationStart");
  }
  function closeModal() {
    modal.hidden = true;
    document.body.classList.remove("reservation-open");
    if (lastFocus) lastFocus.focus();
  }
  function setError(name, message) {
    var input = form.elements[name];
    var error = modal.querySelector("#error-" + name);
    if (input && input.length && input[0].type === "radio") input = input[0];
    if (input) input.setAttribute("aria-invalid", message ? "true" : "false");
    if (error) error.textContent = message;
  }
  function validate() {
    var required = { name: "Informe seu nome completo.", phone: "Informe seu WhatsApp.", date: "Escolha a data do transfer.", passengers: "Informe a quantidade de passageiros.", origin: "Informe a origem.", destination: "Informe o destino." };
    var firstInvalid = null;
    Object.keys(required).forEach(function (name) {
      var value = form.elements[name].value.trim();
      var message = value ? "" : required[name];
      if (name === "date" && value && value < localToday) message = "A data não pode ser anterior à data atual.";
      if (name === "passengers" && value && Number(value) < 1) message = "A quantidade deve ser de pelo menos 1 passageiro.";
      setError(name, message);
      if (message && !firstInvalid) firstInvalid = form.elements[name];
    });
    var type = form.elements.transferType.value;
    setError("transferType", type ? "" : "Escolha Privativo ou Compartilhado.");
    if (!type && !firstInvalid) firstInvalid = form.elements.transferType[0];
    if (firstInvalid) { firstInvalid.focus(); return false; }
    return true;
  }
  function values() {
    var data = Object.fromEntries(new FormData(form).entries());
    Object.keys(data).forEach(function (key) { if (typeof data[key] === "string") data[key] = data[key].trim(); });
    return data;
  }
  function escapeHtml(value) { return String(value).replace(/[&<>"]/g, function (character) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[character]; }); }
  function formatDate(value) { var parts = value.split("-"); return parts[2] + "/" + parts[1] + "/" + parts[0]; }
  function showSummary() {
    var data = values();
    modal.querySelector("[data-summary-route]").textContent = data.origin + " → " + data.destination;
    var items = [["Data", formatDate(data.date)], ["Passageiros", data.passengers], ["Tipo", data.transferType], ["Horário", data.time], ["Voo", data.flight]];
    modal.querySelector("[data-summary-list]").innerHTML = items.filter(function (item) { return item[1]; }).map(function (item) { return `<div><dt>${escapeHtml(item[0])}</dt><dd>${escapeHtml(item[1])}</dd></div>`; }).join("");
    modal.querySelector('[data-action="whatsapp-reservation"]').href = "https://wa.me/" + window.JERI_ROTA_CONFIG.whatsappNumber + "?text=" + encodeURIComponent(whatsappMessage());
    form.hidden = true; summary.hidden = false;
    modal.querySelector('[data-step-indicator="form"]').classList.remove("is-active");
    modal.querySelector('[data-step-indicator="summary"]').classList.add("is-active");
    modal.querySelector("#summary-title").focus();
    track("ReservationReview");
  }
  function editReservation() {
    summary.hidden = true; form.hidden = false;
    modal.querySelector('[data-step-indicator="summary"]').classList.remove("is-active");
    modal.querySelector('[data-step-indicator="form"]').classList.add("is-active");
    form.elements.name.focus();
  }
  function whatsappMessage() {
    var data = values();
    var lines = ["Olá! Fiz uma solicitação de reserva pelo site da Jeri Rota.", "", "🚙 Serviço: Transfer 4x4", "", "👤 Nome: " + data.name, "📞 WhatsApp: " + data.phone, "📅 Data: " + formatDate(data.date), "👥 Passageiros: " + data.passengers, "", "📍 Origem: " + data.origin, "🏁 Destino: " + data.destination];
    if (data.time) lines.push("", "🕐 Horário desejado: " + data.time);
    lines.push("", "🚘 Tipo de transfer: " + data.transferType);
    if (data.flight) lines.push("", "✈️ Número do voo: " + data.flight);
    if (data.notes) lines.push("", "📝 Observações:", data.notes);
    lines.push("", "Gostaria de confirmar disponibilidade e valor.");
    var params = new URLSearchParams(location.search);
    var utm = ["utm_source", "utm_campaign", "utm_content"].filter(function (key) { return params.get(key); }).map(function (key) { return key + "=" + params.get(key); });
    if (utm.length) lines.push("", "Referência: " + utm.join(" | "));
    return lines.join("\n");
  }

  trigger.addEventListener("click", openModal); mobileTrigger.addEventListener("click", openModal);
  modal.querySelectorAll("[data-close-reservation]").forEach(function (button) { button.addEventListener("click", closeModal); });
  modal.querySelector("[data-edit-reservation]").addEventListener("click", editReservation);
  form.addEventListener("input", function (event) { if (event.target.name) setError(event.target.name, ""); });
  form.addEventListener("submit", function (event) { event.preventDefault(); if (validate()) showSummary(); });
  modal.querySelector('[data-action="whatsapp-reservation"]').addEventListener("click", function (event) {
    if (!validate()) { event.preventDefault(); editReservation(); return; }
    track("WhatsAppReservation", { service: "transfer-4x4" });
  });
  document.addEventListener("keydown", function (event) {
    if (modal.hidden) return;
    if (event.key === "Escape") closeModal();
    if (event.key === "Tab") {
      var focusable = Array.from(modal.querySelectorAll('button:not([hidden]),input:not([hidden]),textarea:not([hidden])')).filter(function (el) { return el.offsetParent !== null; });
      var first = focusable[0], last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }
  });
})();
