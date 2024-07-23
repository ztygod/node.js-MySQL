const { getAll, getUserInfo, insertUserInfo } = require('./api/user')
const express = require('express')
const app = express()

app.get('/getinfo/all', async (req, res) => {
    try {
        //const sql = `SELECT * FROM test;`//搜索test表所有数据
        const result = await getAll()//执行sql语句

        res.send({
            result,
            code: 200
        })
    } catch (error) {
        console.error('Error executing query:', error)
        res.status(500).send('Internal Server Error')
    }
})

app.get('/getinfo/za', async (req, res) => {
    try {
        const result = await getUserInfo('za')

        res.send({
            result,
            code: 200
        })
    } catch (error) {
        console.error('Error executing query:', error)
        res.status(500).send('Internal Server Error')
    }
})
app.post('/insertUser', async (req, res) => {
    try {
        const result = await insertUserInfo('zzz', 19)

        res.send({
            result,
            code: 200
        })
    } catch (error) {
        console.error('Error executing query:', error)
        res.status(500).send('Internal Server Error')
    }
})


app.listen(3000, () => {
    console.log("服务器已经启动")
})