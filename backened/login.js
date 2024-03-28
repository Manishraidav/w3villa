const express=require("express")
const cors=require("cors")
const body=require("body-parser")
const app=express()
const mongoose=require("mongoose")


mongoose.connect("mongodb://localhost:27017/manish")
const userSchema= new mongoose.Schema({
    firstname:String,
    lastname:String,
    email:String,
    password:String
})
const users = mongoose.model("user_data",userSchema)

app.use(cors())
app.use(body.json())

app.post("/",async (req,res)=>{
    res.send("ready")
    
    let user=new users()
    user.firstname=req.body.firstname
    user.lastname=req.body.lastname
    user.email=req.body.email
    user.password=req.body.password
    const doc= await user.save()


})


app.get("/",async(req,res)=>{
    const data_s=await users.find({})
    res.json(data_s)
})










app.listen(4000,()=>{
    console.log("server is live")
})


