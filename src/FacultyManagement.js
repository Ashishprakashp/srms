    import React, {useState} from "react";
    import AdminTitleBar from "./AdminTitleBar";
    import './FacultyManagement.css';
    import Folder from "./res/folder.png";

    export default function FacultyManagement() {
        const [fileName, setFileName] = useState('');

        const handleFileChange = (e) => {
            const file = e.target.files[0];
            if (file) {
                setFileName(file.name);  // Set the selected file name
            }
        };
        return (
            <div>
                {/* Title Bar */}
                <AdminTitleBar />

                {/* Main Container */}
                <div id="top-container">
                    <h1 className="page-title">Manual Credentials Creation</h1>

                    <form>
                        {/* Faculty Input Fields */}
                        <div className="first-line">
                            <input type="text" placeholder="Faculty Id" className="field" />

                            <select className="field">
                                <option>--Title--</option>
                                <option>Nil</option>
                                <option>Dr.</option>
                            </select>

                            <input type="text" placeholder="Name" className="field" />

                            <select className="field">
                                <option>--Designation--</option>
                                <option>Teaching Fellow</option>
                                <option>Asst. Professor</option>
                                <option>Professor</option>
                                <option>Head Of Dept.</option>
                            </select>
                        </div>

                        {/* Faculty List Container */}
                        <div id="faculty-list"></div>

                        {/* Action Buttons */}
                        <div className="first-line button-group">
                            <button type="button" className="btn">Add Faculty</button>
                            <input type="submit" value="Generate Credentials" className="btn" />
                        </div>
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
