var express = require('express');
let shortid = require('shortid');
const mongoose = require('mongoose');
const User = require('../../module/user');
const moment = require('moment');
const md5 = require('md5');


//low DB
// var adapter = new FileSync(__dirname + '/../data/db.json');
// var db = low(adapter);

var router = express.Router();

/* GET home page. */
router.get('/reg', (req, res) => {
  res.render('auth/reg');
});

router.post('/reg', (req, res) => {
  User.create({...req.body, password: md5(req.body.password)}).then(() => {
      res.render('auth/login');
  }).catch(err => {

  });
});

router.get('/login', (req, res) => {
  res.render('auth/login');
});

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  User.findOne({username: username, password: md5(password)}).then((data) => {
    if(!data){
        return res.render('success',{msg:"用户名或密码错误",url:"/login"});
    }
    req.session.username = data.username;

    res.redirect('/account');
  }).catch(err => {
    console.log("err==="+err);
    res.render('auth/login');
  })
});

router.post('/logout', (req, res) => {
  req.session.destroy(() => {
    res.render('auth/login');
  });
});
module.exports = router;
