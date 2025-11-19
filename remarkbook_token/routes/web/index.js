var express = require('express');
var low = require('lowdb');
var FileSync = require('lowdb/adapters/FileSync');
let shortid = require('shortid');
const mongoose = require('mongoose');
const Account = require('../../module/account');
const moment = require('moment');
const checkLogin = require('../../middeware/checkLogin');

var router = express.Router();

router.get('/', function(req, res, next) {
  res.redirect("/account");
});


router.get('/account', checkLogin, function(req, res, next) {

  Account.find().sort({time: -1}).then((accounts) => {
    res.render('list', { accounts:accounts, moment:moment });
  });
});

router.get('/account/create', checkLogin, function(req, res, next) {
  
  res.render('create', { title: 'Express' });
});

router.get('/account/:id', checkLogin, function(req, res, next) {
  let id = req.params.id;
  Account.deleteOne({_id:id}).then((a) => {
    res.render("success",{msg:"删除成功",url:"/account"});
  });
});

router.post('/account', checkLogin, function(req, res, next) {
  let time = moment(req.body.time).toDate();
  Account.create({time:time, ...req.body}).then((data) => {
    res.render("success",{msg:"添加成功",url:"/account"});
  })
});
module.exports = router;
