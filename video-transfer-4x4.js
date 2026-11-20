/* Jeri Rota: vídeo de transfer 4x4 carregado somente quando disponível */
(function(){
  'use strict';
  var videoPath='/video-transfer-4x4-jeri-rota.mp4';
  function mount(){
    var anchor=document.getElementById('servicos');
    if(!anchor||document.getElementById('jr-video-feature'))return;
    fetch(videoPath,{method:'HEAD',cache:'no-store'}).then(function(response){
      if(!response.ok)return;
      if(document.getElementById('jr-video-feature'))return;
      var section=document.createElement('section');
      section.id='jr-video-feature';
      section.className='jr-video-feature';
      section.setAttribute('aria-labelledby','jr-video-title');
      section.innerHTML='<div class="jr-video-feature__inner"><div class="jr-video-feature__content"><span class="jr-video-feature__eyebrow">Experiência 4x4</span><h2 id="jr-video-title">O caminho também faz parte <em>da experiência.</em></h2><p class="jr-video-feature__desc">Conheça um pouco dos percursos de veículos 4x4 pelo litoral de Jericoacoara. Consulte as opções de transfer e organize sua viagem com atendimento personalizado.</p><div class="jr-video-feature__actions"><a class="jr-video-feature__cta" href="https://wa.me/5588982274666?text=Ol%C3%A1%21%20Quero%20consultar%20um%20transfer%204x4%20para%20Jericoacoara." target="_blank" rel="noopener noreferrer">Consultar transfer 4x4 ↗</a><span class="jr-video-feature__note">Disponibilidade sob consulta</span></div></div><div class="jr-video-feature__frame"><span class="jr-video-feature__label">Jeri Rota · Ceará</span><video playsinline muted autoplay loop preload="none" controls poster="/hero-jr.webp" aria-label="Vídeo de veículos 4x4 percorrendo as paisagens de Jericoacoara"></video><button class="jr-video-feature__sound" type="button" aria-label="Ativar o som do vídeo">Ativar som</button></div></div>';
      anchor.insertAdjacentElement('afterend',section);
      var video=section.querySelector('video');
      var sound=section.querySelector('button');
      var didLoad=false;
      function loadVideo(){
        if(didLoad)return;
        didLoad=true;
        video.src=videoPath;
        video.load();
        if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches){
          var p=video.play();if(p&&typeof p.catch==='function')p.catch(function(){});
        }
      }
      if('IntersectionObserver'in window){
        var observer=new IntersectionObserver(function(entries){
          if(entries.some(function(entry){return entry.isIntersecting})){loadVideo();observer.disconnect();}
        },{rootMargin:'360px'});
        observer.observe(section);
      }else{loadVideo()}
      sound.addEventListener('click',function(){
        loadVideo();
        video.muted=!video.muted;
        sound.textContent=video.muted?'Ativar som':'Desativar som';
        sound.setAttribute('aria-label',sound.textContent+' do vídeo');
        var p=video.play();if(p&&typeof p.catch==='function')p.catch(function(){});
      });
      video.addEventListener('error',function(){section.remove();});
    }).catch(function(){/* Sem o arquivo publicado, não altera a página. */});
  }
  if(document.readyState==='complete'){mount()}else{window.addEventListener('load',mount,{once:true})}
})();
