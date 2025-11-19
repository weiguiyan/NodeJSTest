var express = require('express');
const moment = require('moment');
const Account = require('../../module/account');
const checkToken = require('../../middeware/checkToken');

var router = express.Router();

router.use(checkToken);

router.get('/account', function(req, res) {
  //中间件从Token中获取当前登录用户的信息并传给路由
  console.log(req.user);
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
      data: err.message
    })
  });    
});

router.get('/account/:id', function(req, res, next) {
  let id = req.params.id;
  Account.findById(id).then((accounts) => {
    if(!accounts){  
      return res.json({
        code: '1001',
        msg: '记录不存在',
        data: accounts
      })
    }
    res.json({
      code: '0000',
      msg: '读取成功',
      data: accounts
    })
  }).catch(err => {
    res.json({
      code: '1002',
      msg: '读取失败',
      data: err.message
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
      data: err.message
    })
  });
});

router.post('/account', (req, res, next) => {
  let time = moment(req.body.time).toDate();
  Account.create({time:time, ...req.body}).then((data) => {
    res.json({
      code: '0000',
      msg: '添加成功',
      data: data
    })
  }).catch(err => {
    res.json({
      code: '1004',
      msg: '添加失败',
      data: err.message
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
        data: err.message
      })
    })
  }).catch(err => {
    res.json({
      code: '1005',
      msg: '更新失败',
      data: err.message
    })
  }); 
});
module.exports = router;
