const mongoose=require("mongoose")

const userSchema=new mongoose.Schema({
    first_name:{type:String,require:true},
    last_name:{type:String,require:true},
    email:{type:String,require:true},
    age:{type:Number,require:true},
    gender:{type:String,require:true}
},{
    versionKey:false,
    timestamps:true
})

const User=mongoose.model("user",userSchema)
module.exports=User