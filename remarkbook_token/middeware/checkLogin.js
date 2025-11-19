module.exports = (req, res, next) => {
  if(!req.session.username){
    console.log("未登录");
    res.redirect('/login');
    return;
  }
  next();
}