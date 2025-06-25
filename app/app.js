const express = require('express');
const session = require('express-session');
const passport = require('passport');
const passportConfig = require('./src/passport');

const cookieParser = require('cookie-parser');

require('dotenv').config();

const home = require('./src/routes/home/home.js');
const auth = require('./src/routes/auth/auth.js');
const post = require('./src/routes/post/post.js');
const product = require('./src/routes/product/product.js');
const magazine = require('./src/routes/magazine/magazine.js');

const path = require('path');

const app = express();
passportConfig();

app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
    session({
       resave: false,
       saveUninitialized: false,
       secret: process.env.COOKIE_SECRET,
       cookie: {
          httpOnly: true,
          secure: false,
       },
    }),
 );

app.use(passport.initialize()); // 요청 객체에 passport 설정을 심음
app.use(passport.session()); // req.session 객체에 passport정보를 추가 저장
// passport.session()이 실행되면, 세션쿠키 정보를 바탕으로 해서 passport/index.js의 deserializeUser()가 실행하게 한다.

app.use(express.static(`${__dirname}/src/public`));
app.set('views', path.join(__dirname, './src/views'));
app.set('view engine', 'ejs');

app.use('/', home);
app.use('/auth', auth);
app.use('/post', post);
app.use('/product', product);
app.use('/magazine', magazine);

module.exports = app;