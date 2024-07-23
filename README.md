首先最重要的就是连接MySQL了，不连接的话无法实现数据长久存储，此外查询数据，插入数据效率也很高，也能够很好保证数据的安全性与完整性。不说了，直接开整。

## 开始准备

连接MySQL需要我们有个MySQL，由于我已经下载了，所以这部分略过。。。
我们来到SQLyog，新建一个数据库，在新增一个表，用于演示，这里我们需要记住我们的建立数据库的用户和密码，之后会用于node.js的连接操作
![屏幕截图 2024-07-23 113038.png](https://cdn.nlark.com/yuque/0/2024/png/40660095/1721705427762-328880dc-dd34-4509-bbec-265afed2a917.png#averageHue=%23fdfdfd&clientId=u0468f7fe-900b-4&from=ui&id=u70c75f6d&originHeight=1297&originWidth=2558&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=200521&status=done&style=none&taskId=ud0dcb4dc-ad0e-4d40-b1ca-ff98f4890a9&title=)

## node.js部分

我们先初始化一个项目

```
npm init -y
```

再安装MySQL和express（用于构建服务端）依赖包

```
npm i mysql
npm i express
```

#### 配置MySQL

新建一个dbconfig.js文件，用于配置我们的MySQL。
关于连接操作，我们既可以调用显示方法connect，也可以直接查询来隐式进行连接。

```javascript
const mysql = require("mysql")

//配置连接项
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '******',
  port: 3306,
  database: 'mysql-test'
})

//执行连接操作,但是也可以通过调用查询来隐式建立连接
// connection.connect((err) => {
//     if(err){
//         console.log("数据库连接失败")
//     }else{
//         console.log("数据库连接成功")
//     }
// })

module.exports = {
  db: db
}
```

#### 编写API

我们建立一个api的文件夹，在里面新建一个user.js的文件，在里面编写获取用户信息，插入用户信息的内容。

```javascript
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
```

#### 构建服务端

我们这里是利用express构建的服务端，编写get，post接口，同时监听3000端口。

#### postman验证

我们可以node .\index.js启动服务，再在postman中验证接口是否有效。
![屏幕截图 2024-07-23 133800.png](https://cdn.nlark.com/yuque/0/2024/png/40660095/1721713057539-77318fe6-a698-483b-a218-20f2ca33321c.png#averageHue=%23fbfbfa&clientId=u0468f7fe-900b-4&from=ui&id=u7acf5285&originHeight=1066&originWidth=1935&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=166332&status=done&style=none&taskId=ue20c4dff-9a79-4f9f-8071-ea25cde2c81&title=)
![屏幕截图 2024-07-23 133800.png](https://cdn.nlark.com/yuque/0/2024/png/40660095/1721713067466-55c8e8ce-7c33-44a7-ad07-580276027379.png#averageHue=%23fbfbfa&clientId=u0468f7fe-900b-4&from=ui&id=uccc49472&originHeight=1066&originWidth=1935&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=166332&status=done&style=none&taskId=u2a3b781a-0bbf-4968-a3d1-05cb63fc5cd&title=)
大功告成