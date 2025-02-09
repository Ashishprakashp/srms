import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import axios from 'axios';
import StudentGrades from './Schemas/StudentGrade.js';
import Student from './Schemas/StudentModel.js';
import Semester from './Schemas/Semester.js'
import enrollmentRoutes from "/home/ashish-prakash/Documents/pull2/src/Backend/EnrollmentRoutes/enrollment.js";
import Course from '/home/ashish-prakash/Documents/pull2/src/Backend/Schemas/Course.js';

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors({
    origin: ['http://localhost:3000'], // Modify to your frontend's URL
    methods: ['GET', 'POST', 'PUT'],
}));

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB Connected!"))
    .catch(err => console.log(err));



// Define Schema and model
const FacultySchema = new mongoose.Schema({
    userId: String,
    title: String,
    name: String,
    designation: String,
    pwd: String,
    reset: Number,
});

const StudentAccSchema = new mongoose.Schema({
  userId: String,
  name: String,
  branch: String,
  pwd: String,
  reset: Number,
});


const CourseSchema = new mongoose.Schema({
  type: String,
  course_code: String,
  course_title: String,
  category: String,
  L: Number, // Lecture hours
  T: Number, // Tutorial hours
  P: Number, // Practical hours
  total_contact_periods: Number,
  credits: Number
});

const SemesterSchema = new mongoose.Schema({
  semester: Number,
  courses: [CourseSchema] // Array of courses
});

const SemsSchema = new mongoose.Schema({
  branch: String,
  regulation: String,
  semesters: [SemesterSchema] // Array of semesters
});

const Sems = mongoose.model('Sems', SemsSchema);




//Schema to track student performance


const Faculty = mongoose.model("Faculty", FacultySchema);



const StudentAcc = mongoose.model("StudentAcc",StudentAccSchema);

// Password hashing and verification functions
const hashPassword = async (password) => {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
};

const verifyPassword = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
};

  const validatePassword = (password) => {
      const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      return regex.test(password);
  };

//post API routes
app.post("/faculty", async (req, res) => {
  try {
      const faculties = req.body.users;
      console.log("1");
      const existingFaculties = await Faculty.find({ userId: { $in: faculties.map(f => f.userId) } });
      console.log("2");
      const existingFacultyIds = existingFaculties.map(f => f.userId);
      console.log("3");
      const newFaculties = faculties.filter(f => !existingFacultyIds.includes(f.userId));
      console.log("4");
      if (newFaculties.length > 0) {
          await Faculty.insertMany(newFaculties);
          console.log("5");
      }

      res.status(200).json({
          message: newFaculties.length > 0 ? "New faculty details saved successfully" : "No new faculty added",
          newFaculties: newFaculties,
          existingFaculties: existingFaculties
      });
  } catch (error) {
      res.status(500).send("Error saving faculty details: " + error.message);
  }
});

//API routes for Student

app.post("/student", async (req, res) => {
  try {
    const student = req.body.student;
    console.log("Received student data:", student);  // Log the incoming data

    // Check if student already exists
    const existingRecord = await Student.find({ "personalInformation.register": student.register });
    console.log("Existing records found:", existingRecord);

    if (existingRecord.length > 0) {
      console.log("The student has already registered!");
      return res.status(400).json({ message: "Student data already exists!" });
    } else {
      console.log("The student is registering for the first time!");

      // Log the student object before creating it
      console.log("Creating student with data:", student);

      // Attempt to create the student document
      const newStudent = await Student.create(student);
      console.log("Student created successfully:", newStudent);

      return res.status(200).json({
        message: "Student data stored successfully!"
      });
    }
  } catch (error) {
    console.error("Error during student registration:", error);  // Log the error with more details

    // Handle validation or other errors
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ message: "Validation error", errors: validationErrors });
    }

    return res.status(500).send("Error saving student details: " + error.message);
  }
});



app.post("/student-acc",async(req,res) => {
try{
  const students = req.body.users;
  console.log("1");
  const existingStudents = await StudentAcc.find({ userId: { $in: students.map(s => s.userId) } });
      console.log("2");
      const existingStudentIds = existingStudents.map(s => s.userId);
      console.log("3");
      const newStudents = students.filter(s => !existingStudentIds.includes(s.userId));
      console.log(newStudents);
      console.log("4");
      if (newStudents.length > 0) {
          await StudentAcc.insertMany(newStudents);
          console.log("5");
      }

      res.status(200).json({
          message: newStudents.length > 0 ? "New faculty details saved successfully" : "No new faculty added",
          newStudents: newStudents,
          existingStudents: existingStudents
      });

}catch(error){
  return res.status(500).send("Error saving student details: " + error.message);
}
});

app.post("/semesters/enroll", async (req, res) => {
  try {
    console.log("1");
    const { enrollments } = req.body; // Extract enrollments from the request body
    console.log("2");
    if (!enrollments || enrollments.length === 0) {
      return res.status(400).json({ error: "No enrollments provided" });
    }
    console.log("3");
    for (const enrollment of enrollments) {
      const { studentId, courseCode, semester, branch, grade } = enrollment;
      console.log("4");
      if (!studentId || !courseCode || !semester || !branch) {
        return res.status(400).json({ error: "Missing required fields in enrollment" });
      }
      console.log("5");
      // Find course
      const course = await Course.findOne({ courseCode });
      console.log(courseCode);
      console.log("6");
      if (!course) {
        return res.status(404).json({ error: `Course ${courseCode} not found` });
      }
      console.log("7");
      // Check if student is already enrolled in the course
      const alreadyEnrolled = course.studentsEnrolled.some(
        (student) => student.studentId === studentId
      );
      console.log("8");
      if (alreadyEnrolled) {
        return res.status(400).json({ error: `Student ${studentId} is already enrolled in ${courseCode}` });
      }
      console.log("9");
      // Update Course model - Add student to the course
      course.studentsEnrolled.push({ studentId, grade: grade || null });
      console.log("10");
      await course.save();
      console.log("11");
      // Update StudentGrades model - Add course to the student's enrolled courses
      let student = await StudentGrades.findOne({ studentId });

      if (!student) {
        student = new StudentGrades({
          studentId,
          name: "Some Name",  // You may want to retrieve the student's name from somewhere (e.g., session or database)
          branch,
          enrolledCourses: [{ courseCode, semester, grade: grade || null }],
        });
      } else {
        student.enrolledCourses.push({ courseCode, semester, grade: grade || null });
      }

      await student.save();
    }

    res.json({ message: "All enrollments successful!" });
  } catch (error) {
    console.error("Enrollment error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/semesters/submit", async (req, res) => {
  try {
    const { dataToSubmit } = req.body;

    if (!dataToSubmit || dataToSubmit.length === 0) {
      return res.status(400).json({ error: "No data to submit" });
    }

    // Loop over each course and update the grade in both collections
    for (const { studentId, courseCode, grade } of dataToSubmit) {
      // Update Course collection
      const course = await Course.findOne({ courseCode });
      if (!course) {
        return res.status(404).json({ error: `Course with code ${courseCode} not found` });
      }

      // Find the student in the course and update the grade
      const studentIndex = course.studentsEnrolled.findIndex(
        (student) => student.studentId === studentId
      );
      if (studentIndex === -1) {
        return res.status(404).json({ error: `Student with ID ${studentId} not found in course ${courseCode}` });
      }

      course.studentsEnrolled[studentIndex].grade = grade;
      await course.save();

      // Update StudentGrades collection
      let studentGrades = await StudentGrades.findOne({ studentId });
      if (!studentGrades) {
        return res.status(404).json({ error: `Student with ID ${studentId} not found in StudentGrades` });
      }

      // Find the course in the student's enrolled courses and update the grade
      const enrolledCourseIndex = studentGrades.enrolledCourses.findIndex(
        (course) => course.courseCode === courseCode
      );
      if (enrolledCourseIndex === -1) {
        return res.status(404).json({ error: `Course with code ${courseCode} not found in student grades` });
      }

      studentGrades.enrolledCourses[enrolledCourseIndex].grade = grade;
      await studentGrades.save();
    }

    res.json({ message: "Grades updated successfully!" });
  } catch (error) {
    console.error("Error updating grades:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});



//put API routes
app.put("/faculty/resetPassword", async (req, res) => {
  const { userId, newPassword } = req.body;
  console.log("1");
  if (!userId || !newPassword) {
      return res.status(400).json({ message: "Faculty ID and new password are required." });
  }
  console.log("2");
  if (!validatePassword(newPassword)) {
      return res.status(400).json({ message: "Password does not meet complexity requirements." });
  }
  console.log("3");
  const faculty = await Faculty.findOne({ userId });
  console.log("4");
  if (!faculty) {
      return res.status(404).json({ message: "Faculty not found." });
  }
  console.log("5");
  const hashedPassword = await hashPassword(newPassword);
  faculty.pwd = hashedPassword;
  await faculty.save();
  console.log("6");
  res.status(200).json({ message: "Password reset successfully!" });
});

app.put("/faculty/resetPasswordOnce", async (req, res) => {
  const { userId, newPassword ,reset} = req.body;

  if (!userId || !newPassword) { 
      return res.status(400).json({ message: "Faculty ID and new password are required." });
  }

  if (!validatePassword(newPassword)) {
      return res.status(400).json({ message: "Password does not meet complexity requirements." });
  }

  const faculty = await Faculty.findOne({ userId });
  if (!faculty) {
      return res.status(404).json({ message: "Faculty not found." });
  }
  console.log(faculty);
  console.log(faculty.reset); 
  const hashedPassword = await hashPassword(newPassword);
  faculty.pwd = hashedPassword;
  faculty.reset= reset;
  await faculty.save();
  console.log(faculty.reset); 
  res.status(200).json({ message: "Password reset successfully!" });
});

app.put("/student/resetPassword", async (req, res) => {
  const { userId, newPassword } = req.body;
  console.log("1");
  if (!userId || !newPassword) {
      return res.status(400).json({ message: "Student ID and new password are required." });
  }
  console.log("2");
  if (!validatePassword(newPassword)) {
      return res.status(400).json({ message: "Password does not meet complexity requirements." });
  }
  console.log("3");
  const student = await StudentAcc.findOne({ userId });
  if (!student) {
      return res.status(404).json({ message: "Faculty not found." });
  }
  console.log("4");
  const hashedPassword = await hashPassword(newPassword);
  console.log("5");
  student.pwd = hashedPassword;
  console.log("6");
  await student.save();
  console.log("7");
  res.status(200).json({ message: "Password reset successfully!" });
});
app.put('/updateStudentGrades/:studentId', (req, res) => {
  const { studentId } = req.params;
  const updatedStudent = req.body;

  // Use the $set operator to update confirmation to true for all courses in enrolledCourses
  StudentGrades.updateOne(
    { studentId: studentId },
    {
      $set: {
        "enrolledCourses.$[].confirmation": true // Set confirmation to true for all courses
      }
    }
  )
    .then((result) => {
      res.status(200).json({ message: "Student grades confirmed successfully." });
    })
    .catch((err) => {
      res.status(500).json({ message: "Error updating student data." });
    });
});




//get API routes
app.get("/semesters/checkEnrollment", async (req, res) => {
  try {
    const { studentId, semester } = req.query;

    if (!studentId || !semester) {
      return res.status(400).json({ error: "Missing required query parameters" });
    }

    // Find all courses in the specified semester
    const courses = await Course.find({ semester });
    if (courses.length === 0) {
      return res.status(404).json({ error: "No courses found for this semester" });
    }

    // Check if the student is enrolled in any course for the given semester
    const alreadyEnrolled = courses.some(course =>
      course.studentsEnrolled.some(student => student.studentId === studentId)
    );

    if (alreadyEnrolled) {
      return res.status(200).json({ enrolled: true });
    } else {
      return res.status(200).json({ enrolled: false });
    }
  } catch (error) {
    console.error("Error checking enrollment:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get('/semesters/check-grade-status', async (req, res) => {
  const { studentId, semesterNo, branch } = req.query;

  if (!studentId || !semesterNo || !branch) {
    return res.status(400).json({ message: 'Missing parameters' });
  }

  try {
    // Find student grades for the given semester and branch
    const studentGrades = await StudentGrades.findOne({
      studentId,
      'enrolledCourses.semester': semesterNo,
      'enrolledCourses.courseCode': { $exists: true }
    });

    if (!studentGrades) {
      return res.status(404).json({ message: 'Student not found or no courses found for this semester.' });
    }

    // Check if grades are submitted for each course
    const courseStatuses = studentGrades.enrolledCourses.map(course => ({
      courseCode: course.courseCode,
      grade: course.grade,
      gradeSubmitted: course.grade !== null && course.grade !== undefined,
      message: course.grade !== null && course.grade !== undefined 
        ? `Grade already submitted for course ${course.courseCode}.`
        : `Grade not submitted for course ${course.courseCode}.`
    }));

    return res.json({ courseStatuses });
  } catch (error) {
    console.error("Error checking grade status:", error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

app.get("/semesters/fetch", async (req, res) => {
  try {  
    const { branch, semester } = req.query;

    if (!branch || !semester) {
      return res.status(400).json({ error: "Missing branch or semester" });
    }

    // Fetch semester data from MongoDB
    const semesterData = await Semester.findOne({
      branch,
      semesterNumber: semester,
    });
    console.log(semesterData);
    if (!semesterData) {
      return res.status(404).json({ error: "No courses found for this semester" });
    }

    res.json(semesterData.courses); // Return courses array
  } catch (error) {
    console.error("Error fetching courses:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/faculty/fetch", async (req, res) => {
    try {
        console.log("1");
        const { userId, userName } = req.query;
        console.log("2");
        let query = {};
        if (userId) query.userId = userId;
        
        else if (userName) query.name = userName;
        console.log("3");
        const faculties = await Faculty.find(query);
        console.log("4");
        console.log(faculties);
        res.json(faculties);
    } catch (error) {
        res.status(500).send("Error fetching faculty details: " + error.message);
    }
});

app.get("/student",async(req,res) => {
  try{
    const {studentId} = req.query;
    console.log("1");
    const student = await Student.findOne({"personalInformation.register": studentId});
    console.log("2");
    if(!student){
      return res.status(404).json({ message: "Student not found." });
    }
    return res.json(student);
  }catch(error){
    console.log(error.message);
  }
});

app.get("/student/fetch", async (req, res) => {
  try {
      const { userId, userName } = req.query;
      let query = {};
      if (userId) query.userId = userId;
      else if (userName) query.name = userName;

      const students = await StudentAcc.findOne(query);
      console.log(students);
      res.json(students);
  } catch (error) {
      res.status(500).send("Error fetching faculty details: " + error.message);
  }
});

app.get("/semesters/fetch", async (req, res) => {
  try {
    const { branch, semester } = req.query;
    console.log("1");
    if (!branch || !semester) {
      return res.status(400).json({ message: "Branch and semester are required" });
    }
    console.log("2");
    const semesterNumber = parseInt(semester); // Convert to number
    console.log("3");
    // Assuming you're using Mongoose
    const result = await Sems.findOne(
      { branch }, 
      { semesters: { $elemMatch: { semester: semesterNumber } } } // Get only the matching semester
    );
    console.log("4");
    if (!result || !result.semesters.length) {
      return res.status(404).json({ message: "No courses found for the given branch and semester" });
    }

    res.status(200).json(result.semesters[0].courses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/studentgrades", async (req, res) => {
  try {
    const branch = req.query.branch;
    // Fetch student grades
    const students = await StudentGrades.find({branch: branch});

    // Filter students where all enrolled courses have confirmation: false
    const filteredStudents = students.filter((student) =>
      student.enrolledCourses.every((course) => course.confirmation === false)
    );

    // Fetch student names from studentaccs collection
    const studentIds = filteredStudents.map((s) => s.studentId);
    const studentAccs = await StudentAcc.find({ userId: { $in: studentIds } });

    // Merge student names with grades
    const response = filteredStudents.map((student) => {
      const studentInfo = studentAccs.find((s) => s.userId === student.studentId);
      return {
        studentId: student.studentId,
        name: studentInfo ? studentInfo.name : "Unknown", // If no match found
        enrolledCourses: student.enrolledCourses,
      };
    });

    res.json(response);
  } catch (error) {
    console.error("Error fetching student grades:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});



// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
