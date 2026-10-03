# Servidor estático do protótipo (várias conexões ao mesmo tempo, sem cache)
import http.server, socketserver, sys, os
os.chdir(os.path.dirname(os.path.abspath(__file__)))
class H(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Cache-Control','no-store'); super().end_headers()
    def log_message(self,*a): pass
class S(socketserver.ThreadingMixIn, http.server.HTTPServer):
    daemon_threads=True; allow_reuse_address=True; request_queue_size=128
S(('127.0.0.1', int(sys.argv[1]) if len(sys.argv)>1 else 5330), H).serve_forever()
