import express from "express";
import { Getstudent, addstudent, getPreviousMentorForStudent, getStudentsWithoutMentor } from "../controllers/student.js";

const router = express.Router();

//all students 

router.get("/all", async (req, res) => {
  try {
    const students = await Getstudent();
    res.status(200).json({ data: students });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//add student

router.post("/add", async (req, res) => {
  try {
    if (Object.keys(req.body).length <= 0) {
      return res.status(400).json({ error: "Check request body" });
    }
    const data = { ...req.body };
    const newstudent = await addstudent(data);
    if (!newstudent.acknowledged) {
      return res.status(400).json({ error: "error in adding data" });
    }
    res.status(201).json({ data: newstudent });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal server error", erorrMessage: error });
  }
});

// students without mentor
router.get("/nomentor", async (req, res) => {
    try {
      const students = await getStudentsWithoutMentor();
      res.status(200).json({ data: students });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  // Get Previous Mentor for a Student
router.get("/:name", async (req, res) => {
    try {
      const { name } = req.params;
      const data = await getPreviousMentorForStudent(name);
      console.log(data)

      res.status(200).json({ data: data.prevmentor });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
});

// Assign mentor to a student
router.post("/assign-mentor", async (req, res) => {
    try {
        const { studname, mentor } = req.body;

        const student = await getStudentsWithoutMentor(studname);
        if (!student) {
            return res.status(404).json({ error: "Student not found" });
        }

        const result = await assignMentorToStudent(studname, mentor);

        if (result.modifiedCount > 0) {
            res.status(200).json({ success: true, message: "Mentor assigned successfully" });
        } else {
            res.status(500).json({ error: "Failed to assign mentor" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});



export const studentsRouter = router; 