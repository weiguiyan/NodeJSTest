const p = new Promise((resolve, reject) => {
   setTimeout(() => { resolve('成功');
    }, 1000);
    //reject('错误');
    //throw 'err';
})
console.log(p);
const p2 = p.then((res) => {
    console.log("res==="+res);
}, (err) => {
    console.log("err==="+err);
    throw err;
});
// setTimeout(() => {
//     console.log(p2);
// }, 1000);
console.log(p2);
p2.then(()=>{
    console.log("继续执行2");
}).then(()=>{
    console.log("继续执行3");
}).catch((err) => {
    console.log("err==="+err);
});