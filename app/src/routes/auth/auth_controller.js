exports.loginChecker = (req, res, next) => {
  if(req.isAuthenticated()){
    next();
  } else{
    res.status(403).send('로그인 안 함');
  }
};