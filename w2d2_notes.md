# Web Servers

Express = web framework for Node.js but VERY SIMPLE
nodemon [fiename] makes it refresh the servers


POST --> REDIRECT --> GET


### REQUEST
* REQUEST is a READABLESTREAM file
In a request, we can request the contents to be pushed to an array or an object and then LATER pull the strings information to be put on as a RESPONSE 
```js
let body = [];
request.on('data', (chunk) => {
  body.push(chunk);
}).on('end', () => {
  body = Buffer.concat(body).toString();
  // at this point, `body` has the entire request body stored in it as a string
});
```
* Always add an error section no matter what. b/c the REQUEST function is a stream and will cause errors, and if an error is not stated, the function will endlessly run.
```js
request.on('error', (err) => {
  // This prints the error message and stack trace to `stderr`.
  console.error(err.stack);
});
```

* This is how a request section of the code should look. But this will not display anything on the browser because it does NOT have a RESPONSE section. This is now RECEIVING The requests but not RESPONDING to it.
```js
const http = require('http');

http.createServer((request, response) => {
  const { headers, method, url } = request;
  let body = [];
  request.on('error', (err) => {
    console.error(err);
  }).on('data', (chunk) => {
    body.push(chunk);
  }).on('end', () => {
    body = Buffer.concat(body).toString();
    // At this point, we have the headers, method, url and body, and can now
    // do whatever we need to in order to respond to this request.
  });
}).listen(8080); // Activates this server, listening on port 8080.
```
* The above const {headers, method,url } = request, means that request.headers; request.method; request.url can be called.
### RESPONSE
```js 
response.statusCode = 404; // Tell the client that the resource wasn't found.
```
* Setting Headers
  * Headers are case INSENSITIVE and if a header is repeated, the last value will be called;
  * set by using the setHeader Method
  ```js
  response.setHeader('Content-Type', 'application/json');
  response.setHeader('X-Powered-By', 'bacon');
```
* RESPONSE method is a WRITEABLESTREAM file
* puttint it all together with the request method
```js
const http = require('http');

http.createServer((request, response) => {
  const { headers, method, url } = request;
  let body = [];
  request.on('error', (err) => {
    console.error(err);
  }).on('data', (chunk) => {
    body.push(chunk);
  }).on('end', () => {
    body = Buffer.concat(body).toString();
    // BEGINNING OF NEW STUFF

    response.on('error', (err) => {
      console.error(err);
    });

    response.statusCode = 200;
    response.setHeader('Content-Type', 'application/json');
    // Note: the 2 lines above could be replaced with this next one:
    // response.writeHead(200, {'Content-Type': 'application/json'})

    const responseBody = { headers, method, url, body };

    response.write(JSON.stringify(responseBody));
    response.end();
    // Note: the 2 lines above could be replaced with this next one:
    // response.end(JSON.stringify(responseBody))

    // END OF NEW STUFF
  });
}).listen(8080);
```

## With the concept of readablestream and writeablestream capabilities of the request and reponse
* we can use the pipe function
```js
http.createServer((request, response) => {
  request.on('error', (err) => {
    console.error(err);
    response.statusCode = 400;
    response.end();
  });
  response.on('error', (err) => {
    console.error(err);
  });
  if (request.method === 'POST' && request.url === '/echo') {
    request.pipe(response);
  } else {
    response.statusCode = 404;
    response.end();
  }
}).listen(8080);
```