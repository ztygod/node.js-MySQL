const mysql = require("mysql")

//配置连接项
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'zty',
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

