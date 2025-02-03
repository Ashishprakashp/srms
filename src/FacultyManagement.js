    import React, {useState} from "react";
    import AdminTitleBar from "./AdminTitleBar";
    import './FacultyManagement.css';
    import Folder from "./res/folder.png";

    export default function FacultyManagement() {
        const [fileName, setFileName] = useState('');
        const [faculties,addFaculty] = useState([]);
        const [facultyId, setFacultyId] = useState("");
        const [title, setTitle] = useState("");
        const [name, setName] = useState("");
        const [designation, setDesignation] = useState("");

        const handleFileChange = (e) => {
            const file = e.target.files[0];
            if (file) {
                setFileName(file.name);  // Set the selected file name
            }
        };

        const handleAddFaculty = () => {
            if (!facultyId || !name || title === "--Title--" || designation === "--Designation--") {
                alert("Please fill all fields correctly!");
                return;
            }
        
            // Append a new faculty object to the array
            addFaculty([...faculties, { facultyId, title, name, designation }]);
        
            // Clear input fields after adding
            setFacultyId("");
            setTitle("--Title--");
            setName("");
            setDesignation("--Designation--");
        };
        return (
            <div>
                {/* Title Bar */}
                <AdminTitleBar title={"IST Student Records Admin"}/>

                {/* Main Container */}
                <div id="top-container">
                    <h1 className="page-title">Manual Credentials Creation</h1>

                    <form>
                        {/* Faculty Input Fields */}
                        <div className="first-line">
                            <input type="text" placeholder="Faculty Id" className="field" 
                            value={facultyId}
                            onChange={(e) => setFacultyId(e.target.value)}
                            />

                            <select className="field" value={title} onChange={(e) => setTitle(e.target.value)}>
                                <option>--Title--</option>
                                <option>Nil</option>
                                <option>Dr.</option>
                            </select>

                            <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} className="field" />

                            <select className="field" value={designation} onChange={(e) => setDesignation(e.target.value)}>
                                <option>--Designation--</option>
                                <option>Teaching Fellow</option>
                                <option>Asst. Professor</option>
                                <option>Professor</option>
                                <option>Head Of Dept.</option>
                            </select>
                        </div>

                        {/* Action Buttons */}
                        <div className="first-line button-group">
                            <button type="button" className="btn" onClick={handleAddFaculty}>Add Faculty</button>
                            <input type="submit" value="Generate Credentials" className="btn" />
                        </div>

                        {/* Faculty List Container */}
                        <table className="faculty-table">
                        <thead>
                          <tr>
                            <th>FacultyId</th>
                            <th>Title</th>
                            <th>Name</th>
                            <th>Designation</th>
                          </tr>
                        </thead>
                        <tbody>
                        
                            {faculties.map((faculty,index)=>(
                                <tr key={index}>
                                    <td>{faculty.facultyId}</td>
                                    <td>{faculty.title}</td>
                                    <td>{faculty.name}</td>
                                    <td>{faculty.designation}</td>
                                    {/* <td><button onClick={() => handleRemoveFaculty(index)}>Remove</button></td> */}
                                </tr>
                            ))}
                        </tbody>
                        </table>

                        
                        <button className="dwd1">Download</button>
                    </form>
                </div>

                {/* Bottom File Upload Section */}
                <div id="bottom-container">
                    <h1 className="page-title">Automatic Credentials Creation</h1>
                    <form>
                        <div className="file-upload-container">
                        <p>Upload .xls file:</p>
                            <label htmlFor="file" className="file-upload-label">
                                <img src={Folder} alt="Upload Icon" className="upload-icon"/>
                                
                            </label>

                            <input 
                                type="file" 
                                id="file" 
                                className="file-input" 
                                onChange={handleFileChange} 
                            />
                            {/* Display the filename or "No file chosen" */}
                            
                        </div>
                        <span className="file-name">{fileName || 'No file chosen'}</span>
                        <input type="submit" value="Generate Credentials" className="btn" />
                        <button className="dwd2">Download</button>
                    </form>


                    
                </div>
            </div>
        );
    }
