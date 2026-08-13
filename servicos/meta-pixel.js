(function (w, d) {
  var PIXEL_ID = "977786101669349";
  var PRODUCTS = {
    "/transfer-4x4/": { id: "jeri_hillux", value: 800.00 },
    "/onibus-madrugada/": { id: "jeri_madrugada", value: 200.00 },
    "/passeio-lado-leste/": { id: "jeri_leste", value: 100.00 },
    "/passeio-lado-oeste/": { id: "jeri_oeste", value: 110.00 },
    "/extremo-leste/": { id: "jeri_extremo_leste", value: 150.00 },
    "/hospedagem-jericoacoara/": { id: "jeri_hospedagem", value: 350.00 },
    "/rota-das-emocoes/": { id: "jeri_rota_das_emocoes", value: 5000.00 }
  };

  function normalizedPath(pathname) {
    var path = pathname.replace(/\/index\.html$/, "/");
    return path.endsWith("/") ? path : path + "/";
  }

  function saveFacebookClickId(url) {
    var fbclid = url.searchParams.get("fbclid");
    if (!fbclid) return;
    var fbc = "fb.1." + Date.now() + "." + fbclid;
    d.cookie = "_fbc=" + encodeURIComponent(fbc) + "; Max-Age=7776000; Path=/; SameSite=Lax; Secure";
  }

  var originalUrl = new URL(w.location.href);
  saveFacebookClickId(originalUrl);

  var path = normalizedPath(originalUrl.pathname);
  var canonicalUrl = w.location.origin + path;
  if (w.location.href !== canonicalUrl) {
    w.history.replaceState(w.history.state, "", canonicalUrl);
  }

  if (!w.fbq) {
    var n = w.fbq = function () {
      n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
    };
    if (!w._fbq) w._fbq = n;
    n.push = n;
    n.loaded = true;
    n.version = "2.0";
    n.queue = [];
    var t = d.createElement("script");
    t.async = true;
    t.src = "https://connect.facebook.net/en_US/fbevents.js";
    var first = d.getElementsByTagName("script")[0];
    first.parentNode.insertBefore(t, first);
    w.fbq("init", PIXEL_ID);
  }
  w.fbq("track", "PageView");

  var product = PRODUCTS[path];
  if (product) {
    w.fbq("track", "ViewContent", {
      content_ids: [product.id],
      content_type: "product",
      value: product.value,
      currency: "BRL"
    });
  }

  /* Call only after a real, confirmed payment. Example:
     window.jeriTrackPurchase("jeri_hillux"); */
  w.jeriTrackPurchase = function (productId) {
    var selected = Object.keys(PRODUCTS).map(function (key) {
      return PRODUCTS[key];
    }).find(function (item) {
      return item.id === productId;
    });
    if (!selected) throw new Error("Produto Jeri Rota desconhecido: " + productId);
    w.fbq("track", "Purchase", {
      content_ids: [selected.id],
      content_type: "product",
      value: selected.value,
      currency: "BRL"
    });
  };
})(window, document);
