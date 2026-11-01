'use strict';
// visualViewport also follows Safari/Android browser chrome and embedded tabs.
// The canvas keeps its own multi-touch input; the document never scrolls it away.
(()=>{
 const surface=document.getElementById('game-surface');
 if(!surface)return;
 let queued=false;
 function resize(){
  queued=false;
  const v=window.visualViewport;
  const height=v?v.height:window.innerHeight;
  if(height>0)surface.style.setProperty('--game-height',height+'px');
 }
 function schedule(){if(!queued){queued=true;requestAnimationFrame(resize)}}
 window.addEventListener('resize',schedule);
 window.addEventListener('orientationchange',schedule);
 if(window.visualViewport){visualViewport.addEventListener('resize',schedule);visualViewport.addEventListener('scroll',schedule)}
 resize();
})();
