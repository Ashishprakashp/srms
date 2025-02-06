    import React, { useState } from "react";
    import AdminTitleBar from "./AdminTitleBar";
    import './FacultyManagement.css';
    import Folder from "./res/folder.png";
    import axios from "axios";
    import { nanoid } from "nanoid";
    import * as XLSX from "xlsx";

    export default function FacultyManagement() {
        const [facultyData, setFacultyData] = useState([]);
        const [fileName, setFileName] = useState('');
        const [faculties, setFaculties] = useState([]);
        const [faculty, setFaculty] = useState({ facultyId: "", title: "--Title--", name: "", designation: "--Designation--", pwd: "" });
        const [showResetForm, setShowResetForm] = useState(false);  // State to handle visibility of the reset form
        const [errorMessage, setErrorMessage] = useState("");  // State for displaying error messages

        // Search faculty function
        const SearchFaculty = (e) => {
            e.preventDefault();
            
            const facultyId = document.querySelector("input[name='facultyId']").value.trim();
            const facultyName = document.querySelector("input[name='facultyName']").value.trim();
        
            if (!facultyId && !facultyName) {
                alert("No Faculty Id or name provided!");
                return;
            }
        
            axios.get(`http://localhost:5000/faculty`, {
                params: { facultyId, facultyName }
            })
            .then((response) => {
                if (response.data.length !== 0) {
                    setFacultyData(response.data);
                    setFaculty(response.data[0]); // Set first result as selected faculty
                    setShowResetForm(true);
                } else {
                    setFacultyData([]);
                    setShowResetForm(false);
                    setErrorMessage("No faculty found.");
                }
            })
            .catch((error) => {
                console.error("Error fetching faculty:", error);
                setErrorMessage("An error occurred while fetching faculty data.");
            });
        };
        

        // Handle reset password functionality
        const handleResetPassword = (e) => {
            e.preventDefault();
        
            const pwd1 = e.target.pwd1.value;
            const pwd2 = e.target.pwd2.value;
        
            if (pwd1 !== pwd2) {
                alert("Passwords do not match!");
                return;
            }
        
            if (!faculty.facultyId) {
                alert("No faculty selected for password reset.");
                return;
            }
            
            console.log(faculty.facultyId,pwd1);
            axios.put("http://localhost:5000/faculty/resetPassword", {
                facultyId: faculty.facultyId, // Ensure facultyId is properly set
                newPassword: pwd1
            })
            .then(() => {
                alert("Password reset successfully!");
                // Update the facultyData state to reflect the new password
                setFacultyData(facultyData.map(fac => 
                    fac.facultyId === faculty.facultyId ? { ...fac, pwd: pwd1 } : fac
                ));
                setShowResetForm(false);
            })
            .catch((error) => {
                console.error("Error resetting password:", error);
                alert("Error resetting password.");
            });
        };
        
        
        return (
            <div>
                <AdminTitleBar title="IST Student Records Admin" />

                <div id="top-container">
                    <h1 className="page-title">Reset Password</h1>
                    <form onSubmit={SearchFaculty}>
                        <div className="first-line">
                            <input type="text" name="facultyId" placeholder="Faculty Id" className="field"/>OR
                            <input type="text" name="facultyName" placeholder="Faculty Name" className="field"/>
                        </div>
                        <div className="first-line button-group">
                            <button type="submit" className="btn">Search Faculty</button>
                        </div>
                        {errorMessage && <div className="error-message">{errorMessage}</div>} {/* Display error message */}
                        <div>
                        {facultyData.length > 0 && (
                            <table>
                                <thead>
                                    <tr>
                                        <th>Faculty ID</th>
                                        <th>Title</th>
                                        <th>Name</th>
                                        <th>Designation</th>
                                        <th>Password</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {facultyData.map((faculty, index) => (
                                        <tr key={index}>
                                            <td>{faculty.facultyId}</td>
                                            <td>{faculty.title}</td>
                                            <td>{faculty.name}</td>
                                            <td>{faculty.designation}</td>
                                            <td>{faculty.pwd}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                        </div>
                    </form>

                    {showResetForm && (  // Conditionally render the reset password form
                        <div className="first-line button-group">
                            <form className="resetForm" onSubmit={handleResetPassword}>
                                <input type="password" name="pwd1" placeholder="Password" className="field" required />
                                <input type="password" name="pwd2" placeholder="Re-Enter Password" className="field" required />
                                <button type="submit" className="btn">Reset Password</button>
                            </form>
                        </div>
                    )}
                </div>
            </div>
        );
    }
