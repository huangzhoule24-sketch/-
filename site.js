'use strict';
(()=>{
 let language='zh';try{language=localStorage.getItem('shanhai-site-language')==='en'?'en':'zh'}catch(_error){}
 const words={file:{zh:'请通过HTTP或HTTPS网站地址打开本页。下载的文件包附有本地启动说明。',en:'Open this page through HTTP or HTTPS. The download includes local-server instructions.'},features:{zh:'当前浏览器缺少WebAssembly或WebGL 2，请换用较新的Chrome或Edge。',en:'WebAssembly or WebGL 2 is unavailable. Please try a recent Chrome or Edge.'}};
 let issue='';
 if(location.protocol==='file:')issue='file';
 else{const c=document.createElement('canvas');if(!window.WebAssembly||!c.getContext('webgl2'))issue='features'}
 function apply(code){language=code;document.documentElement.lang=code==='en'?'en':'zh-CN';document.querySelectorAll('[data-zh]').forEach(n=>{n.textContent=n.dataset[code].replaceAll('\\n','\n')});for(const k of ['zh','en'])document.getElementById(k).setAttribute('aria-pressed',String(k===code));document.getElementById('compatibility').textContent=issue?words[issue][code]:'';try{localStorage.setItem('shanhai-site-language',code)}catch(_error){}}
 for(const k of ['zh','en'])document.getElementById(k).addEventListener('click',()=>apply(k));
 document.getElementById('play').addEventListener('click',e=>{if(issue){e.preventDefault();document.getElementById('compatibility').scrollIntoView({block:'center'})}});
 apply(language);
})();
