const { db } = require('../dbconfig')

//得到全部用户信息
exports.getAll = function () {
    return new Promise((reslove, reject) => {
        try {
            db.query(`SELECT * FROM test;`, (err, results) => {
                if (err) {
                    reject("获取全部用户信息失败")
                } else {
                    reslove(results)
                }
            })
        } catch (error) {
            reject("获取全部用户信息异常")
        }
    })
}
//根据用户名得到用户信息
exports.getUserInfo = function (name) {
    return new Promise((reslove, reject) => {
        try {
            db.query(`select * from test where name = "${name}";`, (err, results) => {
                if (err) {
                    reject(`获取 ${name} 信息失败`)
                } else {
                    reslove(results)
                }
            })
        } catch (error) {
            reject(`获取 ${name} 用户信息异常`)
        }
    })
}
//插入用户信息
exports.insertUserInfo = function (name, age) {
    return new Promise((reslove, reject) => {
        try {
            db.query(`insert into test (name,age) values ("${name}","${age}");`, (err, results) => {
                if (err) {
                    reject(`插入数据${name}与${age}失败`)
                } else {
                    reslove(results)
                }
            })
        } catch (error) {
            reject(`插入数据${name}与${age}异常`)
        }
    })
}
