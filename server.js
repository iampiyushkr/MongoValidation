const express=require("express");
const connect = require("./src/db");
const app=express();
app.use(express.json());

const userControl=require("./src/controller/user.controller")
app.use("/users",userControl)


app.listen(1234,async ()=>{
    await connect()
    console.log("listining 1234")
})