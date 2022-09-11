const cors=require("cors")
const express=require("express")
const mongoose=require("mongoose")
const app=express();
const alert=require("alert")
const jwt=require("jsonwebtoken")
const twilio=require("twilio")("AC8dd6535d70098c10ffca5611bad4b020","4de6b095d500c6a935d708f3ce39a6b1")
const middelware=require("./middleware")
const path=require("path")
app.use(express.static(path.join(__dirname,'./build')))

// ---- SERVE APLICATION PATHS ---- //
app.use(express.json());
app.use(cors());
app.listen("1000",(req,res)=>{
    console.log("ok")
})
app.get("/",(req,res)=>{
    res.send("hello world")
})
mongoose.connect("mongodb://saiteja123:saiteja123.@ac-7y3dcxd-shard-00-00.4atajx5.mongodb.net:27017,ac-7y3dcxd-shard-00-01.4atajx5.mongodb.net:27017,ac-7y3dcxd-shard-00-02.4atajx5.mongodb.net:27017/?ssl=true&replicaSet=atlas-kblhsr-shard-0&authSource=admin&retryWrites=true&w=majority").then(()=>{
    console.log("connected")
}).catch((err) => console.log("not connceted"))
const schema=mongoose.Schema({
    "name":String,
    "phno":String,
    "gender":String,
    "email":String,
    "pass":String
})
const Customer=mongoose.model("customer",schema);

const poo=mongoose.Schema({
    "from":String,
    "to":String,
    "veh":String,
    "charge":String,
    "person":{
        type:mongoose.Schema.Types.ObjectId,
        ref:"customer"
    },
    "date":String
})
const post=mongoose.model("post",poo)
const boo=mongoose.Schema({
    "from":String,
    "to":String,
    "veh":String,
    "charge":String,
    "person":{
        type:mongoose.Schema.Types.ObjectId,
        ref:"customer"
    },
    "bookedby":{
        type:mongoose.Schema.Types.ObjectId,
        ref:"customer"
    },
    "date":String
})
const booked=mongoose.model("booked",boo)

app.get("/",async(req,res)=>{
    sendmessage();
    res.send("hi")
})
app.post("/creg",async(req,res)=>{
    const {name,email,pass,phno}=req.body;
    const use=new Customer({
        name,email,pass,phno
    })
    let exist=await Customer.findOne({email:email});
    if(exist){
        alert("user exist")
    }
    else{
       await  use.save();
        alert("user registered")
    }
    /*twilio.messages.create({
        body:"Account registered",
        to:phno,
        from:"+15138485928"
    })*/
})
app.post("/clogin",async(req,res)=>{
    const {email,pass}=req.body;
    let exist=await Customer.findOne({email:email});
    if(exist){
        if(exist.pass===pass){
            alert("logged in successfully")
            let payload={
                user:{
                    id:exist.id
                }
            }
            jwt.sign(payload,'jwtsecret',{expiresIn:3600000},
            (err,token)=>{
                if(!err){
                    return res.json(token)
                }
            }) 
            twilio.messages.create({
                body:"Account Logged in succesfully",
                to:exist.phno,
                from:"+15138485928"
            })
        }
        else{
            alert("wrong password")
        }
    }
    else{
        alert("user not exist")
    }
})
app.post("/cpost",async(req,res)=>{
    const {from,to,date,charge,veh,person}=req.body;
    const use=new post({
        from,to,veh,person,date,charge
    })
    await use.save();
})
app.post("/cbook",async(req,res)=>{
    const {from,to,person}=req.body;
    let exist=await post.find({from:from,to:to}).populate("person");
    return res.json(exist)
})
app.post("/click",async(req,res)=>{
    const {boo,id}=req.body;
    if(boo=="yes"){
        let exist=await post.findById(id).populate("person")
        const use=new myride({
            from:exist.from,
            to:exist.to,
            veh:exist.veh,
            price:exist.price,
            person:exist.person,
            date:exist.date
        })
        await use.save();
        await post.findByIdAndDelete(id);
    }
})
app.get("/profile",middelware,async(req,res)=>{
    let exist=await Customer.findById(req.user.id)
    return res.json(exist)
})

app.post("/booked",middelware,async(req,res)=>{
    const {from,to,veh,charge,person,date,bookedby}=req.body;
    const use=new booked({
        from,to,veh,charge,person,date,bookedby
    })
    await use.save();
    let exist=await booked.find();
    return res.json(exist)
})
app.post("/del",middelware,async(req,res)=>{
    const {id}=req.body;
    await post.findByIdAndDelete(id)
    let exist=await post.find();
    return res.json(exist)
})
app.get("/sbooked",middelware,async(req,res)=>{
    let exis=await booked.find({bookedby:req.user.id}).populate("person")
    let exist=await booked.find({"person._id":req.user.id})
    let exi=await Customer.findById(req.user.id);
    /*twilio.messages.create({
        body:"U have booked ride succesfully",
        to:exi.phno,
        from:"+15138485928"
    })*/
    return res.json(exis)
})
app.get("/sposted",middelware,async(req,res)=>{
    let exis=await booked.find({person:req.user.id}).populate("bookedby")
    let exist=await booked.find({"person._id":req.user.id})
    let exi=await Customer.findById(req.user.id);
    /*twilio.messages.create({
        body:"Ur ride request was accepted succesfully",
        to:exi.phno,
        from:"+15138485928"
    })*/
    return res.json(exis)
})

app.use('*',(request,response)=>{
    response.sendFile(path.join(__dirname,'./build/index.html'))
  })