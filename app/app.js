const express = require('express');
const app = express();
const auth = require('./routes/auth.js');
const home = require('./src/routes/home');


app.use(express.static(__dirname + '/src/public'));
app.set('view engine', 'ejs');

app.use('/auth', require('./routes/auth.js'));

app.use('/', home);

app.get('/login', (req, res) =>{
    res.render('login-page.ejs');
})

app.get('/signup', (req, res) =>{
  res.render('signup-page.ejs');
})

app.get('/post-page', (req, res) =>{
  res.render('post-board-page.ejs');
})

app.get('/product-page'), (req, res) =>{
  res.render('product-board-page.ejs');
}

app.get('/product'), (req, res) =>{
  res.render('product-page.ejs');
}

app.get('/aboutus'), (req, res) =>{
  res.render('aboutus-page.ejs');
}

app.get('/magazine-page', (req, res) =>{
  res.render('/magazine-board-page.ejs');
})

app.get('/magazine', (req, res) =>{
  res.render('magazine-page.ejs');
})

app.get('/mypage/:id', (req, res) =>{
  res.render('mypage.ejs');
})

module.exports = app;



