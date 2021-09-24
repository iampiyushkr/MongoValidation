const express=require("express")
const User = require("../model/user.model")
const router=express.Router()
const {body,validationResult}=require("express-validator")

router.post("",
    body("first_name").isLength({min:5}).withMessage("First name is required"),
    body("last_name").isLength({min:5}).withMessage("First name is required"),
    body("age").custom(value=>{  
        if(value<18) throw new Error("age is required and should be greater then 18");
        return true
    }),
//    body("email")
//    .not()
//    .isEmpty()
//    .withMessage("Email is required")
//    .isEmail()
//    .withMessage("Email has to be valid email address"),
   
    body("email").custom(value=>{
    const filter = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          if(!value.trim().length){
             throw new Error("Email is required");

          }else if(!filter.test(value)){
              throw new Error("Email ha to be a valid email address")
          }
          return true;
      }),
      body("gender").custom(value=>{
        const filter=["male","female","other"]

        if(!value.trim().length){
            throw new Error("Gender is required");

         }else if(value!="male"&&value!="female"){
             throw new Error("Enter Valid gender")
         }
         return true;

      }),



    async(req,res)=>{
        const errors=validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()})
        }
    const user=await User.create(req.body)
    
    res.status(201).send(user)
})

module.exports=router;

