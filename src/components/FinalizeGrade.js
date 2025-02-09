import { useState, useEffect } from "react";
import AdminTitleBar from "/home/ashish-prakash/Documents/pull2/src/AdminTitleBar.js";
import "/home/ashish-prakash/Documents/pull2/src/styles/AdminDashboard.css";
import { useParams } from "react-router-dom";

export default function FinalizeGrade() {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null); // State for the selected student
  const branch = "MCA";

  useEffect(() => {
    // Fetch students data from the server
    fetch(`http://localhost:5000/studentgrades?branch=${branch}`, {
      method: "GET", 
    })
      .then((response) => response.json())
      .then((data) => setStudents(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Handle click on a student row in the first table
  const handleRowClick = (student) => {
    setSelectedStudent(student); // Set the selected student when a row is clicked
  };

  // Check if all courses have confirmation set to false
  const allCoursesUnconfirmed = selectedStudent
    ? selectedStudent.enrolledCourses.every(course => course.confirmation === false)
    : false;

  // Handle submit click to update confirmation status
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    
    // Update the selected student's enrolled courses with confirmation: true
    const updatedCourses = selectedStudent.enrolledCourses.map(course => ({
      ...course,
      confirmation: true, // Set confirmation to true for all courses
    }));

    const updatedStudent = {
      ...selectedStudent,
      enrolledCourses: updatedCourses,
    };

    // Send the updated data to the server
    fetch(`http://localhost:5000/updateStudentGrades/${selectedStudent.studentId}`, {
      method: "PUT", // Update method
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedStudent), // Send the updated student data
    })
      .then((response) => response.json())
      .then((data) => {
        // After successful update, update the students state and reset selectedStudent
        setStudents((prevStudents) =>
          prevStudents.map((student) =>
            student.studentId === selectedStudent.studentId
              ? { ...student, enrolledCourses: updatedCourses }
              : student
          )
        );
        setSelectedStudent(null); // Optionally, clear the selected student after update
        alert("Grades have been confirmed.");
      })
      .catch((error) => console.error("Error updating data:", error));
  };

  return (
    <div className="container">
      {/* Title Bar */}
      <AdminTitleBar title={"IST Student Records Admin"} />

      {/* Main Content - First Table with Students */}
      {!selectedStudent &&(

      
      <div className="main-content">
        <table>
          <thead>
            <tr>
              <th>S.no</th>
              <th>Student Id</th>
              <th>Student Name</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr key={student.studentId} onClick={() => handleRowClick(student)}>
                <td>{index + 1}</td>
                <td>{student.studentId}</td>
                <td>{student.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      )}
      {/* Main Content - Second Table with Selected Student Details */}
      {selectedStudent && (
        <div className="main-content">
          <div className="card-container">
            <form onSubmit={handleSubmit}>
              <h3>Student Details: {selectedStudent.name}</h3>
              <table>
                <thead>
                  <tr>
                    <th>S.no</th>
                    <th>Course Code</th>
                    <th>Course Title</th>
                    <th>Credits</th>
                    <th>Grade</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedStudent.enrolledCourses.length > 0 ? (
                    selectedStudent.enrolledCourses.map((course, index) => {
                      return (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{course.courseCode}</td>
                          <td>{course.courseTitle || 'N/A'}</td>
                          <td>{course.credits || 'N/A'}</td>
                          <td>{course.grade}</td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan="5">No courses found for this student.</td>
                    </tr>
                  )}
                </tbody>
              </table>
              
              {/* Submit Button or Already Confirmed Message */}
              <div className="submit-container">
                {allCoursesUnconfirmed ? (
                  <button type="submit" className="submit-btn">Submit</button>
                ) : (
                  <p>Already Confirmed</p>
                )}
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
