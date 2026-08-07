(function (w, d) {
  if (w.fbq) return;
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
  w.fbq("init", "977786101669349");
  w.fbq("track", "PageView");
})(window, document);
