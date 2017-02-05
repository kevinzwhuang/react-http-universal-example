'use strict';

const http = require('http');
const fs = require('fs');
const path = require('path');
const clientFileName = fs.readdirSync(path.resolve(__dirname)).find(name => name.startsWith('client'));
const pages = {};

pages.clientFile = Buffer.from(fs.readFileSync(path.resolve(__dirname, clientFileName)));
pages.index = Buffer.from(
`<!DOCTYPE html>
<html>
  <body>
    <div id="container">
      Hello there!
    </div>
    <script type="text/javascript" src="${clientFileName}"></script>
  </body>
</html>
`);
pages.notFound = Buffer.from('404 Not Found');
const port = 3000;

const requestHandler = (request, response) => {
  console.log(request);
  if(request.url === '/') {
    response.end(pages.index)
  } else if (request.url === `/${clientFileName}`) {
    response.end(pages.clientFile)
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
