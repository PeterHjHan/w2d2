# Web Servers

Express = web framework for Node.js but VERY SIMPLE
nodemon [fiename] makes it refresh the servers


POST --> REDIRECT --> GET

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
});```