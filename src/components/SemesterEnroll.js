import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import AdminTitleBar from "/home/ashish-prakash/Documents/pull2/src/AdminTitleBar.js";
import "./SemesterEnroll.css";

export default function SemesterEnroll() {
  const { semesterNo } = useParams();
  const [courses, setCourses] = useState([]);
  const [enrolled, setEnrolled] = useState(false); // State to track enrollment status

  const [loading, setLoading] = useState(true); // State to track if the enrollment check is loading

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload
  
    const studentId = sessionStorage.getItem("studentId");
    const branch = sessionStorage.getItem("branch");
  
    if (!studentId || !branch) {
      console.error("Student ID or Branch missing in session storage.");
      return;
    }
  
    try {
        // Prepare enrollment data
        const enrollmentData = courses.map((course) => ({
          studentId,
          courseCode: course.courseCode,
          semester: semesterNo,
          branch,
          grade: course.grade || null, // Default to null if not assigned
        }));
        console.log(enrollmentData);
      
        // Send the data to the server
        const response = await axios.post("http://localhost:5000/semesters/enroll", { enrollments: enrollmentData });
      
        console.log("Enrollment successful:", response.data);
        alert("Enrollment successful!"); // Show success message
        
        setEnrolled(true); // Set enrolled state to true after successful enrollment
      } catch (error) {
        console.error("Error submitting enrollment data:", error);
        alert("Failed to enroll. Please try again."); // Show error message
      }
  };

  const fetchCourses = async () => {
    const branch = sessionStorage.getItem("branch");

    if (!branch) {
      console.error("Branch is missing in session storage.");
      return;
    }

    try {
      const response = await axios.get("http://localhost:5000/semesters/fetch", {
        params: { branch, semester: semesterNo },
      });
      setCourses(response.data); // Store API response in state
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const checkEnrollmentStatus = async () => {
    const studentId = sessionStorage.getItem("studentId");
    
    if (!studentId) {
      console.error("Student ID missing in session storage.");
      return;
    }

    try {
      const response = await axios.get("http://localhost:5000/semesters/checkEnrollment", {
        params: { studentId, semester: semesterNo },
      });
      console.log(response.data);
      setEnrolled(response.data.enrolled);
      setLoading(false); // Set loading to false once enrollment status is fetched
    } catch (error) {
      console.error("Error checking enrollment status:", error);
      setLoading(false);
    }
};


  const handleGradeChange = (index, newGrade) => {
    const updatedCourses = [...courses];
    updatedCourses[index].grade = newGrade;  // Update grade for the selected course
    setCourses(updatedCourses);
  };

  useEffect(() => {
    fetchCourses();
    checkEnrollmentStatus();
  }, [semesterNo]); // Add semesterNo as dependency

  return (
    <div className="container">
      <AdminTitleBar title="IST Student Records Management" />

      {/* Main Content */}
      <div className="main-content">
        <div className="card-container">
          <form onSubmit={handleSubmit}>
            <table>
              <thead>
                <tr>
                  <th>S.no</th>
                  <th>Course Code</th>
                  <th>Course Title</th>
                  <th>Credits</th>
                </tr>
              </thead>
              <tbody>
                {courses.length > 0 ? (
                  courses.map((course, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{course.courseCode}</td>
                      <td>{course.courseTitle}</td>
                      <td>{course.credits}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7">No courses found.</td>
                  </tr>
                )}
              </tbody>
            </table>

            {/* Submit Button */}
            <div className="submit-container">
              {loading ? (
                <span>Loading...</span> // Show loading message while checking enrollment status
              ) : enrolled ? (
                <span className="enrolled-text">Already Enrolled!</span> // Show message if already enrolled
              ) : (
                <button type="submit" className="submit-btn">Enroll</button> // Show Enroll button if not enrolled
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
