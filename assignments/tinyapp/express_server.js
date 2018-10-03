var express = require('express');
var app = express();
var PORT = 8080;

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine', 'ejs');

var urlDatabase = {
  "b2xVn2": "http://www.lighthouselabs.ca", 
  "9sm5xK": "http://www.google.com"
};


app.get("/urls/new", (req, res) => {
  res.render("urls_new");
  res.redirect("google.com")
});

app.post("/urls", (req, res) => {
  var randomKey = generateRandomString();
  urlDatabase[randomKey] = req.body.longURL;
  // console.log(req.body);  // debug statement to see POST parameters
  res.redirect(`/urls/${randomKey}`);         // Respond with 'Ok' (we will replace t his)  /urls/
  console.log(urlDatabase); 
});

app.get("/u/:shortURL", (req, res) => {
  let longURL = "http://www." +urlDatabase[req.params.shortURL];
  console.log(longURL);
  res.redirect(longURL);
});


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

function generateRandomString() {
  let string = "";
  const random = "abcdefghijklmnopqrstuv1o238457893475109384172309827234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  for (let i = 0; i < 6; i++) {
    string += random.charAt(Math.floor(Math.random()*random.length));
  }

  return string;
}
// app.get("/urls.json", (req, res) => {
  //   res.json(urlDatabase);
  // });
  
  // app.get("/hello", (req, res) => {
  //   res.send("<html><body>Hello <b>World</b></body></html>\n");
  // });