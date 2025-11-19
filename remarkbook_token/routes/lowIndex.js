var express = require('express');
var low = require('lowdb');
var FileSync = require('lowdb/adapters/FileSync');
let shortid = require('shortid');

//low DB
var adapter = new FileSync(__dirname + '/../data/db.json');
var db = low(adapter);

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET home page. */
router.get('/account', function(req, res, next) {
  let accounts = db.get('accounts').value();

  res.render('list', { accounts: accounts });
});

router.get('/account/create', function(req, res, next) {
  res.render('create', { title: 'Express' });
});

router.get('/account/:id', function(req, res, next) {
  let id = req.params.id;
  db.get('accounts').remove({id:id}).write();
  res.send("删除成功");
});

router.post('/account', function(req, res, next) {
  //res.render('create', { title: 'Express' });
  let id = shortid.generate();
  db.get('accounts').unshift({id:id, ...req.body}).write();
  res.render("success",{msg:"添加成功",url:"/account"});
});
module.exports = router;
