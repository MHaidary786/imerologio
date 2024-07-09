const express = require("express");
const cors = require("cors")
const db = require("./config/connection")
const journalRouter = require("./routes/journalRoute")
const userRouter = require("./routes/userRoute")
require('dotenv').config();




const app = express();

app.use(express.json());
 
app.use(cors({
    origin: '*',
  }));
  

app.use("/journal", journalRouter)
app.use("/user", userRouter)



app.listen(process.env.PORT, ()=> {
    console.log(`Server is running on: http://localhost:${process.env.PORT}`)
})