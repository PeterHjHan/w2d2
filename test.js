const http = require('http');
const server = http.createServer((request, response) => {
  const {method, url} = request;
  console.log((request));
});

