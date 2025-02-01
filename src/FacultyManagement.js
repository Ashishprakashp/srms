import React from "react";
import AdminTitleBar from "./AdminTitleBar";
import './FacultyManagement.css';

export default function FacultyManagement(){
    return (
        <div>
            <AdminTitleBar/>
            <div id="top-container">
                <form>
                <input type="text" placeholder="Faculty Id" className="field"/>
                <select >
                    <option>Title</option>
                    <option>Mr.</option>
                    <option>Mrs.</option>
                    <option>Ms.</option>
                </select>
                <select >
                    <option>Title</option>
                    <option>DR.</option>
                    <option>--</option>
                </select>
                <input type="text" placeholder="Name" className="field"/>
                <select >
                    <option>Designation</option>
                    <option>Teaching Fellow</option>
                    <option>Asst. Professor</option>
                    <option>Professor</option>
                    <option>Head Of Dept.</option>
                </select>
                <div id="Faculty-list">

                </div>
                <button>Add Faculty</button>
                <input type="submit" value="Generate Credentials"/>
                </form>
            </div>
            <div id="bottom-container">
                <p>dfbwebfwebj</p>
            </div>
        </div>
    );
}