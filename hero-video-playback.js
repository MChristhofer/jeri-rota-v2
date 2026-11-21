/* Jeri Rota - playback resiliente do vídeo do cabeçalho */
(function () {
  "use strict";
  var MOBILE = "/video-transfer-4x4-jeri-rota.mp4?v=20261120";
  var DESKTOP = "/video-jeri-rota-cabecalho-desktop.mp4?v=2";
  var MOBILE_QUERY = "(max-width: 760px)";
  var motionDisabled = !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);

  function currentSource() {
    return window.matchMedia && window.matchMedia(MOBILE_QUERY).matches ? MOBILE : DESKTOP;
  }

  function initialize() {
    var hero = document.querySelector("#inicio");
    var video = hero && hero.querySelector("video.hero-media");
    if (!video || video.dataset.jrPlaybackController === "ready") return;
    video.dataset.jrPlaybackController = "ready";
    video.muted = true;
    video.defaultMuted = true;
    video.loop = true;
    video.playsInline = true;
    video.setAttribute("playsinline", "");
    video.setAttribute("webkit-playsinline", "");
    video.setAttribute("muted", "");
    video.setAttribute("preload", "auto");
    video.poster = "/jeri-rota-cabecalho-poster.webp";

    var button = document.createElement("button");
    button.type = "button";
    button.className = "jr-hero-video-toggle";
    button.setAttribute("aria-label", "Reproduzir vídeo do transfer 4x4");
    button.textContent = "▶ Reproduzir vídeo";
    hero.appendChild(button);

    var link = document.createElement("a");
    link.className = "jr-hero-video-link";
    link.textContent = "Abrir vídeo";
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.hidden = true;
    hero.appendChild(link);

    function markPlaying() {
      button.textContent = "Ⅱ Pausar vídeo";
      button.setAttribute("aria-label", "Pausar vídeo do transfer 4x4");
      link.hidden = true;
    }
    function markPaused() {
      button.textContent = "▶ Reproduzir vídeo";
      button.setAttribute("aria-label", "Reproduzir vídeo do transfer 4x4");
    }
    function chooseSource() {
      var source = currentSource();
      link.href = source;
      if (video.getAttribute("src") !== source) {
        video.src = source;
        video.load();
      }
      return source;
    }
    function play() {
      chooseSource();
      video.muted = true;
      video.defaultMuted = true;
      var promise;
      try { promise = video.play(); } catch (e) { markPaused(); return; }
      if (promise && typeof promise.catch === "function") {
        promise.catch(function () { markPaused(); });
      }
    }

    video.addEventListener("playing", markPlaying);
    video.addEventListener("pause", markPaused);
    video.addEventListener("error", function () {
      markPaused();
      link.href = currentSource();
      link.hidden = false;
    });
    button.addEventListener("click", function () {
      if (video.paused || video.ended) play();
      else video.pause();
    });

    chooseSource();
    if (!motionDisabled) play();
    else markPaused();

    var resizeDebounce;
    window.addEventListener("resize", function () {
      window.clearTimeout(resizeDebounce);
      resizeDebounce = window.setTimeout(function () {
        var source = currentSource();
        if (video.getAttribute("src") !== source) {
          chooseSource();
          if (!motionDisabled) play();
        }
      }, 200);
    }, { passive: true });
  }

  function startAfterLoad() {
    initialize();
    if (document.body) {
      var observer = new MutationObserver(function () { initialize(); });
      observer.observe(document.body, { childList: true, subtree: true });
    }
  }
  if (document.readyState === "complete") startAfterLoad();
  else window.addEventListener("load", startAfterLoad, { once: true });
})();
