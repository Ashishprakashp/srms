import React, { useState } from "react";
import AdminTitleBar from "./AdminTitleBar";
import "./FacultyManagement.css";
import Folder from "./res/folder.png";
import axios from "axios";
import { nanoid } from "nanoid";
import * as XLSX from "xlsx";

export default function FacultyManagement({ userType }) {
    const [fileName, setFileName] = useState('');
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState({
        userId: "",
        title: userType === "faculty" ? "--Title--" : "",
        name: "",
        designation: userType === "faculty" ? "--Designation--" : "",
        pwd: "",
        reset: 0,
    });

    const getTimestamp = () => new Date().toISOString().replace(/[-T:]/g, "_").split(".")[0];

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) setFileName(file.name);
    };

    const handleInputChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleAddUser = () => {
        const { userId, title, name, designation } = user;
        if (!userId || !name || (userType === "faculty" && (title === "--Title--" || designation === "--Designation--"))) {
            alert("Please fill all fields correctly!");
            return;
        }
        const newUser = { ...user, pwd: nanoid(12) };
        setUsers([...users, newUser]);
        setUser({
            userId: "",
            title: userType === "faculty" ? "--Title--" : "",
            name: "",
            designation: userType === "faculty" ? "--Designation--" : "",
            pwd: "",
            reset: 0,
        });
    };

    const removeUser = (index) => setUsers(users.filter((_, i) => i !== index));

    const readXLSFile = (file) =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const workbook = XLSX.read(new Uint8Array(e.target.result), { type: "array" });
                resolve(XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]));
            };
            reader.onerror = reject;
            reader.readAsArrayBuffer(file);
        });

    const addToDatabase = async (userList) => {
        if (!userList.length) {
            alert("No user data to save!");
            return false;
        }
        try {
            const endpoint = userType === "faculty" ? "faculty" : "student-acc";
            const response = await axios.post(`http://localhost:5000/${endpoint}`, { users: userList });
            alert(response.data.message);
            setUsers([]);
            return true;
        } catch (error) {
            alert("Error saving user details: " + error.message);
            return false;
        }
    };

    const generateFile = async () => {
        const inputElement = document.getElementById("file");
        if (!fileName || inputElement.files.length === 0) {
            alert("Please upload a file first!");
            return;
        }

        try {
            const jsonData = await readXLSFile(inputElement.files[0]);
            const formattedData = jsonData.map((item) => ({
                userId: item["User ID"] || "",
                title: userType === "faculty" ? item["Title"] || "--Title--" : "",
                name: item["Name"] || "",
                designation: userType === "faculty" ? item["Designation"] || "--Designation--" : "",
                pwd: nanoid(12),
                reset: 0,
            }));

            setUsers((prev) => [...prev, ...formattedData]);

            if (await addToDatabase(formattedData)) {
                generateXLS(formattedData);
            }
        } catch (error) {
            alert("Error reading file: " + error.message);
        }
    };

    const generateXLS = async (data) => {
        console.log(data);
        if (!data.length) return;
        if (await addToDatabase(data)) {
            const ws = XLSX.utils.json_to_sheet(
                data.map(({ userId, name, pwd }) => ({ "User ID": userId, Name: name, Password: pwd, reset: 0 }))
            );
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, "UserCredentials");
            XLSX.writeFile(wb, `${userType.toUpperCase()}_CREDENTIALS_${getTimestamp()}.xls`);
        }
    };

    return (
        <div>
            <AdminTitleBar title="IST Student Records Admin" />

            <div id="top-container">
                <h1 className="page-title">{userType === "faculty" ? "Faculty" : "Student"} Credentials Creation</h1>
                <form>
                    <div className="first-line">
                        <input type="text" name="userId" placeholder="User ID" className="field" value={user.userId} onChange={handleInputChange} />
                        {userType === "faculty" && (
                            <select name="title" className="field" value={user.title} onChange={handleInputChange}>
                                <option>--Title--</option>
                                <option>Nil</option>
                                <option>Dr.</option>
                            </select>
                        )}
                        <input type="text" name="name" placeholder="Name" className="field" value={user.name} onChange={handleInputChange} />
                        {userType === "faculty" && (
                            <select name="designation" className="field" value={user.designation} onChange={handleInputChange}>
                                <option>--Designation--</option>
                                <option>Teaching Fellow</option>
                                <option>Asst. Professor</option>
                                <option>Professor</option>
                                <option>Head Of Dept.</option>
                            </select>
                        )}
                    </div>
                    <div className="first-line button-group">
                        <button type="button" className="btn" onClick={handleAddUser}>
                            Add {userType === "faculty" ? "Faculty" : "Student"}
                        </button>
                    </div>

                    <UserTable users={users} removeUser={removeUser} />

                    <button type="button" className="btn" onClick={() => generateXLS(users)}>
                        Generate & Download Credentials
                    </button>
                </form>
            </div>

            <div id="bottom-container">
                <h1 className="page-title">Upload {userType === "faculty" ? "Faculty" : "Student"} Data</h1>
                <form>
                    <div className="file-upload-container">
                        <p>Upload .xls file:</p>
                        <label htmlFor="file" className="file-upload-label">
                            <img src={Folder} alt="Upload Icon" className="upload-icon" />
                        </label>
                        <input type="file" id="file" className="file-input" onChange={handleFileChange} />
                    </div>
                    <span className="file-name">{fileName || "No file chosen"}</span>
                    <button type="button" className="btn" onClick={generateFile}>
                        Generate & Download Credentials
                    </button>
                </form>
            </div>
        </div>
    );
}

const UserTable = ({ users, removeUser }) => (
    <table className="user-table">
        <thead>
            <tr>
                <th>User ID</th>
                <th>Name</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
            {users.map((user, index) => (
                <tr key={index}>
                    <td>{user.userId}</td>
                    <td>{user.name}</td>
                    <td>
                        <button onClick={() => removeUser(index)}>Remove</button>
                    </td>
                </tr>
            ))}
        </tbody>
    </table>
);
