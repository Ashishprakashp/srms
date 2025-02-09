import { useState } from "react";
import { jsPDF } from "jspdf"; // Import jsPDF
import axios from 'axios'; // Import axios

import AdminTitleBar from "./AdminTitleBar";

export default function AdminDashboard({ services }) {
  const [studentId, setStudentId] = useState("");
  const [studentData, setStudentData] = useState(null);
  const [error, setError] = useState("");

  const handleFetchStudent = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    try {
      const response = await axios.get(`http://localhost:5000/student?studentId=${studentId}`);
      setStudentData(response.data);
      console.log(response.data);
    } catch (err) {
      setError(err.response ? err.response.data.message : err.message);
      setStudentData(null);
    }
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    
    // Title with Department Name
    doc.setFontSize(18);
    doc.text("Department of Information Science and Technology", 20, 20);
    doc.text("Student Report", 80, 30);

    // Draw border around the PDF
    doc.setDrawColor(0, 0, 0); // Black color for border
    doc.setLineWidth(0.5);
    doc.rect(10, 10, 190, 277); // Adjust the rectangle to cover the entire page

    // Personal Information
    doc.setFontSize(12);
    doc.text(`Name: ${studentData.personalInformation.name}`, 20, 40);
    doc.text(`Register No: ${studentData.personalInformation.register}`, 20, 50);
    doc.text(`DOB: ${new Date(studentData.personalInformation.dob).toDateString()}`, 20, 60);
    doc.text(`Email: ${studentData.personalInformation.mail}`, 20, 70);
    doc.text(`Contact: ${studentData.personalInformation.contact}`, 20, 80);
    doc.text(`Blood Group: ${studentData.personalInformation.blood}`, 20, 90);
    
    // Family Information
    doc.text("Family Information", 20, 110);
    doc.text(`Father Name: ${studentData.familyInformation.fatherName}`, 20, 120);
    doc.text(`Mother Name: ${studentData.familyInformation.motherName}`, 20, 130);
    doc.text(`Parent Contact: ${studentData.familyInformation.parentContact}`, 20, 140);
    doc.text(`Parent Email: ${studentData.familyInformation.parentMail}`, 20, 150);
    
    // Education Information
    doc.text("Education Information", 20, 170);
    doc.text(`UG: ${studentData.education.ug}`, 20, 180);
    doc.text(`UG College: ${studentData.education.ugCollege}`, 20, 190);
    doc.text(`UG Year: ${studentData.education.ugYear}`, 20, 200);
    doc.text(`UG Percentage: ${studentData.education.ugPercentage}%`, 20, 210);

    // Entrance and Work Experience
    doc.text("Entrance and Work Experience", 20, 230);
    doc.text(`Entrance: ${studentData.entranceAndWorkExperience.entrance}`, 20, 240);
    doc.text(`Entrance Register No: ${studentData.entranceAndWorkExperience.entranceRegister}`, 20, 250);
    
    studentData.entranceAndWorkExperience.workExperience.forEach((exp, index) => {
      doc.text(`Work Experience ${index + 1}:`, 20, 260 + (index * 10));
      doc.text(`Employer: ${exp.employerName}`, 20, 270 + (index * 10));
      doc.text(`Role: ${exp.role}`, 20, 280 + (index * 10));
      doc.text(`Years of Experience: ${exp.expYears}`, 20, 290 + (index * 10));
    });

    // Save PDF
    doc.save("student_details.pdf");
  };

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
