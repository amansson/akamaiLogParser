const http = require('http');

// import { getDoc } from './src/readDB.js';
const data = require('./src/readDB').getDoc;

http.createServer(async function (req, res) {
  const html = await buildHtml(req);

  res.writeHead(200, {
    'Content-Type': 'text/html',
    'Content-Length': html.length,
    'Expires': new Date().toUTCString()
  });
  res.end(html);
}).listen(3000);

async function buildHtml(req) {
  let header = '';
  let body = JSON.stringify(await data());

  // concatenate header string
  // concatenate body string

  return '<!DOCTYPE html>'
       + '<html><head>' + header + '</head><body>' + body + '</body></html>';
};
