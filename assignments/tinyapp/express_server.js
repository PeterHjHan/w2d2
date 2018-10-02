var express = require('express');
var app = express();
var PORT = 8080;

app.set('view engine', 'ejs');

var urlDatabase = {
  "b2xVn2": "http://www.lighthouselabs.ca", 
  "9sm5xK": "http://www.google.com"
};

// app.get("/", (req, res) => {
//   res.send("Hello!");
// });

// for(let values in urlDatabase){
//   console.log(values + urlDatabase[values]); 
// }



// for (var i = 0; i < Object.values(urlDatabase).length; i++) {
//   console.log(`Keys are ${Object.keys(urlDatabase)[i]} and values are ${Object.values(urlDatabase)[i]} `)
// }



app.get("/urls/:id", (req, res) => {
  let templateVars = { shortURL: req.params.id,
  longURL : urlDatabase[req.params.id] };
  res.render("urls_show", templateVars);
});

app.get("/urls", (req, res) => {
  let templateVars = { urls: urlDatabase };
  res.render("urls_index", templateVars);
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});




// app.get("/urls.json", (req, res) => {
  //   res.json(urlDatabase);
  // });
  
  // app.get("/hello", (req, res) => {
  //   res.send("<html><body>Hello <b>World</b></body></html>\n");
  // });