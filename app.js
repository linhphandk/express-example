require('dotenv').config()
const express = require("express");
const { StatusCodes } = require("http-status-codes");
const cors = require('cors')
const mysql = require('mysql');
const Hasher = require('./hash/Hasher');
const pool  = mysql.createPool({
  connectionLimit : 10,
  host            : process.env.DATABESE_URL,
  port: 3306,
  insecureAuth : true,
  user            : process.env.USERNAME,
  password        : process.env.PASSWORD,
  database        : process.env.DATABASE
});


const app = express()
app.use(cors())
app.use(express.json());// instentiate the middleware, and we do it because usually the body is empty because the request data is saved somewhere else, spthis takes it and converts it into json and puts it into the body 
//defien endpoint
app.post('/user', async (req,res)=>{
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
    const hashedPassword = await new Hasher().hash(password)
    // in general with mysql we connect and need to disconent and pool manages the connection
    pool.query(
        "INSERT INTO User (username, password) VALUES (?,?)", //? means that we parmaterise the values (username nad password) so the ? are just placeholders
        // missing the hashing - Linh will add it later 😛 
        [username,hashedPassword],
        function (error, results, fields) { // here is the fuction where we return the new id
            if (error) throw error;
            res.status(StatusCodes.CREATED) // change the status code to 201, because by defalt we will get 200 and 201 for creating
            res.send({id:results.insertId})
        }
    )
})

app.post('/authenticate', async (req,res)=>{
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
    await pool.query(
        "Select id,password from User where username=?",
        [username],
        async function (error, results, fields) {
            // missing the token when returing the value! Linh will fix it
            if (error) throw error;

            if(results.length == 0){
                res.status(StatusCodes.FORBIDDEN)
                res.send()
                return
            }
            const isSamePassword = await new Hasher().compare(
                password,
                results[0].password
            )

            if(!isSamePassword || results.length == 0){
                res.status(StatusCodes.FORBIDDEN)
                res.send()
                return
            }else{
                console.log(11)
                res.status(StatusCodes.OK)
                res.send({id:results[0].id})
                return
            }
        }
    )
})

const PORT = 8000
app.listen(PORT,()=>{ // this is how we start the Express server
    console.log("started at "+PORT)
})