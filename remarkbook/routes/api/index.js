var express = require('express');
let shortid = require('shortid');
const Account = require('../../module/account');
const moment = require('moment');


var router = express.Router();

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });


router.get('/account', function(req, res, next) {
  Account.find().sort({time: -1}).then((accounts) => {
    res.json({
      code: '0000',
      msg: '读取成功',
      data: accounts
    })
  }).catch(err => {
    res.json({
      code: '1001',
      msg: '读取失败',
      data: err
    })
  });
});

router.get('/account/:id', function(req, res, next) {
  let id = req.params.id;
  Account.findById(id).then((accounts) => {
    res.json({
      code: '0000',
      msg: '读取成功',
      data: accounts
    })
  }).catch(err => {
    res.json({
      code: '1002',
      msg: '读取失败',
      data: err
    })
  });
});

router.delete('/account/:id', function(req, res, next) {
  let id = req.params.id;
  Account.deleteOne({_id:id}).then((data) => {
    res.json({
      code: '0000',
      msg: '删除成功',
      data: data
    })
  }).catch(err => { 
    res.json({
      code: '1003',
      msg: '删除失败',
      data: err
    })
  });
});

router.post('/account', (req, res, next) => {
  let time = moment(req.body.time).toDate();
  Account.create({time:time, ...req.body}).then((data) => {
    console.log("data```"+data);
    res.json({
      code: '0000',
      msg: '添加成功',
      data: data
    })
  }).catch(err => {
    res.json({
      code: '1004',
      msg: '添加失败',
      data: err
    })
  });
});

router.patch('/account/:id', (req, res, next) => {
  let id = req.params.id;
  Account.updateOne({_id:id},req.body).then((data) => {
    Account.findById(id).then((updatedData) => {
    res.json({
      code: '0000',
      msg: '更新成功',
      data: updatedData
    })
    }).catch(err => {
      res.json({
        code: '1006',
        msg: '读取更新失败',
        data: err
      })
    })
  }).catch(err => {
    res.json({
      code: '1005',
      msg: '更新失败',
      data: err
    })
  }); 
});
module.exports = router;
