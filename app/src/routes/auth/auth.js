const express = require("express");
const router = express.Router();
const session = require('express-session');
const passport = require('passport'), LocalStrategy = require('passport-local').Strategy;
const loginChecker = require('./auth_controller.js');
require('dotenv').config();

var db = require('../database.js');

router.use(express.static(__dirname + 'public'));

router.use(session({
    secret: '암호화에 쓸 비번',
    resave : false,
    saveUninitialized : false,
    cookie : { maxAge : 60 * 60 * 24* 30}
}))
router.use(passport.session());
router.use(passport.initialize());

passport.use(new LocalStrategy(
    function(username, password, done) {
        var sql = 'SELECT * FROM user WHERE (user_id OR user_tagid)=? AND user_password=?'
        db.query(sql, [username, password], function(err,result) {
          if(err) console.log('db 에러');

          if(result.length === 0){
            console.log("결과 없음");
            return done(null, false, {message: 'Incorrect'});
          }else{
            console.log(result);
            var json = JSON.parse(json);
            var userinfo = JSON.parse(json);
            console.log("userinfo " + userinfo);
            return done(null, userinfo);
          }
        })
    }
));

passport.serializeUser((user, done) =>{
  process.nextTick(() => {
    done(null, { id : user._id, username : user.username});
  })
})

passport.deserializeUser(async (user, done) => {
  let result = await db.collection('user').findOne({_id : new ObjectId(user.id)});
  process.nextTick(() => {
    delete result.password;
    return done(null, user)
  })
})


router.post('/login', (req, res)=>{
    passport.authenticate('local', { successRedirect: '/home',
        failureRedirect: '/login',
        failureFlash: true })
})

router.post('/signup', (req, res) => {

})

router.get('/logout', loginChecker,(req, res) =>{
  req.logout();
  req.session.destroy();
  res.redirect('/home');
})


//RENDER
router.get('/login', controller.render.login);
router.get('/signup', controller.render.signup);

//PROCESS
router.post('/login', controller.process.login);
router.post('/signup', controller.process.signup);

module.exports = router;