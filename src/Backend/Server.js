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
  });
const Faculty = mongoose.model("Faculty",FacultySchema);

//API routes
app.get("/faculty",async(req,res)=>{
    const faculties = await Faculty.find();
    res.json(faculties);
});

app.post("/faculty",async(req,res)=>{
    try {
        const faculties = req.body.faculties;
        await Faculty.insertMany(faculties);
        res.status(200).send('Faculty details saved successfully');
      } catch (error) {
        res.status(500).send('Error saving faculty details: ' + error.message);
      }
});

//Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));