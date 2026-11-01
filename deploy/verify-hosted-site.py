#!/usr/bin/env python3
"""Verify a deployed static Shanhai site; uses no credentials or third-party APIs."""
import argparse,gzip,hashlib,json,urllib.request
from pathlib import Path

def main():
    parser=argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--url',required=True,help='Website root including any subdirectory')
    parser.add_argument('--full',action='store_true',help='Download and hash both compressed game resources (about 40 MB)')
    parser.add_argument('--output',type=Path)
    args=parser.parse_args();base=args.url.rstrip('/')+'/'
    if not base.startswith(('https://','http://')):parser.error('Use an HTTP or HTTPS address')
    checks=[]
    def read(name,method='GET'):
        request=urllib.request.Request(base+name,method=method,headers={'User-Agent':'Shanhai-static-host-verifier/1.0','Cache-Control':'no-cache'})
        with urllib.request.urlopen(request,timeout=90)as response:
            body=response.read()if method=='GET'else b''
            checks.append({'file':name,'status':response.status,'content_type':response.headers.get_content_type()})
            assert response.status==200,name
            return body,response.headers
    homepage,_=read('');assert b'game/'in homepage,'Homepage has no game entry'
    manifest,_=read('site-receipt.json');manifest=json.loads(manifest)
    read('game/index.html');read('game/fast-loader.js')
    mapping=manifest.get('resource_map')
    if mapping:
        for name,resource in mapping['resources'].items():
            for part in resource['raw']:
                _,headers=read('game/'+part['path'],'HEAD')
                assert headers.get_content_type()not in ['text/html','application/json'],part['path']
            if args.full:
                blocks=[]
                for part in resource['gzip']:
                    body,_=read('game/'+part['path'])
                    assert len(body)==part['bytes']and hashlib.sha256(body).hexdigest()==part['sha256'],part['path']
                    blocks.append(body)
                decoded=gzip.decompress(b''.join(blocks))
                assert len(decoded)==resource['bytes']and hashlib.sha256(decoded).hexdigest()==resource['sha256'],name+' reconstructed hash'
    else:
        for name,mime in [('index.wasm','application/wasm'),('index.pck','application/octet-stream')]:
            _,headers=read('game/'+name,'HEAD')
            assert headers.get_content_type()==mime,f'{name}: configure MIME type {mime}'
            if args.full:
                body,_=read('game/'+name+'.gz');entry=manifest['files']['game/'+name+'.gz']
                assert len(body)==entry['bytes']and hashlib.sha256(body).hexdigest()==entry['sha256'],name+' gzip hash'
                decoded=gzip.decompress(body);entry=manifest['files']['game/'+name]
                assert len(decoded)==entry['bytes']and hashlib.sha256(decoded).hexdigest()==entry['sha256'],name+' decompressed hash'
    result={'url':base,'version':manifest['version'],'game_source':manifest['game_source'],'checks':checks,'gzip_sha_and_roundtrip_verified':args.full,'https_address':base.startswith('https://'),'mainland_network_tested':False,'note':'Static deployment verification only. Open the game from the actual classroom network to verify browser play and mainland reachability.'}
    encoded=json.dumps(result,ensure_ascii=False,indent=2)+'\n'
    if args.output:args.output.parent.mkdir(parents=True,exist_ok=True);args.output.write_text(encoded)
    print(encoded)
if __name__=='__main__':main()
