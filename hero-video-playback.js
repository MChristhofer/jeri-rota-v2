/* Jeri Rota | reprodução automática e silenciosa no cabeçalho, sem controles */
(function () {
  "use strict";

  var DESKTOP = "/jeri-rota-video-fundo-novo.mp4";
  var MOBILE = "/jeri-rota-video-fundo-novo.mp4";
  var media = window.matchMedia ? window.matchMedia("(max-width: 760px)") : null;
  var activeVideo = null;

  function chosenSource() {
    return media && media.matches ? MOBILE : DESKTOP;
  }

  function attemptPlay(video) {
    if (!video || document.visibilityState === "hidden") return;
    video.muted = true;
    video.defaultMuted = true;
    try {
      var promise = video.play();
      if (promise && typeof promise.catch === "function") {
        promise.catch(function () { /* navegador pode bloquear autoplay */ });
      }
    } catch (error) {
      /* Se bloqueado, permanece a capa do próprio vídeo */
    }
  }

  function initialize() {
    var video = document.querySelector("#inicio video.hero-media");
    if (!video) return;
    if (video !== activeVideo) {
      activeVideo = video;
      video.autoplay = true;
      video.loop = true;
      video.controls = false;
      video.removeAttribute("controls");
      video.muted = true;
      video.defaultMuted = true;
      video.playsInline = true;
      video.setAttribute("autoplay", "");
      video.setAttribute("muted", "");
      video.setAttribute("loop", "");
      video.setAttribute("playsinline", "");
      video.setAttribute("webkit-playsinline", "");
      video.setAttribute("preload", "auto");
      video.addEventListener("canplay", function () { attemptPlay(video); });
      video.addEventListener("loadeddata", function () { attemptPlay(video); });
    }
    var source = chosenSource();
    if (video.getAttribute("src") !== source) {
      video.src = source;
      video.load();
    }
    attemptPlay(video);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialize, { once: true });
  } else {
    initialize();
  }
  window.addEventListener("load", initialize);
  window.addEventListener("pageshow", initialize);
  document.addEventListener("visibilitychange", function () {
    if (!document.hidden) initialize();
  });
  if (media) {
    if (media.addEventListener) media.addEventListener("change", initialize);
    else if (media.addListener) media.addListener(initialize);
  }
  function observePage() {
    if (!document.body || !window.MutationObserver) return;
    var observer = new MutationObserver(function () {
      var currentVideo = document.querySelector("#inicio video.hero-media");
      if (currentVideo && currentVideo !== activeVideo) initialize();
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }
  if (document.body) observePage();
  else document.addEventListener("DOMContentLoaded", observePage, { once: true });
})();
