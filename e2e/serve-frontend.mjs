// Serves the production build of netgrif-frontend (npm run frontend:build) for the e2e tests, as the pipeline runs them:
// the static files of dist/netgrif-frontend, every other path gets index.html (the routes of the application).
// Usage: node e2e/serve-frontend.mjs [port], the port defaults to 4200.
import {createReadStream, existsSync, statSync} from 'node:fs';
import {createServer} from 'node:http';
import {extname, join, normalize, resolve} from 'node:path';

const ROOT = resolve(import.meta.dirname, '..', 'dist', 'netgrif-frontend');
const PORT = Number(process.argv[2] ?? 4200);
const TYPES = {
    '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.mjs': 'text/javascript', '.css': 'text/css',
    '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.ico': 'image/x-icon',
    '.woff': 'font/woff', '.woff2': 'font/woff2', '.ttf': 'font/ttf', '.txt': 'text/plain',
};

if (!existsSync(join(ROOT, 'index.html'))) {
    console.error(`${ROOT}/index.html is missing, build the frontend first: npm run frontend:build`);
    process.exit(1);
}

createServer((request, response) => {
    const path = normalize(decodeURIComponent(new URL(request.url, 'http://localhost').pathname));
    let file = join(ROOT, path);
    if (!file.startsWith(ROOT) || !existsSync(file) || !statSync(file).isFile()) {
        file = join(ROOT, 'index.html');
    }
    response.writeHead(200, {'Content-Type': TYPES[extname(file)] ?? 'application/octet-stream'});
    createReadStream(file).pipe(response);
}).listen(PORT, () => console.log(`netgrif-frontend (production build) on http://localhost:${PORT}`));
