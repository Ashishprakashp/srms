import React, { useState } from "react";
import AdminTitleBar from "./AdminTitleBar";
import './FacultyManagement.css';
import Folder from "./res/folder.png";
import axios from "axios";
import { nanoid } from "nanoid";
import * as XLSX from "xlsx";

export default function FacultyManagement() {
    const [fileName, setFileName] = useState('');
    const [faculties, setFaculties] = useState([]);
    const [faculty, setFaculty] = useState({ facultyId: "", title: "--Title--", name: "", designation: "--Designation--", pwd: "" ,reset:0});

    const getTimestamp = () => new Date().toISOString().replace(/[-T:]/g, "_").split(".")[0];

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) setFileName(file.name);
    };

    const handleInputChange = (e) => {
        setFaculty({ ...faculty, [e.target.name]: e.target.value });
    };

    const handleAddFaculty = () => {
        const { facultyId, title, name, designation } = faculty;
        if (!facultyId || !name || title === "--Title--" || designation === "--Designation--") {
            alert("Please fill all fields correctly!");
            return;
        }
        const newFaculty = { ...faculty, pwd: nanoid(12) };
        setFaculties([...faculties, newFaculty]);
        setFaculty({ facultyId: "", title: "--Title--", name: "", designation: "--Designation--", pwd: "" ,reset:0});
    };

    const removeFaculty = (index) => setFaculties(faculties.filter((_, i) => i !== index));

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

    const addToDatabase = async (facultyList) => {
        if (!facultyList.length) {
            alert("No faculty data to save!");
            return false;
        }
        try {
            const response = await axios.post('http://localhost:5000/faculty', { faculties: facultyList });
            console.log(response);
            alert(response.data.message);
            setFaculties([]);
            return true;
        } catch (error) {
            alert("Error saving faculty details: " + error.message);
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
            const formattedData = jsonData.map(item => ({
                facultyId: item["Faculty ID"] || "",
                title: item["Title"] || "--Title--",
                name: item["Name"] || "",
                designation: item["Designation"] || "--Designation--",
                pwd: nanoid(12),
                reset:0
            }));

            setFaculties((prev) => [...prev, ...formattedData]);

            if (await addToDatabase(formattedData)) {
                generateXLS(formattedData);
            }
        } catch (error) {
            alert("Error reading file: " + error.message);
        }
    };

    
    const generateXLS = async(data) => {
        if (!data.length) return;
        if (await addToDatabase(data)) {
            const ws = XLSX.utils.json_to_sheet(data.map(({ facultyId, name, pwd }) => ({ "Faculty ID": facultyId, Name: name, Password: pwd ,reset:0})));
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, "FacultyCredentials");
            XLSX.writeFile(wb, `FC_${getTimestamp()}.xls`);
        }
        
    };

    return (
        <div>
            <AdminTitleBar title="IST Student Records Admin" />

            <div id="top-container">
                <h1 className="page-title">Manual Credentials Creation</h1>
                <form>
                    <div className="first-line">
                        <input type="text" name="facultyId" placeholder="Faculty Id" className="field" value={faculty.facultyId} onChange={handleInputChange} />
                        <select name="title" className="field" value={faculty.title} onChange={handleInputChange}>
                            <option>--Title--</option>
                            <option>Nil</option>
                            <option>Dr.</option>
                        </select>
                        <input type="text" name="name" placeholder="Name" className="field" value={faculty.name} onChange={handleInputChange} />
                        <select name="designation" className="field" value={faculty.designation} onChange={handleInputChange}>
                            <option>--Designation--</option>
                            <option>Teaching Fellow</option>
                            <option>Asst. Professor</option>
                            <option>Professor</option>
                            <option>Head Of Dept.</option>
                        </select>
                    </div>
                    <div className="first-line button-group">
                        <button type="button" className="btn" onClick={handleAddFaculty}>Add Faculty</button>
                    </div>

                    <FacultyTable faculties={faculties} removeFaculty={removeFaculty} />

                    <button type="button" className="btn" onClick={() => generateXLS(faculties)}>
                        Generate & Download Credentials
                    </button>
                </form>
            </div>

            <div id="bottom-container">
                <h1 className="page-title">Automatic Credentials Creation</h1>
                <form>
                    <div className="file-upload-container">
                        <p>Upload .xls file:</p>
                        <label htmlFor="file" className="file-upload-label">
                            <img src={Folder} alt="Upload Icon" className="upload-icon" />
                        </label>
                        <input type="file" id="file" className="file-input" onChange={handleFileChange} />
                    </div>
                    <span className="file-name">{fileName || 'No file chosen'}</span>
                    <button type="button" className="btn" onClick={generateFile}>
                        Generate & Download Credentials
                    </button>
                </form>
            </div>
        </div>
    );
}

const FacultyTable = ({ faculties, removeFaculty }) => (
    <table className="faculty-table">
        <thead>
            <tr>
                <th>FacultyId</th>
                <th>Title</th>
                <th>Name</th>
                <th>Designation</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
            {faculties.map((faculty, index) => (
                <tr key={index}>
                    <td>{faculty.facultyId}</td>
                    <td>{faculty.title}</td>
                    <td>{faculty.name}</td>
                    <td>{faculty.designation}</td>
                    <td><button onClick={() => removeFaculty(index)}>Remove</button></td>
                </tr>
            ))}
        </tbody>
    </table>
);
