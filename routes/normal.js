import express from "express";
import { Getmentor } from "../controllers/mentor.js";
import { Getstudent } from "../controllers/student.js";


const router = express.Router();


//get all  data 
router.get("/", async (req, res) => {
  try {
    const Mentor = await Getmentor();
    const student= await Getstudent()
    res.status(200).json({ Mentor ,student});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
export const Display=router;
