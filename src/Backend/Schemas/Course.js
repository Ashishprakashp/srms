import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  courseCode: { type: String, required: true, unique: true },
  courseTitle: { type: String, required: true },
  category: { type: String, required: true },
  credits: { type: Number, required: true },
  totalContactPeriods: { type: Number, required: true },
  branch: { type: String, required: true },
  semester: { type: String, required: true }, // Semester in which the course is offered
  studentsEnrolled: [
    {
      studentId: { type: String, required: true },
      confirmation: { type: Boolean, default: false },
      grade: { type: String, enum: ['O', 'A+', 'A', 'B+', 'B' ,'C' , 'RA/U'], default: null },
    }
  ]
});

const Course = mongoose.model('Course', courseSchema);
export default Course;
