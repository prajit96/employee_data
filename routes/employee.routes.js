const express=require("express")
const {EmployeeModel}=require("../models/employee.model")
const {auth}=require("../middlewares/auth.middleware")

const employeeRouter=express.Router()

employeeRouter.use(auth)
employeeRouter.post("/create",async(req,res)=>{
    try{
        const employee = new EmployeeModel(req.body)
        await employee.save()
        res.json({msg:"New Employee has been added",employee:req.body})
    }catch(err){
        res.json({error:err.message})
    }
})


employeeRouter.get("/",async(req,res)=>{
    try{
        const employees=await EmployeeModel.find({userID:req.body.userID})
        res.send(employees)
    }catch(err){
        res.json({error:err.message})
    }
})

employeeRouter.patch("/update/:employeeID",async(req,res)=>{
    const userIDinUserDoc=req.body.userID
    const {employeeID}=req.params
    try{
        const employee=await EmployeeModel.findOne({_id:employeeID})
        const userIDinNoteDoc=employee.userID
        if(userIDinUserDoc===userIDinNoteDoc){
            await EmployeeModel.findByIdAndUpdate({_id:employeeID},req.body)
            res.json({msg:`${employee.firstName} has been updated`})
        } else {
            res.join({msg:"Not Authorized!!"})
        }
    }catch(err){
        res.json({error:err})
    }
})

employeeRouter.delete("/delete/:employeeID",async(req,res)=>{
    const userIDinUserDoc=req.body.userID
    const {employeeID}=req.params
    try{
        const employee=await EmployeeModel.findOne({_id:employeeID})
        const userIDinNoteDoc=employee.userID
        if(userIDinUserDoc===userIDinNoteDoc){
            await EmployeeModel.findByIdAndDelete({_id:employeeID})
            res.json({msg:`${employee.firstName} has been deleted`})
        } else {
            res.join({msg:"Not Authorized!!"})
        }
    }catch(err){
        res.json({error:err})
    }
})

module.exports={
    employeeRouter
}