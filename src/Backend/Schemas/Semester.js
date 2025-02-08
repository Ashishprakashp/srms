import mongoose from "mongoose";

const SemesterSchema = new mongoose.Schema({
  regulation: {type:String, required: true},
  branch: { type: String, required: true },
  semesterNumber: { type: String, required: true },
  courses: [
    {
      courseCode: { type: String, required: true },
      courseTitle: { type: String, required: true },
      credits: { type: Number, required: true },
    }
  ]
});

const Semester = mongoose.model('Semester', SemesterSchema);
export default Semester;
