/* Same-origin device entry. Runs before the game starts downloading its pack. */
'use strict';
(()=>{
 const script=document.currentScript;
 if(!script||!script.dataset.root)return;
 const root=new URL(script.dataset.root,location.href),current=script.dataset.variant,page=script.dataset.page;
 const source=new URL(location.href),ua=navigator.userAgent||'',touch=navigator.maxTouchPoints||0;
 function detect(){
  if(/Windows NT|CrOS/i.test(ua)&&!/Windows Phone/i.test(ua))return 'desktop';
  if(/Android|iPhone|iPad|iPod|Windows Phone|Mobile/i.test(ua))return 'mobile';
  if(navigator.userAgentData&&navigator.userAgentData.mobile)return 'mobile';
  if(touch>1&&(/Macintosh/i.test(ua)||navigator.platform==='MacIntel'))return 'mobile';
  const edge=Math.min(screen.width||innerWidth,screen.height||innerHeight);
  if(touch>0&&edge<=900&&!/Windows|CrOS|Macintosh|X11|x86_64/i.test(ua))return 'mobile';
  return 'desktop';
 }
 const device=detect(),query=source.searchParams.get('device');
 const mode=['desktop','mobile'].includes(query)?query:'auto';
 // Preserve an explicitly requested legacy whole-canvas compatibility link.
 const selected=mode==='auto'?(source.searchParams.get('wholeview')==='1'?current:device):mode;
 function address(variant,kind,override){
  const target=new URL((variant==='mobile'?'portrait/':'')+(kind==='game'?'game/':''),root);
  target.search=source.search;target.hash=source.hash;
  target.searchParams.delete('device');
  if(override&&override!=='auto')target.searchParams.set('device',override);
  else if(override==='auto')target.searchParams.delete('wholeview');
  // Carry public preview access in a browser fragment, never re-sign another path.
  if(target.pathname!==source.pathname){
   const fragment=new URLSearchParams(target.hash.slice(1));
   for(const key of ['eo_token','eo_time'])if(target.searchParams.has(key)){
    fragment.set(key,target.searchParams.get(key));target.searchParams.delete(key);
   }
   if(fragment.has('eo_token')&&fragment.has('eo_time'))target.hash=fragment.toString();
  }
  return target;
 }
 const redirecting=page!=='share'&&selected!==current;
 window.shanhaiDeviceRoute=Object.freeze({version:'web-branch-r2',root:root.href,current,device,mode,selected,redirecting});
 if(redirecting){location.replace(address(selected,page,mode).href);return;}
 // The two game builds keep their established save paths. Only switch at entry.
 function mount(){
  if(page==='game')return;
  const box=document.createElement('section');box.className='device-entry';box.id='device-entry';
  const status=document.createElement('p');status.id='device-entry-status';status.setAttribute('role','status');box.appendChild(status);
  const links=document.createElement('nav');links.setAttribute('aria-label','版本选择 / Game version');box.appendChild(links);
  const items=[['auto','自动识别','Automatic'],['desktop','电脑版','Desktop'],['mobile','手机竖屏版','Mobile portrait']];
  for(const [value,zh,en]of items){
   const link=document.createElement('a');link.id='device-'+value;link.dataset.zh=zh;link.dataset.en=en;
   link.href=address(value==='auto'?device:value,'home',value).href;
   link.setAttribute('aria-current',mode===value?'true':'false');links.appendChild(link);
  }
  const note=document.createElement('small');note.dataset.zh='切换版本前请先保存进度。分享二维码会使用自动识别入口。';note.dataset.en='Save before switching versions. Shared QR codes use the automatic entry.';box.appendChild(note);
  const parent=document.querySelector('.intro')||document.querySelector('.share')||document.querySelector('main');
  if(!parent)return;parent.appendChild(box);
  function language(){
   const english=document.documentElement.lang==='en',label=selected==='mobile'?(english?'mobile portrait':'手机竖屏版'):(english?'desktop':'电脑版');
   status.textContent=mode==='auto'?(english?'Automatically selected: '+label:'已自动选择：'+label):(english?'Manually selected: '+label:'已手动选择：'+label);
   for(const node of box.querySelectorAll('[data-zh]'))node.textContent=node.dataset[english?'en':'zh'];
  }
  language();new MutationObserver(language).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
  const play=document.getElementById('play');
  if(play)play.href=address(current,'game',mode).href;
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount,{once:true});else mount();
})();
