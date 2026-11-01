'use strict';
(()=>{
 const fallback=new URL('./',location.href);fallback.searchParams.set('classroom','1');fallback.searchParams.set('v','web-r6');
 const value=window.shanhaiPreviewAccess?window.shanhaiPreviewAccess.entryURL():fallback.href,qr=qrcode(0,'M');qr.addData(value);qr.make();
 const svg=qr.createSvgTag({cellSize:7,margin:28,scalable:true,alt:'山海食肆物语课堂试玩二维码'});
 document.getElementById('qr').innerHTML=svg;document.getElementById('share-url').value=value;document.getElementById('open-game').href=value;
 document.getElementById('copy').addEventListener('click',async()=>{try{await navigator.clipboard.writeText(value);document.getElementById('share-status').textContent='地址已复制 / Link copied';}catch(_error){document.getElementById('share-url').select();document.getElementById('share-status').textContent='请复制上方地址 / Copy the selected address';}});
 document.getElementById('download').addEventListener('click',()=>{const object=URL.createObjectURL(new Blob([svg],{type:'image/svg+xml'})),a=document.createElement('a');a.href=object;a.download='shanhai-classroom-qr.svg';a.click();setTimeout(()=>URL.revokeObjectURL(object),1000);});
 document.getElementById('print').addEventListener('click',()=>window.print());
 if(window.shanhaiPreviewAccess?.active)document.getElementById('share-status').textContent='此二维码含平台访问参数，有效期以平台设置为准；课堂前请用另一部手机试开。 / This QR includes platform access parameters. Check its validity before class.';
})();
