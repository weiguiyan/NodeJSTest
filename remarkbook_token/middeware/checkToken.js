const jwt = require('jsonwebtoken');
const {secret} = require('../config/dbConfig');

module.exports = (req, res, next) => {
  const token = req.get("token");
  if(!token){
    return  res.json({
      code: '1001',
      msg: '未提供token',
      data: token
    })
  }
  jwt.verify(token, secret, (err, data) => {
  if(err){
    return res.json({
      code: '1000',
      msg: 'token验证失败',
      data: err.message
    })
  }
  req.user = data;
  next();
  })
}