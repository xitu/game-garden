var express = require('express');
var router = express.Router();
var fs = require('fs');


/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('role', {
        title: '冒险岛聊天室'
    });
});

router.get('/getResources', function (req, res, next) {
    var imgs = [];

    function getOther() {
        var p = new Promise(function (resolve, reject) { //做一些异步操作
            fs.readdir('./public/images', function (err, files) {
                for (var i in files) {
                    if (files[i] !== 'role') {
                        imgs.push(files[i].split('.')[0])
                    }
                }
                resolve('场景资源');
            })
        });
        return p;
    }

    function getRole() {
        var p = new Promise(function (resolve, reject) { //做一些异步操作
            fs.readdir('./public/images/role', function (err, files) {
                for (var i in files) {
                    imgs.push('role/'+files[i].split('.')[0])
                }
                resolve('人物资源资源');
            })
        });
        return p;
    }

    Promise
        .all([getOther(), getRole()])
        .then(function (results) {      
            console.log(results);
            res.json({
                imgs
            });
        });
});

module.exports = router;