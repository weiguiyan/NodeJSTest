var express = require('express');
let shortid = require('shortid');
const mongoose = require('mongoose');
const User = require('../../module/user');
const moment = require('moment');
const md5 = require('md5');
const jwt = require('jsonwebtoken');
const {secret} = require('../../config/dbConfig');

//low DB
// var adapter = new FileSync(__dirname + '/../data/db.json');
// var db = low(adapter);

var router = express.Router();



router.post('/login', (req, res) => {
  const { username, password } = req.body;
  User.findOne({username: username, password: md5(password)}).then((data) => {
    if(!data){
        return res.json({
        code: 2002,
        msg: '账号或密码错误',
        data: data
        })
    }
    let token = jwt.sign({
        username: data.username,
        _id: data._id
    }, secret,
    {expiresIn: 60 * 60 * 24});
    res.json({
        code: '0000',
        msg: '登录成功',
        token: token
    })
  }).catch(err => {
    res.json({
        code: 2001,
        msg: '登录失败',
        data: err.message
    })
  })
});

router.post('/logout', (req, res) => {
  req.session.destroy(() => {
    res.render('auth/login');
  });
});
module.exports = router;
