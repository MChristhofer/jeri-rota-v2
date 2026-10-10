/* Hospedagem solicitada: Carlore Taíba; preço a confirmar. */
(function(){"use strict";
function init(){var el=document.querySelector("[data-taiba-hotel-summary]");if(!el)return;
function refresh(){var l=document.documentElement.lang||"pt";el.textContent=/^fr/i.test(l)?"Carlore Taíba · 1 nuit":/^en/i.test(l)?"Carlore Taíba · 1 night":"Carlore Taíba · 1 noite";}
document.querySelectorAll("[data-language]").forEach(function(b){b.addEventListener("click",refresh);});refresh();}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init,{once:true});else init();
})();