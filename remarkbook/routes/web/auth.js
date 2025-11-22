var express = require('express');
let shortid = require('shortid');
const mongoose = require('mongoose');
const User = require('../../module/user');
const moment = require('moment');
const md5 = require('md5');
const axios = require('axios');


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
  //原生XHR，不适用express
  // const xhr = new XMLHttpRequest();
  // const { username, password } = req.body;
  // xhr.open("POST","http:127.0.0.1:3001/api/login");
  // xhr.send(JSON.stringify(req.body));
  // xhr.onreadystatechange = () => {
  //   if(xhr.readyState === 4) {
  //     if(xhr.status >= 200 && xhr.status <300) {
  //       if(xhr.response.code === '0000') {
  //         console.log(xhr.response.token);
  //         req.header.token = xhr.response.token;
  //         res.redirect('/account');
  //       }
  //     }
  //   }
  // }


  //使用axios，待续。。。
    //  axios({
    //   method: 'post',
    //   url: 'http://127.0.0.1:3001/api/login',
    //   data: req.body
    //  }).then((response) => {
    //   if(response.data.code === '0000') {
    //       console.log(response.data.token);
    //       res.cookie('token', response.data.token, { httpOnly: true, maxAge: 24*3600*1000 });
    //       //req.session.username = data.username
    //       res.redirect('/account');
    //     } else {
    //       res.render('success',{msg:response.data.msg,url:"/login"});
    //     }
    //  })
  const { username, password } = req.body;
  User.findOne({username: username, password: md5(password)}).then((data) => {
    console.log("data==="+data);
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
