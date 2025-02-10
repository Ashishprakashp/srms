import { useState } from "react";
import { jsPDF } from "jspdf"; // Import jsPDF
import axios from 'axios'; // Import axios

import AdminTitleBar from "./AdminTitleBar";

export default function AdminDashboard({ services }) {
  const [studentId, setStudentId] = useState("");
  const [studentData, setStudentData] = useState(null);
  const [gradesData, setGradesData] = useState(null);
  const [error, setError] = useState("");

  const handleFetchStudent = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors
  
    try {
      // Fetch student data
      const studentResponse = await axios.get(`http://localhost:5000/student?studentId=${studentId}`);
      
      // Fetch student grades
      const gradesResponse = await axios.get(`http://localhost:5000/student-grades/${studentId}`);
      
      // Set the data into separate state variables
      setStudentData(studentResponse.data);
      setGradesData(gradesResponse.data);
  
      console.log(studentResponse.data); // Log the student data
      console.log(gradesResponse.data); // Log the grades data
  
    } catch (err) {
      setError(err.response ? err.response.data.message : err.message);
      setStudentData(null);
      setGradesData(null);
    }
  };

  function generatePDF() {
    if (!studentData || !gradesData) {
      console.log("No student or grades data found.");
      return;
    }

    const { personalInformation , education} = studentData;
    const { enrolledCourses } = gradesData;

    // Check if enrolledCourses exist
    if (!enrolledCourses || enrolledCourses.length === 0) {
        console.log("No enrolled courses found.");
        return;
    }

    // Initialize PDF document
    const doc = new jsPDF();

    let x=10;
    let y=20;
    // Add personal information to the first page
    doc.setFontSize(12);
    doc.text("Personal Information", x, y=y+10);
    doc.text(`Name: ${personalInformation.name}`, x, y=y+10);
    doc.text(`Register No: ${personalInformation.register}`, x, y=y+10);
    doc.text(`Date of Birth: ${personalInformation.dob.split("T")[0]}`, x, y=y+10);
    doc.text(`Sex: ${personalInformation.sex}`, x, y=y+10);
    doc.text(`Blood Group: ${personalInformation.blood}`, x, y=y+10);
    doc.text(`Community: ${personalInformation.community}`, x, y=y+10);
    doc.text(`Cutoff: ${personalInformation.cutoff}`, x, y=y+10);
    doc.text(`Scholarship: ${personalInformation.scholarship}`, x, y=y+10);
    doc.text(`Volunteer: ${personalInformation.volunteer}`, x, y=y+10);
    doc.text(`Contact: ${personalInformation.contact}`, x, y=y+10);
    doc.text(`Email: ${personalInformation.mail}`, x, y=y+10);


    doc.text("Education Information", x, y=y+10);
    doc.text(`Ug: ${education.ug}`, x, y=y+10);
    doc.text(`Ug College: ${education.ugCollege}`, x, y=y+10);
    
    doc.text(`Ug percentage: ${education.ugPercentage}`, x, y=y+10);
    doc.text(`XII School: ${education.xiiSchool}`, x, y=y+10);
    doc.text(`XII Percentage: ${education.xiiPercentage}`, x, y=y+10);
    doc.text(`X School: ${education.xSchool}`, x, y=y+10);
    doc.text(`X Percentage: ${education.xPercentage}`, x, y=y+10);
    
    doc.addPage(); // Start a new page for grades

    // Add grades information
    doc.setFontSize(12);
    doc.text("Grades Information", 10, 20);
    
    let yPosition = 40;
    let currentSemester = null;

    // Group courses by semester
    const coursesBySemester = enrolledCourses.reduce((acc, course) => {
        if (!acc[course.semester]) acc[course.semester] = [];
        acc[course.semester].push(course);
        return acc;
    }, {});

    // Add grades for each semester
    Object.entries(coursesBySemester).forEach(([semester, courses]) => {
        // Add semester header
        if (yPosition > 280) { // Check page space
            doc.addPage();
            yPosition = 20;
        }
        
        doc.setFontSize(14);
        doc.text(`Semester ${semester}`, 10, yPosition);
        yPosition += 15;

        // Add course details
        courses.forEach(course => {
            if (yPosition > 280) { // Check page space
                doc.addPage();
                yPosition = 20;
                doc.text(`Semester ${semester} (cont.)`, 10, yPosition);
                yPosition += 15;
            }

            doc.setFontSize(12);
            doc.text(`Course: ${course.courseCode}`, 10, yPosition);
            doc.text(`Grade: ${course.grade}`, 100, yPosition);
            yPosition += 10;
        });

        yPosition += 10; // Add spacing between semesters
    });

    // Save the PDF
    doc.save(`${personalInformation.name}_grades.pdf`);
}
  
  return (
    <div className="container">
      <AdminTitleBar title={"IST Student Records Admin"} />

      <div className="form-container">
        <form onSubmit={handleFetchStudent}>
          <label>Enter Student ID:</label>
          <input
            type="text"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            placeholder="Enter Student ID"
            required
          />
          <button type="submit">Fetch Details</button>
        </form>
      </div>

      {/* Display Student Data */}
      {error && <p className="error">{error}</p>}

      {studentData && (
        <div className="student-details">
          <h3>Student Details</h3>
          <p><strong>Name:</strong> {studentData.personalInformation.name}</p>
          <p><strong>Register No:</strong> {studentData.personalInformation.register}</p>
          <p><strong>DOB:</strong> {new Date(studentData.personalInformation.dob).toDateString()}</p>
          <p><strong>Email:</strong> {studentData.personalInformation.mail}</p>
          <p><strong>Contact:</strong> {studentData.personalInformation.contact}</p>
          <p><strong>Blood Group:</strong> {studentData.personalInformation.blood}</p>

          {/* Add the download PDF button */}
          <button onClick={generatePDF}>Download PDF</button>
        </div>
      )}
    </div>
  );
}