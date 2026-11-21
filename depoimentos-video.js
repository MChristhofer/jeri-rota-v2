/* Depoimentos em vídeo da Jeri Rota — não altera depoimentos escritos sem os três arquivos reais. */
(function(){
  "use strict";
  var samples=[
    {url:"/depoimentos/cliente-01.mp4",title:"Depoimento 01"},
    {url:"/depoimentos/cliente-02.mp4",title:"Depoimento 02"},
    {url:"/depoimentos/cliente-03.mp4",title:"Depoimento 03"}
  ];
  var activated=false;
  function exists(src){
    return fetch(src,{method:"HEAD",cache:"no-store"}).then(function(r){
      var mime=(r.headers.get("content-type")||"").toLowerCase();
      return r.ok && (/video\\//.test(mime) || /application\\/octet-stream/.test(mime));
    }).catch(function(){return false});
  }
  function makeCard(item,index){
    var card=document.createElement("article");
    card.className="jr-video-review";
    var media=document.createElement("div");
    media.className="jr-video-review__media";
    var video=document.createElement("video");
    video.preload="metadata";
    video.controls=false;
    video.playsInline=true;
    video.setAttribute("playsinline","");
    video.setAttribute("aria-label","Reproduzir "+item.title+" da Jeri Rota");
    var source=document.createElement("source");
    source.src=item.url;
    source.type="video/mp4";
    video.appendChild(source);
    var button=document.createElement("button");
    button.type="button";
    button.className="jr-video-review__play";
    button.setAttribute("aria-label","Reproduzir "+item.title);
    button.innerHTML='<span class="jr-video-review__play-icon" aria-hidden="true">▶</span><span>Assistir ao depoimento</span>';
    media.appendChild(video);
    media.appendChild(button);
    var body=document.createElement("div");
    body.className="jr-video-review__body";
    var eyebrow=document.createElement("span");
    eyebrow.className="jr-video-review__eyebrow";
    eyebrow.textContent="Depoimento em vídeo";
    var title=document.createElement("h3");
    title.textContent=item.title;
    var description=document.createElement("p");
    description.textContent="Relato sobre a experiência com a Jeri Rota.";
    body.appendChild(eyebrow);
    body.appendChild(title);
    body.appendChild(description);
    card.appendChild(media);
    card.appendChild(body);
    button.addEventListener("click",function(){
      var others=document.querySelectorAll(".jr-video-reviews video");
      for(var i=0;i<others.length;i++)if(others[i]!==video)others[i].pause();
      video.controls=true;
      var p=video.play();
      if(p&&typeof p.then==="function")p.then(function(){button.hidden=true}).catch(function(){button.hidden=false});
      else button.hidden=true;
    });
    video.addEventListener("play",function(){
      var others=document.querySelectorAll(".jr-video-reviews video");
      for(var i=0;i<others.length;i++)if(others[i]!==video)others[i].pause();
      button.hidden=true;
    });
    video.addEventListener("ended",function(){button.hidden=false;video.controls=false;});
    return card;
  }
  function install(){
    if(activated)return;
    var grid=document.querySelector(".testimonials .testimonial-grid");
    if(!grid||grid.querySelectorAll("blockquote").length!==3)return;
    Promise.all(samples.map(function(item){return exists(item.url)})).then(function(found){
      if(activated||!found.every(Boolean))return;
      grid=document.querySelector(".testimonials .testimonial-grid");
      if(!grid||grid.querySelectorAll("blockquote").length!==3)return;
      var fragment=document.createDocumentFragment();
      for(var i=0;i<samples.length;i++)fragment.appendChild(makeCard(samples[i],i));
      grid.replaceChildren(fragment);
      grid.classList.add("jr-video-reviews");
      activated=true;
    });
  }
  if(document.readyState==="complete")install();
  else window.addEventListener("load",install,{once:true});
})();
