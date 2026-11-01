"""Dependency-free WSGI entry point for the static Marvel Forge portfolio."""
from pathlib import Path
import mimetypes
from wsgiref.util import FileWrapper

PUBLIC = Path(__file__).resolve().parent / "dist"


def application(environ, start_response):
    if environ.get("REQUEST_METHOD") not in ("GET", "HEAD"):
        start_response("405 Method Not Allowed", [("Allow", "GET, HEAD")])
        return [b"Method not allowed"]
    path = environ.get("PATH_INFO", "/")
    if path == "/":
        path = "/index.html"
    target = (PUBLIC / path.lstrip("/")).resolve()
    if not target.is_relative_to(PUBLIC.resolve()) or not target.is_file():
        start_response("404 Not Found", [("Content-Type", "text/plain")])
        return [b"Not found"]
    content_type = mimetypes.guess_type(str(target))[0] or "application/octet-stream"
    if content_type.startswith("text/") or content_type == "application/javascript":
        content_type += "; charset=utf-8"
    start_response("200 OK", [
        ("Content-Type", content_type),
        ("Content-Length", str(target.stat().st_size)),
        ("X-Content-Type-Options", "nosniff"),
        ("Cache-Control", "no-cache" if target.suffix in (".html", ".css", ".js") else "public, max-age=3600"),
    ])
    return [] if environ.get("REQUEST_METHOD") == "HEAD" else FileWrapper(target.open("rb"))
