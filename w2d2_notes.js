const http = require('http');
const server = http.createServer(function (request, response) 
{
  // console.log(request) //prints a very long json file
  // console.log(request.headers["user-agent"]);
  var urlPiece = request.url.split('/');
  var name = urlPiece[0];

  
  if(name) {
    response.end(testing());
  } else {
    response.end('Lol wut?');
  }


});

server.listen(8000) //choose a random port, this page can be called by going localhost:8000 in a browser


function testing() {
  console.log("it's wonderful day");
}