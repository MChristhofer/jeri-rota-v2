(function () {
  var services = window.JERI_ROTA_SERVICES;
  var oeste = services && services["passeio-lado-oeste"];
  if (!oeste) return;

  oeste.hero = "/Oeste.jpg";
  oeste.gallery = [
    ["/img/oeste-previa-1.jpg", "Descida pelas dunas em direção à lagoa"],
    ["/img/oeste-previa-2.jpg", "Vista aérea da lagoa e estrutura de apoio"],
    ["/img/oeste-previa-3.jpg", "Parada do passeio com barcos no litoral oeste"]
  ];
})();
