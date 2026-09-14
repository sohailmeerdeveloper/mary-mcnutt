import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
const root=path.resolve('dist');
const mime={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.webp':'image/webp','.woff2':'font/woff2','.svg':'image/svg+xml','.xml':'application/xml','.txt':'text/plain; charset=utf-8','.png':'image/png'};
http.createServer((req,res)=>{try{const url=new URL(req.url,'http://localhost');const name=decodeURIComponent(url.pathname);const target=path.resolve(root,'.'+name+(name.endsWith('/')?'index.html':''));if(!target.startsWith(root+path.sep)){res.writeHead(403);return res.end();}const found=fs.existsSync(target)&&fs.statSync(target).isFile();const actual=found?target:path.join(root,'404.html');res.writeHead(found?200:404,{'Content-Type':mime[path.extname(actual)]||'application/octet-stream','Cache-Control':'no-store'});fs.createReadStream(actual).pipe(res);}catch{res.writeHead(400);res.end('Bad request');}}).listen(4173,'127.0.0.1',()=>console.log('Local: http://127.0.0.1:4173'));
