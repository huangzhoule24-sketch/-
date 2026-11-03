#!/usr/bin/env python3
"""Serve a Godot web export over HTTP; file:// cannot load the game."""
import argparse
import functools
import http.server
from pathlib import Path


class GameHandler(http.server.SimpleHTTPRequestHandler):
    extensions_map = {
        **http.server.SimpleHTTPRequestHandler.extensions_map,
        ".wasm": "application/wasm",
        ".pck": "application/octet-stream",
        ".js": "text/javascript; charset=utf-8",
        ".json": "application/json; charset=utf-8",
    }

    def end_headers(self):
        self.send_header("Cross-Origin-Opener-Policy", "same-origin")
        self.send_header("Cross-Origin-Embedder-Policy", "require-corp")
        self.send_header("Cache-Control", "no-cache")
        super().end_headers()


def main():
    location = Path(__file__).resolve().parent
    default_directory = location if (location / "index.html").exists() else location.parent / "build/full-web"
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--directory", type=Path, default=default_directory)
    parser.add_argument("--port", type=int, default=8000)
    parser.add_argument("--host", default="127.0.0.1")
    args = parser.parse_args()
    directory = args.directory.resolve()
    if not (directory / "index.html").is_file():
        parser.error(f"网页导出不存在：{directory}/index.html；先运行 bash tools/export_web.sh")
    handler = functools.partial(GameHandler, directory=str(directory))
    with http.server.ThreadingHTTPServer((args.host, args.port), handler) as server:
        print(f"Serving {directory} at http://{args.host}:{args.port}/", flush=True)
        try:
            server.serve_forever()
        except KeyboardInterrupt:
            pass


if __name__ == "__main__":
    main()
