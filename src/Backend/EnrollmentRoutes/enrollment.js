import express from "express";
import Course from "/home/ashish-prakash/Documents/pull2/src/Backend/Schemas/Course.js";
import StudentGrades from "/home/ashish-prakash/Documents/pull2/src/Backend/Schemas/StudentGrades.js";

const router = express.Router();

// API to enroll a student in a course
router.post("/enroll", async (req, res) => {
  try {
    const { studentId, name, branch, courseCode, semester } = req.body;

    if (!studentId || !name || !branch || !courseCode || !semester) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Find course
    const course = await Course.findOne({ courseCode });
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    // Check if student is already enrolled in the course
    const alreadyEnrolled = course.studentsEnrolled.some(
      (student) => student.studentId === studentId
    );

    if (alreadyEnrolled) {
      return res.status(400).json({ error: "Student already enrolled" });
    }

    // Update Course model - Add student to the course
    course.studentsEnrolled.push({ studentId, grade: null });
    await course.save();

    // Update StudentGrades model - Add course to the student's enrolled courses
    let student = await StudentGrades.findOne({ studentId });

    if (!student) {
      student = new StudentGrades({
        studentId,
        name,
        branch,
        enrolledCourses: [{ courseCode, semester, grade: null }],
      });
    } else {
      student.enrolledCourses.push({ courseCode, semester, grade: null });
    }

    await student.save();

    res.json({ message: "Enrollment successful!" });
  } catch (error) {
    console.error("Enrollment error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
