import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

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
    facultyId: String,
    title: String,
    name: String,
    designation: String,
    pwd: String,
    reset: Number,
});

// const StudentSchema = new mongoose.Schema({
//     personalInformation: {
//       name: { type: String, required: true },
//       register: { type: String, required: true },
//       dob: { type: Date, required: true },
//       sex: { type: String, enum: ['M', 'F'], required: true },
//       blood: { type: String, enum: ['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'], required: true },
//       community: { type: String, enum: ['OC', 'BC', 'MBC', 'SC', 'ST'], required: true },
//       cutoff: { type: Number, min: 0, max: 100, required: true },
//       splcategory: { type: String, enum: ['None', 'Ph', 'Sports', 'Ex-Service man', 'NRI', 'Other States', 'Any Other'], required: true },
//       scholarship: { type: String },
//       volunteer: { type: String, enum: ['None', 'NSS', 'NSO', 'YRC'] },
//       contact: { type: String, required: true },
//       mail: { type: String, required: true },
//       fa: { type: String, default: 'None' },
//       passportPhoto: { type: String },
//     },
  
//     familyInformation: {
//       fatherName: { type: String, required: true },
//       fatherOcc: { type: String, required: true },
//       fatherInc: { type: Number, required: true },
//       motherName: { type: String, required: true },
//       motherOcc: { type: String, required: true },
//       motherInc: { type: Number, required: true },
//       parentAddr: { type: String, required: true },
//       parentContact: { type: String, required: true },
//       parentMail: { type: String, required: true },
//       guardianAddr: { type: String, required: true },
//       guardianContact: { type: String, required: true },
//       guardianMail: { type: String, required: true },
//     },
  
//     education: {
//       ug: { type: String, enum: ['BE', 'BTech', 'Bsc', 'BCA'], required: true },
//       ugCollege: { type: String, required: true },
//       ugYear: { type: Number, required: true },
//       ugPercentage: { type: Number, required: true },
//       ugProvisionalCertificate: { type: String, required: true },
//       xiiBoard: { type: String, enum: ['cbse', 'state-board', 'icse', 'others'], required: true },
//       xiiSchool: { type: String, required: true },
//       xiiYear: { type: Number, required: true },
//       xiiPercentage: { type: Number, required: true },
//       xiiMarksheet: { type: String, required: true },
//       xBoard: { type: String, enum: ['cbse', 'state-board', 'icse', 'others'], required: true },
//       xSchool: { type: String, required: true },
//       xYear: { type: Number, required: true },
//       xPercentage: { type: Number, required: true },
//       xMarksheet: { type: String, required: true },
//     },
  
//     entranceAndWorkExperience: {
//       entrance: { type: String, enum: ['TANCET', 'GATE'], required: true },
//       entranceRegister: { type: String, required: true },
//       entranceScore: { type: Number, required: true },
//       entranceYear: { type: Number, required: true },
//       scorecard: { type: String },
//       workExperience: [{
//         employerName: { type: String, required: true },
//         role: { type: String, required: true },
//         expYears: { type: Number, required: true },
//         certificate: { type: String },
//       }],
//     },
  
//   }, { timestamps: true });

const StudentSchema = new mongoose.Schema({
    personalInformation: {
      name: { type: String, default: '' },
      register: { type: String, default: '' },
      dob: { type: Date, default: null },
      sex: { type: String, enum: ['M', 'F'], default: '' },
      blood: { type: String, enum: ['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'], default: '' },
      community: { type: String, enum: ['OC', 'BC', 'MBC', 'SC', 'ST'], default: '' },
      cutoff: { type: Number, min: 0, max: 100, default: null },
      splcategory: { type: String, enum: ['None', 'Ph', 'Sports', 'Ex-Service man', 'NRI', 'Other States', 'Any Other'], default: 'None' },
      scholarship: { type: String, default: '' },
      volunteer: { type: String, enum: ['None', 'NSS', 'NSO', 'YRC'], default: 'None' },
      contact: { type: String, default: '' },
      mail: { type: String, default: '' },
      fa: { type: String, default: 'None' },
      passportPhoto: { type: String, default: '' },
    },
  
    familyInformation: {
      fatherName: { type: String, default: '' },
      fatherOcc: { type: String, default: '' },
      fatherInc: { type: Number, default: null },
      motherName: { type: String, default: '' },
      motherOcc: { type: String, default: '' },
      motherInc: { type: Number, default: null },
      parentAddr: { type: String, default: '' },
      parentContact: { type: String, default: '' },
      parentMail: { type: String, default: '' },
      guardianAddr: { type: String, default: '' },
      guardianContact: { type: String, default: '' },
      guardianMail: { type: String, default: '' },
    },
  
    education: {
      ug: { type: String, enum: ['BE', 'BTech', 'Bsc', 'BCA'], default: '' },
      ugCollege: { type: String, default: '' },
      ugYear: { type: Number, default: null },
      ugPercentage: { type: Number, default: null },
      ugProvisionalCertificate: { type: String, default: '' },
      xiiBoard: { type: String, enum: ['cbse', 'state-board', 'icse', 'others'], default: '' },
      xiiSchool: { type: String, default: '' },
      xiiYear: { type: Number, default: null },
      xiiPercentage: { type: Number, default: null },
      xiiMarksheet: { type: String, default: '' },
      xBoard: { type: String, enum: ['cbse', 'state-board', 'icse', 'others'], default: '' },
      xSchool: { type: String, default: '' },
      xYear: { type: Number, default: null },
      xPercentage: { type: Number, default: null },
      xMarksheet: { type: String, default: '' },
    },
  
    entranceAndWorkExperience: {
      entrance: { type: String, enum: ['TANCET', 'GATE'], default: '' },
      entranceRegister: { type: String, default: '' },
      entranceScore: { type: Number, default: null },
      entranceYear: { type: Number, default: null },
      scorecard: { type: String, default: '' },
      workExperience: [{
        employerName: { type: String, default: '' },
        role: { type: String, default: '' },
        expYears: { type: Number, default: null },
        certificate: { type: String, default: '' },
      }],
    },
  
  }, { timestamps: true });
  

const Faculty = mongoose.model("Faculty", FacultySchema);

const Student = mongoose.model("Student", StudentSchema);

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

// API routes for  faculty
app.get("/faculty", async (req, res) => {
    try {
        const { facultyId, facultyName } = req.query;
        let query = {};
        if (facultyId) query.facultyId = facultyId;
        else if (facultyName) query.name = facultyName;

        const faculties = await Faculty.find(query);
        res.json(faculties);
    } catch (error) {
        res.status(500).send("Error fetching faculty details: " + error.message);
    }
});

app.put("/faculty/resetPassword", async (req, res) => {
    const { facultyId, newPassword } = req.body;

    if (!facultyId || !newPassword) {
        return res.status(400).json({ message: "Faculty ID and new password are required." });
    }

    if (!validatePassword(newPassword)) {
        return res.status(400).json({ message: "Password does not meet complexity requirements." });
    }

    const faculty = await Faculty.findOne({ facultyId });
    if (!faculty) {
        return res.status(404).json({ message: "Faculty not found." });
    }

    const hashedPassword = await hashPassword(newPassword);
    faculty.pwd = hashedPassword;
    await faculty.save();

    res.status(200).json({ message: "Password reset successfully!" });
});

app.put("/faculty/resetPasswordOnce", async (req, res) => {
    const { facultyId, newPassword ,reset} = req.body;

    if (!facultyId || !newPassword) {
        return res.status(400).json({ message: "Faculty ID and new password are required." });
    }

    if (!validatePassword(newPassword)) {
        return res.status(400).json({ message: "Password does not meet complexity requirements." });
    }

    const faculty = await Faculty.findOne({ facultyId });
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

app.post("/faculty", async (req, res) => {
    try {
        const faculties = req.body.faculties;

        const existingFaculties = await Faculty.find({ facultyId: { $in: faculties.map(f => f.facultyId) } });
        const existingFacultyIds = existingFaculties.map(f => f.facultyId);
        const newFaculties = faculties.filter(f => !existingFacultyIds.includes(f.facultyId));

        if (newFaculties.length > 0) {
            await Faculty.insertMany(newFaculties);
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
  

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
