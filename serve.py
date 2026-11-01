#!/usr/bin/env python3
"""Serve the complete browser site without requiring cross-origin isolation."""
import argparse,functools,http.server,webbrowser
from pathlib import Path
class Handler(http.server.SimpleHTTPRequestHandler):
    extensions_map={**http.server.SimpleHTTPRequestHandler.extensions_map,'.wasm':'application/wasm','.pck':'application/octet-stream','.gz':'application/gzip','.js':'text/javascript; charset=utf-8','.json':'application/json; charset=utf-8'}
    def end_headers(self):
        self.send_header('Cache-Control','no-cache')
        super().end_headers()
def main():
    here=Path(__file__).resolve().parent
    p=argparse.ArgumentParser(description=__doc__);p.add_argument('--directory',type=Path,default=here if (here/'index.html').exists()else here.parent/'build/web-site');p.add_argument('--host',default='127.0.0.1');p.add_argument('--port',type=int,default=8000);p.add_argument('--open-browser',action='store_true');a=p.parse_args()
    root=a.directory.resolve()
    if not (root/'index.html').is_file():p.error('Build the site first with python tools/build_web_site.py')
    with http.server.ThreadingHTTPServer((a.host,a.port),functools.partial(Handler,directory=str(root)))as server:
        url=f'http://127.0.0.1:{a.port}/';print('Shanhai browser site: '+url,flush=True)
        if a.open_browser:webbrowser.open(url)
        try:server.serve_forever()
        except KeyboardInterrupt:pass
if __name__=='__main__':main()
