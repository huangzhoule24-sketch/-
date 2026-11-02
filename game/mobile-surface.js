'use strict';
// The complete Godot desktop canvas shares one transform: HUD, popups and guide.
(()=>{
 const surface=document.getElementById('game-surface'),canvas=document.getElementById('canvas');
 if(!surface||!canvas)return;
 const mobile=matchMedia('(pointer:coarse)').matches||navigator.maxTouchPoints>0||/Android|iPhone|iPad|Mobile/i.test(navigator.userAgent)||new URLSearchParams(location.search).get('wholeview')==='1';
 if(!mobile){
  const resize=()=>{const h=window.visualViewport?visualViewport.height:innerHeight;if(h>0)surface.style.setProperty('--game-height',h+'px')};
  addEventListener('resize',resize);if(window.visualViewport)visualViewport.addEventListener('resize',resize);resize();return;
 }
 const W=1440,H=900;
 const style=document.createElement('style');style.textContent=`
 #whole-tools{position:fixed;z-index:1000;left:env(safe-area-inset-left);right:env(safe-area-inset-right);top:env(safe-area-inset-top);height:46px;display:flex;align-items:center;justify-content:center;gap:4px;background:#efe7cd;color:#334e45;font:12px system-ui,sans-serif;touch-action:manipulation}
 #whole-tools button{box-sizing:border-box;min-width:44px;height:44px;padding:0 8px;border:2px solid #587665;background:#fff7df;color:#334e45;font:inherit;white-space:nowrap;cursor:pointer}
 #whole-tools button[aria-pressed=true]{background:#3d6858;color:#fff7df}
 #whole-tools output{min-width:34px;text-align:center;font-variant-numeric:tabular-nums}
 #whole-viewport{position:fixed;left:env(safe-area-inset-left);right:env(safe-area-inset-right);top:calc(env(safe-area-inset-top) + 46px);height:calc(var(--whole-height,100dvh) - env(safe-area-inset-top) - env(safe-area-inset-bottom) - 46px);overflow:hidden;touch-action:none;background:#d1d5b8}
 #game-surface.whole-view{position:absolute!important;left:0!important;top:0!important;right:auto!important;width:1440px!important;height:900px!important;transform-origin:0 0;will-change:transform}
 #game-surface.whole-view #canvas{width:1440px!important;height:900px!important;max-width:none!important;max-height:none!important;touch-action:none}
 `;document.head.appendChild(style);
 const viewport=document.createElement('div');viewport.id='whole-viewport';surface.parentNode.insertBefore(viewport,surface);viewport.appendChild(surface);surface.classList.add('whole-view');
 canvas.width=W;canvas.height=H;
 const tools=document.createElement('nav');tools.id='whole-tools';tools.setAttribute('aria-label','整页视图 / Whole game view');document.body.appendChild(tools);
 let scale=1,x=0,y=0,fitScale=1,mode='pan',lastWidth=0,lastHeight=0,queued=false;
 let points=[],start=null,last=null,pair=null,moved=false,hadPinch=false,forwarded=false,forwarding=false,forwardLast=[];
 const minus=button('−',()=>zoom(1/1.25)),percent=document.createElement('output');tools.appendChild(percent);
 const plus=button('+',()=>zoom(1.25)),fitButton=button('',fit),modeButton=button('',()=>{cancel();mode=mode==='pan'?'content':'pan';render()});
 function button(label,fn){const b=document.createElement('button');b.type='button';b.textContent=label;b.addEventListener('click',fn);tools.appendChild(b);return b}
 minus.id='whole-smaller';plus.id='whole-larger';fitButton.id='whole-fit';modeButton.id='whole-mode';percent.id='whole-percent';
 minus.setAttribute('aria-label','缩小 / Zoom out');plus.setAttribute('aria-label','放大 / Zoom in');
 function render(){
  surface.style.transform=`translate(${x}px,${y}px) scale(${scale})`;
  percent.textContent=Math.round(scale*100)+'%';fitButton.textContent='全貌 Fit';modeButton.textContent=mode==='pan'?'整页 Page':'内容 Scroll';
  modeButton.setAttribute('aria-pressed',String(mode==='content'));
  modeButton.title='整页：单指自由拖动整个游戏。内容：单指滚动列表或操作餐厅。两种模式均可在任意位置双指移动、缩放。 / Page: pan the whole game. Content: scroll lists or operate the inn. Two fingers always move and zoom the entire interface.';
 }
 function fit(){cancel();const r=viewport.getBoundingClientRect();fitScale=Math.max(.01,Math.min(r.width/W,r.height/H));scale=fitScale;x=(r.width-W*scale)/2;y=(r.height-H*scale)/2;render()}
 function zoom(factor,anchor){const r=viewport.getBoundingClientRect(),p=anchor||{x:r.width/2,y:r.height/2};const next=Math.max(fitScale*.5,Math.min(Math.max(3,fitScale*8),scale*factor));x=p.x-(p.x-x)*next/scale;y=p.y-(p.y-y)*next/scale;scale=next;render()}
 function focusCanvas(){try{canvas.focus({preventScroll:true})}catch(_error){canvas.focus()}viewport.scrollLeft=0;viewport.scrollTop=0}
 function emit(type,changed,remaining){
  if(!changed.length)return;
  if(type==='touchstart')focusCanvas();
  const event=new Event(type,{bubbles:true,cancelable:true});
  Object.defineProperties(event,{changedTouches:{value:changed},touches:{value:remaining},targetTouches:{value:remaining}});
  forwarding=true;try{canvas.dispatchEvent(event)}finally{forwarding=false}
 }
 function cancel(){if(forwarded)emit('touchcancel',forwardLast,[]);points=[];start=last=pair=null;moved=hadPinch=forwarded=false;forwardLast=[]}
 function tap(p){
  const r=canvas.getBoundingClientRect();if(p.x<r.left||p.x>r.right||p.y<r.top||p.y>r.bottom)return;
  focusCanvas();
  for(const [type,buttons]of [['mousemove',0],['mousedown',1],['mouseup',0]])canvas.dispatchEvent(new MouseEvent(type,{bubbles:true,cancelable:true,clientX:p.x,clientY:p.y,button:0,buttons,view:window}));
 }
 function center(a){return{x:(a[0].clientX+a[1].clientX)/2,y:(a[0].clientY+a[1].clientY)/2,d:Math.hypot(a[0].clientX-a[1].clientX,a[0].clientY-a[1].clientY)}}
 function handle(event){
  if(forwarding)return;
  const relevant=t=>viewport.contains(t.target)||t.target===viewport;
  const changed=Array.from(event.changedTouches).filter(relevant);
  if(!changed.length)return;
  event.preventDefault();event.stopImmediatePropagation();
  const active=Array.from(event.touches).filter(relevant).slice(0,2);points=active;
  if(event.type==='touchcancel'){cancel();return}
  if(event.type==='touchstart'){
   if(active.length===1){const t=active[0];start={x:t.clientX,y:t.clientY,touch:t,onCanvas:t.target===canvas};last={x:start.x,y:start.y};moved=hadPinch=false;pair=null}
   if(active.length===2){if(forwarded){emit('touchcancel',forwardLast,[]);forwarded=false;forwardLast=[]}hadPinch=true;moved=true;pair=center(active)}
   return;
  }
  if(event.type==='touchmove'){
   if(active.length===2){
    const now=center(active),r=viewport.getBoundingClientRect();
    if(pair){zoom(now.d/Math.max(1,pair.d),{x:pair.x-r.left,y:pair.y-r.top});x+=now.x-pair.x;y+=now.y-pair.y;render()}
    pair=now;return;
   }
   if(active.length===1&&start){
    const t=active[0],now={x:t.clientX,y:t.clientY},distance=Math.hypot(now.x-start.x,now.y-start.y);
    const content=mode==='content'&&start.onCanvas&&!hadPinch;
    if(distance>=Math.max(6,content?9*scale:6))moved=true;
    if(moved){
     if(content){if(!forwarded){emit('touchstart',[start.touch],[start.touch]);forwarded=true}emit('touchmove',[t],[t]);forwardLast=[t]}
     else{x+=now.x-last.x;y+=now.y-last.y;render()}
    }
    last=now;
   }
   return;
  }
  if(event.type==='touchend'){
   if(forwarded){emit('touchend',forwardLast,[]);forwarded=false;forwardLast=[]}
   if(active.length===0){if(start&&!moved&&!hadPinch)tap(start);points=[];start=last=pair=null;moved=hadPinch=false}
   else{last={x:active[0].clientX,y:active[0].clientY};pair=null}
  }
 }
 for(const type of ['touchstart','touchmove','touchend','touchcancel'])document.addEventListener(type,handle,{capture:true,passive:false});
 viewport.addEventListener('wheel',e=>{if(mode==='pan'||e.ctrlKey){e.preventDefault();e.stopImmediatePropagation();const r=viewport.getBoundingClientRect();zoom(Math.exp(-e.deltaY*.002),{x:e.clientX-r.left,y:e.clientY-r.top})}},{capture:true,passive:false});
 function resize(){
  queued=false;const v=window.visualViewport,h=v?v.height:innerHeight;if(h>0)viewport.style.setProperty('--whole-height',h+'px');
  const r=viewport.getBoundingClientRect();if(r.width===lastWidth&&r.height===lastHeight)return;
  const fitted=!lastWidth||Math.abs(scale-fitScale)<.001;const world={x:(lastWidth/2-x)/scale,y:(lastHeight/2-y)/scale};
  cancel();lastWidth=r.width;lastHeight=r.height;fitScale=Math.max(.01,Math.min(r.width/W,r.height/H));
  if(fitted)fit();else{x=r.width/2-world.x*scale;y=r.height/2-world.y*scale;render()}
 }
 function schedule(){if(!queued){queued=true;requestAnimationFrame(resize)}}
 Object.defineProperty(window,'shanhaiWholeView',{value:{active:true,width:W,height:H,get scale(){return scale},get fitScale(){return fitScale},get x(){return x},get y(){return y},get mode(){return mode},get contacts(){return points.length}}});
 addEventListener('resize',schedule);addEventListener('orientationchange',schedule);addEventListener('blur',cancel);document.addEventListener('visibilitychange',()=>{if(document.hidden)cancel()});
 if(window.visualViewport){visualViewport.addEventListener('resize',schedule);visualViewport.addEventListener('scroll',schedule)}
 resize();
})();
