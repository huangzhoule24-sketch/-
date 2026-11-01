/* Stream complete game files from small static parts. No save data is changed. */
(()=>{
 'use strict';
 const config=JSON.parse(document.getElementById('shanhai-resource-map').textContent);
 const version=document.currentScript.dataset.version;
 const supported=typeof DecompressionStream==='function';
 window.shanhaiTransfer={mode:supported?'gzip-preferred':'original',resources:[]};
 if(location.protocol==='file:')return;
 const original=window.fetch.bind(window),base=new URL('.',location.href);
 const targets=new Map(Object.entries(config.resources).map(([name,value])=>[new URL(name,base).href,{name,...value}]));
 let remaining=targets.size;
 async function partsBody(parts,init){
  const abort=new AbortController();let responses;
  try{
   responses=await Promise.all(parts.map(part=>{const url=new URL(part.path,base);url.searchParams.set('v',version);return original(url.href,{...init,signal:abort.signal});}));
   if(responses.some(r=>!r.ok||!r.body))throw Error('A game resource part is unavailable');
  }catch(error){abort.abort();throw error;}
  if(typeof ReadableStream!=='function'){
   const buffers=await Promise.all(responses.map(r=>r.arrayBuffer())),total=buffers.reduce((n,b)=>n+b.byteLength,0),result=new Uint8Array(total);
   let offset=0;for(const b of buffers){result.set(new Uint8Array(b),offset);offset+=b.byteLength;}return result;
  }
  let index=0,reader=responses[0].body.getReader();
  return new ReadableStream({
   async pull(controller){try{while(true){const value=await reader.read();if(!value.done){controller.enqueue(value.value);return;}reader.releaseLock();index++;if(index===responses.length){controller.close();return;}reader=responses[index].body.getReader();}}catch(error){abort.abort();controller.error(error);}},
   cancel(){abort.abort();}
  });
 }
 window.fetch=async function(input,init){
  const url=input instanceof Request?input.url:new URL(String(input),base).href;
  const target=targets.get(url);
  if(!target||((init&&init.method)||(input instanceof Request&&input.method)||'GET')!=='GET')return original(input,init);
  try{
   if(supported){
    try{const body=await partsBody(target.gzip,init);window.shanhaiTransfer.resources.push({file:target.name,transfer:'gzip',parts:target.gzip.length});return new Response(body.pipeThrough(new DecompressionStream('gzip')),{headers:{'Content-Type':target.mime}});}
    catch(_error){window.shanhaiTransfer.resources.push({file:target.name,transfer:'original-fallback',parts:target.raw.length});}
   }else window.shanhaiTransfer.resources.push({file:target.name,transfer:'original',parts:target.raw.length});
   return new Response(await partsBody(target.raw,init),{headers:{'Content-Type':target.mime}});
  }
  finally{remaining--;if(remaining===0)window.fetch=original;}
 };
})();
