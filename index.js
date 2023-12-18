import express from "express"
import dotenv from 'dotenv';
import { mentorsRouter } from "./routes/mentor.js";
import { studentsRouter } from "./routes/student.js";
import { Display } from "./routes/normal.js";

dotenv.config()
const Port= process.env.port

const app=express()

app.use(express.json());

app.use('/',Display)

app.use('/mentor',mentorsRouter)
app.use('/student',studentsRouter)

app.listen(Port, () => console.log(`Server listening on localhost:${Port}`));