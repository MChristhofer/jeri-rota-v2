(function () {
  var services = window.JERI_ROTA_SERVICES;
  var oeste = services && services["passeio-lado-oeste"];
  if (!oeste) return;

  oeste.hero = "/Oeste.jpg";
  oeste.gallery = [
    ["/oeste-lagoa-aerea.jpeg", "Vista aérea da lagoa e da estrutura do passeio no lado oeste"],
    ["/oeste-barcos.jpeg", "Visitantes junto aos barcos no litoral oeste"],
    ["/oeste-duna-lagoa.jpeg", "Descida de duna até a lagoa no passeio lado oeste"]
  ];
})();
