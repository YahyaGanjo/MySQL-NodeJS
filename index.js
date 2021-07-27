const express = require("express")
const mysql = require("mysql")

const db = mysql.createConnection({
    host     : 'localhost',
    user     : 'hyfuser',
    password : 'hyfpassword',
    database : 'nodemysql'
})

db.connect((err) => {
    if (err) {
        throw err
    }
    console.log('MySQL connected ...')
})

const app = express();

app.get('/createdb', (req, res) => {
    let sql = 'CREATE DATABASE nodemysql'
    db.query(sql, (err, result) => {
        if (err) throw err
        console.log(result)
        res.send('Database created...')
    })
})
app.get('/createpoststable', (req, res) => {
    let sql = 'CREATE TABLE posts (id int AUTO_INCREMENT, title varchar(50), body varchar(50), PRIMARY KEY (id))'
    db.query(sql, (err, result) => {
        if (err) throw err
        console.log(result)
        res.send('Post table created...')
    })
})
app.get('/addpost1', (req, res) => {
    let post = {title: 'post1', body: 'this is the first post'}
    let sql = 'INSERT INTO posts SET ?'
    let query = db.query(sql, post, (err, result) => {
        if (err) throw err
        console.log(result)
        res.send('Post 1 added...')
    })
})
app.get('/addpost2', (req, res) => {
    let post = {title: 'post2', body: 'this is the second post'}
    let sql = 'INSERT INTO posts SET ?'
    db.query(sql, post, (err, result) => {
        if (err) throw err
        console.log(result)
        res.send('Post 2 added...')
    })
})
app.get('/getposts', (req, res) => {
    let sql = 'SELECT * FROM posts'
    db.query(sql, (err, result) => {
        if (err) throw err
        console.log(result)
        res.send('Posts fetched...')
    })
})
app.get('/getpost/:id', (req, res) => {
    let sql = `SELECT * FROM posts WHERE id = ${req.params.id}`
    db.query(sql, (err, result) => {
        if (err) throw err
        console.log(result)
        res.send('Post fetched...')
    })
})
app.get('/updatepost/:id', (req, res) => {
    let newTitle = 'Updated title'
    let sql = `UPDATE posts SET title = '${newTitle}' WHERE id = ${req.params.id}`
    db.query(sql, (err, result) => {
        if (err) throw err
        console.log(result)
        res.send('Post updated...')
    })
})
app.get('/deletepost/:id', (req, res) => {
    let newTitle = 'Updated title'
    let sql = `DELETE FROM posts WHERE id = ${req.params.id}`
    db.query(sql, (err, result) => {
        if (err) throw err
        console.log(result)
        res.send('Post deleted...')
    })
})

app.listen('3000', () => {
    console.log('server running on port 3000')
})