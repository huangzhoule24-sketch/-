/* Prefer gzip on static hosts; keep the original exports as the fallback.
 * Only the two game resources are intercepted during startup. No saved data is touched.
 */
(()=>{
 'use strict';
 const supported=typeof DecompressionStream==='function'&&location.protocol!=='file:';
 window.shanhaiTransfer={mode:supported?'gzip-preferred':'original',resources:[]};
 if(!supported)return;
 const original=window.fetch.bind(window);
 const base=new URL('.',location.href);
 const targets=new Map([['index.wasm','application/wasm'],['index.pck','application/octet-stream']].map(([name,type])=>[new URL(name,base).href,{name,type}]));
 let remaining=targets.size;
 window.fetch=async function(input,init){
  const url=input instanceof Request?input.url:new URL(String(input),base).href;
  const target=targets.get(url);
  if(!target||((init&&init.method)||(input instanceof Request&&input.method)||'GET')!=='GET')return original(input,init);
  try{
   const response=await original(url+'.gz',init);
   if(!response.ok||!response.body)throw Error('Compressed resource unavailable');
   const decodedByHttp=String(response.headers.get('content-encoding')||'').toLowerCase().split(',').map(s=>s.trim()).includes('gzip');
   const body=decodedByHttp?response.body:response.body.pipeThrough(new DecompressionStream('gzip'));
   window.shanhaiTransfer.resources.push({file:target.name,transfer:'gzip',httpDecoded:decodedByHttp});
   return new Response(body,{status:200,headers:{'Content-Type':target.type}});
  }catch(_error){window.shanhaiTransfer.resources.push({file:target.name,transfer:'original-fallback'});return original(input,init)}
  finally{remaining--;if(remaining===0)window.fetch=original;}
 };
})();
