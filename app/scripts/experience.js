/* Original liquid interactions for the archive; no external component runtime. */
export function initExperience() {
  const menu=document.querySelector('.smart-menu'), nav=menu.querySelector('nav'), glide=nav.querySelector('.nav-glide');
  const links=[...nav.querySelectorAll('a')];
  function glideTo(a){glide.style.width=a.offsetWidth+'px';glide.style.height=a.offsetHeight+'px';glide.style.transform=`translate(${a.offsetLeft}px,${a.offsetTop}px)`;nav.querySelectorAll('a').forEach(link=>link.classList.toggle('glide-active',link===a));}
  function markCurrent(){const active=links.find(a=>a.hash===(location.hash||'#home'))||links[0];links.forEach(a=>{if(a===active)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current');});glideTo(active);}
  links.forEach(a=>{a.addEventListener('pointerenter',()=>glideTo(a));a.addEventListener('focus',()=>glideTo(a));});
  nav.addEventListener('pointerleave',markCurrent);nav.addEventListener('focusout',()=>requestAnimationFrame(markCurrent));
  window.addEventListener('hashchange',markCurrent);new ResizeObserver(markCurrent).observe(nav);document.fonts.ready.then(markCurrent);markCurrent();
  const archiveNav=document.querySelector('.archive-tabs');
  const archiveGlide=document.createElement('span');archiveGlide.className='archive-glide';archiveGlide.setAttribute('aria-hidden','true');archiveNav.prepend(archiveGlide);
  function moveArchive(a){archiveGlide.style.width=a.offsetWidth+'px';archiveGlide.style.height='2px';archiveGlide.style.transform=`translate(${a.offsetLeft}px,${a.offsetTop+a.offsetHeight-2}px)`;}
  function resetArchive(){moveArchive(archiveNav.querySelector('a.active')||archiveNav.querySelector('a'));}
  archiveNav.querySelectorAll('a').forEach((a,i)=>{a.dataset.index=String(i+1).padStart(2,'0');});
  archiveNav.addEventListener('pointerleave',resetArchive);archiveNav.addEventListener('focusout',()=>requestAnimationFrame(resetArchive));
  addEventListener('archive-rendered',resetArchive);new ResizeObserver(resetArchive).observe(archiveNav);document.fonts.ready.then(resetArchive);
  const archive=document.querySelector('#archive');
  function scenePosition(){const edge=archive.getBoundingClientRect().top;const hidden=edge<=menu.offsetTop+menu.offsetHeight+12;menu.classList.toggle('is-hidden',hidden);menu.inert=hidden;menu.setAttribute('aria-hidden',String(hidden));document.documentElement.style.setProperty('--water-edge',Math.max(0,Math.min(innerHeight,edge))+'px');}
  addEventListener('scroll',scenePosition,{passive:true});addEventListener('resize',scenePosition);scenePosition();
  const arrowMarkup='<span class="cta-arrow" aria-hidden="true"><span>↗</span><span>↗</span></span>';
  const blurObserver=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('text-revealed');blurObserver.unobserve(e.target);}}),{threshold:.15});
  const hoverCard=document.createElement('div');hoverCard.className='service-hover-card';hoverCard.setAttribute('aria-hidden','true');hoverCard.innerHTML='<img alt="">';document.body.append(hoverCard);
  const hidePreview=()=>hoverCard.classList.remove('is-shown');
  addEventListener('scroll',hidePreview,{passive:true});addEventListener('archive-rendered',hidePreview);
  function enhanceRecords(){
    document.querySelectorAll('.record').forEach(row=>{if(row.dataset.hoverReady)return;row.dataset.hoverReady='true';const image=row.querySelector('.record-preview img'),title=row.querySelector('h3');
    if(title){const text=title.textContent;title.textContent='';const roll=document.createElement('span');roll.className='service-title-roll';const first=document.createElement('span');first.textContent=text;const second=first.cloneNode(true);second.setAttribute('aria-hidden','true');roll.append(first,second);title.append(roll);}
    if(!image)return;
    function show(e){if(!matchMedia('(hover:hover) and (pointer:fine)').matches||e.target.closest('a')){hidePreview();return;}const pic=hoverCard.querySelector('img');if(pic.getAttribute('src')!==image.getAttribute('src')){hoverCard.classList.remove('is-shown');pic.src=image.getAttribute('src');}const width=Math.min(300,innerWidth*.3),height=width*9/16;hoverCard.style.width=width+'px';let left=e.clientX+28;if(left+width>innerWidth-16)left=e.clientX-width-28;hoverCard.style.left=Math.max(16,left)+'px';hoverCard.style.top=Math.max(12,Math.min(innerHeight-height-12,e.clientY-height*.6))+'px';hoverCard.classList.add('is-shown');}
    row.addEventListener('pointermove',show);row.addEventListener('pointerleave',hidePreview);
    });
  }
  function enhanceContent(){
    enhanceRecords();
    document.querySelectorAll('.source,.hero-film-controls a,.plan-note,.social-directory a,footer>a:last-child,.language-switch button,.folder-close').forEach(a=>{if(a.querySelector('.cta-label'))return;a.classList.add('arrow-cta');const label=a.textContent.replace(/Return of\s*Happiness/,'').replace(/[↗↑]\s*$/,'').trim();a.textContent='';const text=document.createElement('span');text.className='cta-label';text.textContent=label;a.append(text);a.insertAdjacentHTML('beforeend',arrowMarkup);});
    document.querySelectorAll('.year-action').forEach(a=>{if(a.querySelector('.cta-label'))return;a.classList.add('arrow-cta');a.innerHTML='<span class="cta-label"><span class="when-open">收合</span><span class="when-closed">展開</span></span>'+arrowMarkup;});
    document.querySelectorAll('.hero-fan-note,.gifts-intro h2,.gifts-intro p,.section-heading h2,.serenade-intro h2,.serenade-intro p,.project-intro h2,.project-intro p,footer .brand,footer p,footer>a:last-child .cta-label,.folder-page h2,.folder-page p').forEach(el=>{if(el.classList.contains('blur-text'))return;el.classList.add('blur-text');let i=0;const walker=document.createTreeWalker(el,NodeFilter.SHOW_TEXT);const nodes=[];while(walker.nextNode())nodes.push(walker.currentNode);nodes.forEach(node=>{const frag=document.createDocumentFragment();const chunks=node.textContent.match(/[A-Za-z0-9’.,·]+|[^A-Za-z0-9’.,·]/gu)||[];chunks.forEach(word=>{if(/^\s+$/.test(word)){frag.append(document.createTextNode(word));return;}const span=document.createElement('span');span.className='blur-word';span.textContent=word;span.style.setProperty('--reveal-delay',Math.min(i++*.025,.8)+'s');frag.append(span);});node.replaceWith(frag);});blurObserver.observe(el);});
  }
  window.addEventListener('archive-rendered',enhanceContent);enhanceContent();
  const heading=document.querySelector('.hero-split-title');
  heading.setAttribute('aria-label','Until the Lilies Bloom.');
  heading.querySelectorAll(':scope > span,:scope > em').forEach((part,index)=>{
    const text=part.textContent;part.textContent='';part.setAttribute('aria-hidden','true');
    Array.from(text).forEach((letter,i)=>{const char=document.createElement('span');char.className='fog-char';char.textContent=letter===' '?'\u00a0':letter;char.dataset.letter=char.textContent;char.style.setProperty('--delay',`${index*.25+i*.065}s`);part.append(char);});
  });
  new IntersectionObserver(entries=>{entries.forEach(e=>heading.classList.toggle('fog-visible',e.isIntersecting));},{threshold:.4}).observe(heading);
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const fine = matchMedia('(hover: hover) and (pointer: fine)');
  const drop = document.querySelector('#waterdrop-cursor');
  const photoDialog = document.querySelector('#photo-viewer');
  new MutationObserver(()=>{const opened=document.querySelector('dialog[open]');(opened||document.body).append(drop);}).observe(document.querySelector('#content'),{subtree:true,attributes:true,attributeFilter:['open']});
  new MutationObserver(() => (photoDialog.open ? photoDialog : document.body).append(drop)).observe(photoDialog, {attributes:true,attributeFilter:['open']});
  const hero = document.querySelector('.hero');
  const canvas = document.querySelector('#hero-water');
  const backdrop = document.querySelector('.video-backdrop');
  const mapNode = document.querySelector('#water-displacement');
  const ctx = canvas.getContext('2d');
  const map = document.createElement('canvas');
  const mapCtx = map.getContext('2d');
  if (!ctx || !mapCtx) return;
  let w = 0, h = 0, current, previous, mapPixels, lightPixels, bounds;
  let raf = 0, last = 0, lastInput = 0, down = false, active = false, heroVisible = true;
  let tx = 0, ty = 0, x = 0, y = 0, shown = false, hover = false, lastPoint = null;
  const canAnimate = () => !reduced.matches && !document.hidden;
  function resize() {
    bounds = {width:innerWidth,height:innerHeight};
    w = 220; h = Math.max(100, Math.round(w * bounds.height / bounds.width));
    map.width = canvas.width = w; map.height = canvas.height = h;
    current = new Float32Array(w*h); previous = new Float32Array(w*h);
    mapPixels = mapCtx.createImageData(w,h); lightPixels = ctx.createImageData(w,h);
    active = false; backdrop.classList.remove('water-active');
  }
  resize();
  window.addEventListener('resize',resize);
  addEventListener('scroll',()=>{heroVisible=archive.getBoundingClientRect().top>0;if(!heroVisible)resetWater();},{passive:true});
  function wake() { if (!raf && canAnimate()) raf = requestAnimationFrame(frame); }
  function resetWater() {
    active = down = false; lastPoint = null;
    current.fill(0); previous.fill(0); ctx.clearRect(0,0,w,h);
    backdrop.classList.remove('water-active');
  }
  function splash(clientX,clientY,strength) {
    const b = {left:0,top:0,width:innerWidth,height:innerHeight};
    if(clientY>=archive.getBoundingClientRect().top)return;
    const px=(clientX-b.left)/b.width*w, py=(clientY-b.top)/b.height*h;
    if (px<1 || px>w-2 || py<1 || py>h-2) return;
    const radius = 4.5;
    for(let yy=Math.max(1,Math.floor(py-radius));yy<Math.min(h-1,py+radius);yy++) {
      for(let xx=Math.max(1,Math.floor(px-radius));xx<Math.min(w-1,px+radius);xx++) {
        const d=Math.hypot(xx-px,yy-py)/radius;
        if(d<1) current[yy*w+xx]+=Math.cos(d*Math.PI/2)*strength;
      }
    }
    active=true;lastInput=performance.now();backdrop.classList.add('water-active');wake();
  }
  document.addEventListener('pointerdown',e=>{
    if(!canAnimate() || e.target.closest('a,button') || (e.pointerType==='mouse'&&e.button!==0)) return;
    down=true;lastPoint={x:e.clientX,y:e.clientY};splash(e.clientX,e.clientY,1.6);
  });
  document.addEventListener('pointermove',e=>{
    if(!canAnimate() || e.clientY>=archive.getBoundingClientRect().top || (e.pointerType==='touch' && !down)){lastPoint=null;return;}
    const old=lastPoint||{x:e.clientX,y:e.clientY};
    const count=Math.min(6,Math.max(1,Math.ceil(Math.hypot(e.clientX-old.x,e.clientY-old.y)/16)));
    for(let i=1;i<=count;i++) splash(old.x+(e.clientX-old.x)*i/count,old.y+(e.clientY-old.y)*i/count,.44);
    lastPoint={x:e.clientX,y:e.clientY};
  });
  const release=()=>{down=false;lastPoint=null;};
  window.addEventListener('pointerup',release);window.addEventListener('pointercancel',release);document.documentElement.addEventListener('pointerleave',release);
  document.addEventListener('pointermove',e=>{
    if(!fine.matches || !canAnimate() || e.pointerType==='touch') return;
    tx=e.clientX;ty=e.clientY;hover=!!e.target.closest('a,button,summary,input,select');
    if(!shown){x=tx;y=ty;shown=true;document.documentElement.classList.add('liquid-pointer');drop.style.opacity='1';}
    wake();
  },{passive:true});
  function hideDrop(){shown=false;drop.style.opacity='0';document.documentElement.classList.remove('liquid-pointer');}
  document.documentElement.addEventListener('pointerleave',hideDrop);
  window.addEventListener('blur',()=>{hideDrop();resetWater();});
  document.addEventListener('visibilitychange',()=>{if(document.hidden){hideDrop();resetWater();cancelAnimationFrame(raf);raf=0;}});
  reduced.addEventListener('change',()=>{hideDrop();resetWater();});fine.addEventListener('change',hideDrop);
  function stepWater() {
    // Damped height field. Its gradient refracts the live iframe without reading video pixels.
    for(let yy=1;yy<h-1;yy++)for(let xx=1;xx<w-1;xx++){
      const i=yy*w+xx;
      previous[i]=((current[i-1]+current[i+1]+current[i-w]+current[i+w])*.5-previous[i])*.971;
    }
    [current,previous]=[previous,current];
    const d=mapPixels.data,l=lightPixels.data;
    for(let yy=0;yy<h;yy++)for(let xx=0;xx<w;xx++){
      const i=yy*w+xx,j=i*4;
      const gx=(current[i+(xx<w-1?1:0)]-current[i-(xx>0?1:0)]);
      const gy=(current[i+(yy<h-1?w:0)]-current[i-(yy>0?w:0)]);
      d[j]=128+Math.max(-120,Math.min(120,gx*85));d[j+1]=128+Math.max(-120,Math.min(120,gy*85));d[j+2]=128;d[j+3]=255;
      const light=(gx*.65-gy)*200;
      l[j]=l[j+1]=l[j+2]=255;l[j+3]=Math.min(150,Math.max(0,light));
    }
    mapCtx.putImageData(mapPixels,0,0);ctx.putImageData(lightPixels,0,0);
    mapNode.setAttribute('href',map.toDataURL('image/png'));
  }
  function frame(t) {
    raf=0;if(!canAnimate()) return;
    let moving=false;
    if(shown && fine.matches){
      const dx=tx-x,dy=ty-y;x+=dx*.38;y+=dy*.38;
      const speed=Math.min(.45,Math.hypot(dx,dy)*.007);
      const size=hover?1.13:1;
      drop.style.transform=`translate3d(${x}px,${y}px,0) scale(${size})`;
      moving=Math.abs(dx)+Math.abs(dy)>.12;
    }
    if(active && heroVisible){
      if(t-last>32){stepWater();last=t;}
      if(t-lastInput>4200) resetWater();
    }
    if(moving || active) raf=requestAnimationFrame(frame);
  }
}
