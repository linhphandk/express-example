const express = require("express");
const { StatusCodes } = require("http-status-codes");

const mysql = require('mysql');
const pool  = mysql.createPool({
  connectionLimit : 10,
  host            : 'localhost',
  port: 3306,
  insecureAuth : true,
  user            : 'root',
  password        : 'rootroot',
  database        : 'ExpressExample'
});


const app = express()
app.use(express.json());// instentiate the middleware, and we do it because usually the body is empty because the request data is saved somewhere else, spthis takes it and converts it into json and puts it into the body 

//defien endpoint
app.post('/user', (req,res)=>{
    const {username, password} = req.body
    if(username === undefined){
        res.status(StatusCodes.UNPROCESSABLE_ENTITY) // in case we miss the username, it would crassh if we don't have this
        res.send("Missing param username")
        return
    }
    if(password === undefined){
        res.status(StatusCodes.UNPROCESSABLE_ENTITY)
        res.send("Missing param password")
        return
    }
    // in general with mysql we connect and need to disconent and pool manages the connection
    pool.query(
        "INSERT INTO User (username, password) VALUES (?,?)", //? means that we parmaterise the values (username nad password) so the ? are just placeholders
        // missing the hashing - Linh will add it later 😛 
        [username,password],
        function (error, results, fields) { // here is the fuction where we return the new id
            if (error) throw error;
            res.status(StatusCodes.CREATED) // change the status code to 201, because by defalt we will get 200 and 201 for creating
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
            // missing the token when returing the value! Linh will fix it
            if (error) throw error;
            res.status(StatusCodes.OK)
            res.send({id:results.insertId})
        }
    )
})


app.listen(8000,()=>{ // this is how we start the Express server
    console.log("starting")
})