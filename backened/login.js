const express=require("express")
const cors=require("cors")
const body=require("body-parser")
const app=express()
const mongoose=require("mongoose")

const dataSchema=new mongoose.Schema({
    data:String,
    data_id:String,
    data_tag:String,
    unique_user:String
})

const listdata=mongoose.model("datalist",dataSchema)


mongoose.connect("mongodb://localhost:27017/manish")
const userSchema= new mongoose.Schema({
    firstname:String,
    lastname:String,
    email:String,
    password:String,
    
})
const users = mongoose.model("user_data",userSchema)

app.use(cors())
app.use(body.json())

app.post("/",async (req,res)=>{
    
    
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


app.post("/data",async (req,res)=>{
    
    res.send(req.body)
    const usernewmodel =  new listdata();
    usernewmodel.data=req.body.data
    usernewmodel.data_id=req.body.data_id
    usernewmodel.data_tag=req.body.data_tag
    usernewmodel.unique_user=req.body.unique_user    
    await usernewmodel.save()
   
    
    
    })

 

app.get("/data" ,async(req,res)=>{
    const basedata=await listdata.find()
    res.json(basedata)

})    

app.post("/deletedata",async (req,res)=>{
    
    await listdata.deleteOne({data_id:req.body.id})
        
})

app.post("/change_data" ,async(req,res)=>{
    await listdata.updateOne({data_id:req.body.id},{$set:{ data:req.body.edit,data_tag:"hide" }})
    
    

}) 



app.post("/fetchdata",async (req,res)=>{
    
    const alldata= await listdata.find({unique_user:req.body.email})
    res.send(alldata)
   
    
})




        
  










app.listen(4000,()=>{
    console.log("server is live")
})


