const express = require("express");
const { StatusCodes } = require("http-status-codes");

const mysql = require('mysql');
const pool  = mysql.createPool({
  connectionLimit : 10,
  host            : 'db',
  user            : 'root',
  password        : 'example',
  database        : 'ExpressExample'
});


const app = express()
app.use(express.json());

app.post('/user', (req,res)=>{
    const {username, password} = req.body
    if(username === undefined){
        res.status(StatusCodes.UNPROCESSABLE_ENTITY)
        res.send("Missing param username")
        return
    }
    if(password === undefined){
        res.status(StatusCodes.UNPROCESSABLE_ENTITY)
        res.send("Missing param password")
        return
    }
    pool.query(
        "INSERT INTO User (username, password) VALUES (?,?)",
        [username,password],
        function (error, results, fields) {
            if (error) throw error;
            res.status(StatusCodes.CREATED)
            res.send({id:results.insertId})
        }
    )
})

app.get('/authenticate', (req,res)=>{
    const {username, password} = req.body
    if(username === undefined){
        res.status(StatusCodes.UNPROCESSABLE_ENTITY)
        res.send("Missing param username")
        return
    }
    if(password === undefined){
        res.status(StatusCodes.UNPROCESSABLE_ENTITY)
        res.send("Missing param password")
        return
    }
    pool.query(
        "Select (id) from User where username=? and password=?",
        [username,password],
        function (error, results, fields) {
            if (error) throw error;
            res.status(StatusCodes.OK)
            res.send({id:results.insertId})
        }
    )
})


app.listen(8000,()=>{
    console.log("starting")
})