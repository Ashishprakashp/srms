import React, { useState } from "react";
import AdminTitleBar from "./AdminTitleBar";
import "./FacultyManagement.css";
import axios from "axios";

export default function ResetCredentials({ userType }) {  // Accept userType as a prop
    const [userData, setUserData] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [showResetForm, setShowResetForm] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    // Function to search for faculty or student
    const searchUser = (e) => {
        e.preventDefault();

        const userId = document.querySelector("input[name='userId']").value.trim();
        const userName = document.querySelector("input[name='userName']").value.trim();

        if (!userId && !userName) {
            alert(`No ${userType} ID or name provided!`);
            return;
        }

        axios
            .get(`http://localhost:5000/${userType}/fetch`, {
                params: { userId, userName }
            })
            .then((response) => {
                if (response.data.length !== 0) {
                    setUserData(response.data);
                    setSelectedUser(response.data[0]); // Select first result
                    setShowResetForm(true);
                } else {
                    setUserData([]);
                    setShowResetForm(false);
                    setErrorMessage(`No ${userType} found.`);
                }
            })
            .catch((error) => {
                console.error(`Error fetching ${userType}:`, error);
                setErrorMessage(`An error occurred while fetching ${userType} data.`);
            });
    };

    // Function to handle password reset
    const handleResetPassword = (e) => {
        e.preventDefault();

        const pwd1 = e.target.pwd1.value;
        const pwd2 = e.target.pwd2.value;

        if (pwd1 !== pwd2) {
            alert("Passwords do not match!");
            return;
        }

        if (!selectedUser?.userId) {
            alert(`No ${userType} selected for password reset.`);
            return;
        }
        console.log(selectedUser.userId,pwd1);
        axios
            .put(`http://localhost:5000/${userType}/resetPassword`, {
                userId: selectedUser.userId, 
                newPassword: pwd1
            })
            .then(() => {
                alert("Password reset successfully!");
                setUserData(userData.map(user => 
                    user.userId === selectedUser.userId ? { ...user, pwd: pwd1 } : user
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
            <AdminTitleBar title={`IST ${userType.charAt(0).toUpperCase() + userType.slice(1)} Records Admin`} />

            <div id="top-container">
                <h1 className="page-title">Reset {userType.charAt(0).toUpperCase() + userType.slice(1)} Password</h1>

                <form onSubmit={searchUser}>
                    <div className="first-line">
                        <input type="text" name="userId" placeholder="User ID" className="field"/> OR
                        <input type="text" name="userName" placeholder="User Name" className="field"/>
                    </div>
                    <div className="first-line button-group">
                        <button type="submit" className="btn">Search {userType.charAt(0).toUpperCase() + userType.slice(1)}</button>
                    </div>
                    {errorMessage && <div className="error-message">{errorMessage}</div>}
                </form>

                {userData.length > 0 && (
                    <table>
                        <thead>
                            <tr>
                                <th>User ID</th>
                                <th>Name</th>
                                <th>Password</th>
                            </tr>
                        </thead>
                        <tbody>
                            {userData.map((user, index) => (
                                <tr key={index}>
                                    <td>{user.userId}</td>
                                    <td>{user.name}</td>
                                    <td>{user.pwd}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}

                {showResetForm && (
                    <div className="first-line button-group">
                        <form className="resetForm" onSubmit={handleResetPassword}>
                            <input type="password" name="pwd1" placeholder="New Password" className="field" required />
                            <input type="password" name="pwd2" placeholder="Re-Enter Password" className="field" required />
                            <button type="submit" className="btn">Reset Password</button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
}
