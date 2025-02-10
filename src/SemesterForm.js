import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import AdminTitleBar from "./AdminTitleBar";

export default function SemesterForm() {
  const { semesterNo } = useParams();
  const [courses, setCourses] = useState([]);
  const [statuses, setStatuses] = useState([]); // State for holding status messages
  const [allGradesSubmitted, setAllGradesSubmitted] = useState(false); // State for checking if all grades are submitted
  const [statusChecked, setStatusChecked] = useState(false); // New state to track if grade status has been checked

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

  const checkGradeStatus = async () => {
    const studentId = sessionStorage.getItem("studentId");
    const branch = sessionStorage.getItem("branch");

    if (!studentId || !branch) {
      console.error("Student ID or branch is missing in session storage.");
      return;
    }

    try {
      const response = await axios.get("http://localhost:5000/semesters/check-grade-status", {
        params: { studentId, semesterNo, branch },
      });
      console.log("Status: ", response.data);
      if (response.data.courseStatuses) {
        setStatuses(response.data.courseStatuses); // Update the status with the backend response
        
        // Update course grades based on status
        const updatedCourses = courses.map(course => {
          const courseStatus = response.data.courseStatuses.find(status => status.courseCode === course.courseCode);
          if (courseStatus && courseStatus.grade) {
            course.grade = courseStatus.grade;  // Set the grade in the course object
          }
          return course;
        });
        setCourses(updatedCourses);

        // Check if all grades are submitted
        const allSubmitted = response.data.courseStatuses.every(status => status.gradeSubmitted);
        setAllGradesSubmitted(allSubmitted); // Update the flag for grade submission
      }
    } catch (error) {
      console.error("Error checking grade status:", error);
    }
  };

  const handleGradeChange = (index, newGrade) => {
    const updatedCourses = [...courses];
    updatedCourses[index].grade = newGrade;  // Update grade for the selected course
    setCourses(updatedCourses);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the page from refreshing on form submission
  
    const studentId = sessionStorage.getItem("studentId");
    if (!studentId) {
      console.error("Student ID is missing in session storage.");
      return;
    }
  
    try {
      // Prepare the data to send to the server
      const dataToSubmit = courses.map(course => ({
        studentId,
        courseCode: course.courseCode,
        grade: course.grade,
      }));
      console.log(dataToSubmit);
      const response = await axios.post("http://localhost:5000/semesters/submit", { dataToSubmit });
      alert("Data submitted successfully:");
      window.location.reload();
      console.log("Data submitted successfully:", response.data);
      // Handle successful submission (e.g., show a message, redirect, etc.)
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, [semesterNo]); // Add semesterNo as dependency

  useEffect(() => {
    if (courses.length > 0 && !statusChecked) {
      checkGradeStatus();  // Check the status of grades only once after courses are fetched
      setStatusChecked(true); // Mark status as checked
    }
  }, [courses, statusChecked]);  // Add statusChecked as a dependency

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
                  <th>Grade</th> {/* New column for Grade */}
                </tr>
              </thead>
              <tbody>
                {courses.length > 0 ? (
                  courses.map((course, index) => {
                    const courseStatus = statuses.find(status => status.courseCode === course.courseCode);
                    const isGradeSubmitted = courseStatus?.gradeSubmitted || false;

                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{course.courseCode}</td>  {/* Updated field name */}
                        <td>{course.courseTitle}</td>  {/* Updated field name */}
                        <td>{course.credits}</td>
                        <td>
                          <select 
                            value={course.grade || ''} 
                            onChange={(e) => handleGradeChange(index, e.target.value)}
                            disabled={isGradeSubmitted || allGradesSubmitted}  // Disable if grade is already submitted or all grades are submitted
                          >
                            <option value="">Select Grade</option>
                            <option value="O">O</option>
                            <option value="A+">A+</option>
                            <option value="A">A</option>
                            <option value="B+">B+</option>
                            <option value="B">B</option>
                            <option value="C">C</option>
                            <option value="RA/U">RA/U</option>
                          </select>
                        </td> {/* Dropdown for grade selection */}
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="7">No courses found.</td> {/* Adjusted colSpan */}
                  </tr>
                )}
              </tbody>
            </table>

            {/* Submit Button */}
            <div className="submit-container">
              <button type="submit" className="submit-btn" hidden={allGradesSubmitted}>Submit</button>
              <p hidden={!allGradesSubmitted}>Grades already submitted!</p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
