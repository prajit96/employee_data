const express =require("express")
const {connection} =require("./db")
const {userRouter}=require("./routes/user.routes")
const {employeeRouter}=require("./routes/employee.routes")
require("dotenv").config()
const cors = require("cors")

const app = express()
app.use(cors())
app.use(express.json())
app.get("/",(req,res)=>{
res.send("This is Homepage ")
})
app.use("/users",userRouter)
app.use("/employee",employeeRouter)

app.listen(process.env.port,async()=>{
    try{
        await connection
        console.log("connect to the DB");
        console.log(`server is running at port ${process.env.port}`);
    }catch(err){
        console.log(err);
        console.log("Something Went Wrong!!!");
    }
})