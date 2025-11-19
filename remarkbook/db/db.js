module.exports = function(success, error) {
const { DB_URL, DB_PORT, DB_NAME} = require('../config/dbConfig');
let mongoose = require('mongoose');

if(error === undefined){
    error = function(err){
        console.log('mongodb数据库连接失败', err);
    }
}
    mongoose.connect(`mongodb://${DB_URL}:${DB_PORT}/${DB_NAME}`);
    mongoose.connection.on('open',()=>{
        console.log('mongodb数据库连接成功');
        success()
    });
    mongoose.connection.on('error',(err)=>{
        error(err)
    });
    mongoose.connection.on('close',()=>{
        console.log('数据库连接关闭');
    });
}