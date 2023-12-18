import express from "express";
import { Getmentor, addmentor, getStudentsForMentor } from "../controllers/mentor.js";

const router = express.Router();

//all mentors 

router.get("/all", async (req, res) => {
  try {
    const mentors = await Getmentor();
    res.status(200).json({ data: mentors });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//add mentor

router.post("/add", async (req, res) => {
  try {
    if (Object.keys(req.body).length <= 0) {
      return res.status(400).json({ error: "Check request body" });
    }
    const data = { ...req.body,  };
    const newmentor = await addmentor(data);
    if (!newmentor.acknowledged) {
      return res.status(400).json({ error: "error in adding data" });
    }
    res.status(201).json({ data: newmentor });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal server error", erorrMessage: error });
  }
});

//
// router.get("/customer/:customerName", async (req, res) => {
//     try {
//         const { customerName } = req.params;
//         const customerData = await GetmentorsByCustomer(customerName);
//         res.status(200).json({ data: customerData });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// });

//mentors students
router.get("/:name", async (req, res) => {
    try {
      const { name } = req.params;
      const data = await getStudentsForMentor(name);
      res.status(200).json({ data: data[0].students });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
});

export const mentorsRouter = router; 