import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI,{ useNewUrlParser: true, useUnifiedTopology: true })
.then(console.log("MongoDB Connected!"))
.catch(err => console.log(err));

//Define Schema and model
const FacultySchema = new mongoose.Schema({facultyId: String,
    title: String,
    name: String,
    designation: String,
    pwd:String,
    reset:Number
  });
const Faculty = mongoose.model("Faculty",FacultySchema);

//API routes
app.get("/faculty", async (req, res) => {
  try {
    const { facultyId, facultyName } = req.query;

    let query = {};
    
    if (facultyId) query.facultyId = facultyId;
    else if(facultyName)query.name = facultyName;

    const faculties = await Faculty.find(query);
    res.json(faculties);
  } catch (error) {
    res.status(500).send("Error fetching faculty details: " + error.message);
  }
});


app.put("/faculty/resetPassword", async (req, res) => {
  const { facultyId, newPassword } = req.body;  // Extract from body

  if (!facultyId || !newPassword) {
      return res.status(400).json({ message: "Faculty ID and new password are required." });
  }

  const faculty = await Faculty.findOne({ facultyId });
  if (!faculty) {
      return res.status(404).json({ message: "Faculty not found." });
  }

  faculty.pwd = newPassword;
  await faculty.save();

  res.status(200).json({ message: "Password reset successfully!" });
});




app.post("/faculty", async (req, res) => {
  try {
      const faculties = req.body.faculties;

      // Get the list of existing faculty records from the database
      const existingFaculties = await Faculty.find({ facultyId: { $in: faculties.map(f => f.facultyId) } });

      // Extract faculty IDs that already exist
      const existingFacultyIds = existingFaculties.map(f => f.facultyId);

      // Filter out faculties that already exist
      const newFaculties = faculties.filter(f => !existingFacultyIds.includes(f.facultyId));

      // Insert only new faculties
      if (newFaculties.length > 0) {
          await Faculty.insertMany(newFaculties);
      }

      res.status(200).json({
          message: newFaculties.length > 0 ? "New faculty details saved successfully" : "No new faculty added, all records already exist",
          newFaculties: newFaculties, // Faculties that were inserted
          existingFaculties: existingFaculties // Faculties that were already present
      });

  } catch (error) {
      res.status(500).send("Error saving faculty details: " + error.message);
  }
});


//Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));