/* Preserve only public preview-link parameters on this origin, never account credentials. */
'use strict';
(()=>{
 const keys=['eo_token','eo_time'],storageKey='shanhai-preview-access';
 const current=new URL(location.href);
 const fragment=new URLSearchParams(current.hash.slice(1));
 const supplied=keys.every(key=>current.searchParams.has(key))?current.searchParams:fragment;
 const valid=value=>value&&typeof value.eo_token==='string'&&/^[A-Za-z0-9_-]{1,512}$/.test(value.eo_token)&&/^\d{8,14}$/.test(value.eo_time||'');
 let access=null;
 if(keys.every(key=>supplied.has(key))){
  const candidate=Object.fromEntries(keys.map(key=>[key,supplied.get(key)]));
  if(valid(candidate)){access=candidate;try{sessionStorage.setItem(storageKey,JSON.stringify(access));}catch(_error){}}
 }else{
  try{const saved=JSON.parse(sessionStorage.getItem(storageKey)||'null');if(valid(saved))access=saved;}catch(_error){}
 }
 window.shanhaiPreviewAccess={
  active:!!access,
  entryURL(){
   const url=new URL('./',location.href);
   if(access){for(const key of keys)url.searchParams.set(key,access[key]);}
   else{url.searchParams.set('classroom','1');url.searchParams.set('v','web-r6');}
   return url.href;
  }
 };
 if(access){
  for(const link of document.querySelectorAll('a[href]')){
   const target=new URL(link.href,location.href);
   if(target.origin===location.origin&&target.pathname.endsWith('/share.html')){
    // Fragments stay in the browser; no signature is reused on a different HTTP path.
    target.hash=new URLSearchParams(access).toString();link.href=target.href;
   }
  }
 }
})();
