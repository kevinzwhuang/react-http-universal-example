'use strict';

const http = require('http');
const fs = require('fs');
const path = require('path');
const React = require('react');
const ReactDOMServer = require('react-dom/server');
import App from 'app';
const dirFiles = fs.readdirSync(path.resolve(__dirname));
const bundles = {}
dirFiles.forEach(name => {
  if (name.startsWith('client')) {
    bundles.client = name;
  } else if (name.startsWith('vendor')) {
    bundles.vendor = name;
  } else if (name.startsWith('manifest')) {
    bundles.manifest = name;
  }
})
const pages = {};

pages.vendorFile = Buffer.from(fs.readFileSync(path.resolve(__dirname, bundles.vendor)));
pages.manifestFile = Buffer.from(fs.readFileSync(path.resolve(__dirname, bundles.manifest)));
pages.clientFile = Buffer.from(fs.readFileSync(path.resolve(__dirname, bundles.client)));
const serverSideApp = ReactDOMServer.renderToString(<App />);
pages.index = Buffer.from(
`<!DOCTYPE html>
  <html>
    <body>
      <div id="container">${serverSideApp}</div>
      <script type="text/javascript" src="${bundles.manifest}"></script>
      <script type="text/javascript" src="${bundles.vendor}"></script>
      <script type="text/javascript" src="${bundles.client}"></script>
    </body>
  </html>
`);
pages.notFound = Buffer.from('404 Not Found');
const port = 3000;

const requestHandler = (request, response) => {
  console.log(request);
  if(request.url === '/') {
    response.end(pages.index)
  } else if (request.url === `/${bundles.client}`) {
    response.end(pages.clientFile)
  } else if (request.url === `/${bundles.vendor}`) {
    response.end(pages.vendorFile)
  } else if (request.url === `/${bundles.manifest}`) {
    response.end(pages.manifestFile)
  }
  response.end(pages.notFound);
}

const server = http.createServer(requestHandler);

server.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }


  console.log(`server is listening on ${port}`)
})
