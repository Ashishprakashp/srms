import React, { useState } from 'react';
import './Page1.css';

const Page3 = ({ formData, setFormData }) => {
  const branch = sessionStorage.getItem("branch");
  const handleInputChange = (e, field, section) => {
    let value = e.target.value;

    // Parse specific fields
    if (field === "dob") {
      value = new Date(value); // Ensure dob is a Date object
    } else if (field.includes("Year") || field.includes("Percentage")) {
      value = parseFloat(value); // Convert Year and Percentage to Number
    }

    setFormData({
      ...formData,
      [section]: {
        ...formData[section],
        [field]: value
      }
    });
  };

  const handleRadioChange = (e, field, section) => {
    setFormData({
      ...formData,
      [section]: {
        ...formData[section],
        [field]: e.target.value
      }
    });
  };

  return (
    <div className="page1-container">
      <h2>Page 3: School Education Details</h2>
      {branch!=="Btech" &&(

      
      <fieldset>
        <legend>UG</legend>
        <div className="form-group">
          <label>Degree:</label>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="UG"
                value="BE"
                checked={formData.education.ug === "BE"}
                onChange={(e) => handleRadioChange(e, "ug", "education")}
              />
              BE
            </label>
            <label>
              <input
                type="radio"
                name="UG"
                value="Btech"
                checked={formData.education.ug === "Btech"}
                onChange={(e) => handleRadioChange(e, "ug", "education")}
              />
              BTech
            </label>
            <label>
              <input
                type="radio"
                name="UG"
                value="Bsc"
                checked={formData.education.ug === "Bsc"}
                onChange={(e) => handleRadioChange(e, "ug", "education")}
              />
              Bsc
            </label>
            <label>
              <input
                type="radio"
                name="UG"
                value="BCA"
                checked={formData.education.ug === "BCA"}
                onChange={(e) => handleRadioChange(e, "ug", "education")}
              />
              BCA
            </label>
          </div>
        </div>
        <div className="form-group">
          <label>Name of the Institute:(with city)</label>
          <input
            type="text"
            value={formData.education.ugCollege}
            onChange={(e) => handleInputChange(e, "ugCollege", "education")}
          />
          <label>Year of Passing:</label>
          <input
            type="number"
            value={formData.education.ugYear}
            onChange={(e) => handleInputChange(e, "ugYear", "education")}
          />
        </div>
        <div className="form-group">
          <label>Percentage:</label>
          <input
            type="number"
            value={formData.education.ugPercentage}
            onChange={(e) => handleInputChange(e, "ugPercentage", "education")}
          />
          <label>Provisional Certificate:</label>
          <input
            type="file"
          />
        </div>
      </fieldset>
      )}
      <fieldset>
        <legend>Class XII</legend>
        <div className="form-group">
          <label>Board:</label>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="XIIboard"
                value="cbse"
                checked={formData.education.xiiBoard === "cbse"}
                onChange={(e) => handleRadioChange(e, "xiiBoard", "education")}
              />
              CBSE
            </label>
            <label>
              <input
                type="radio"
                name="XIIboard"
                value="state-board"
                checked={formData.education.xiiBoard === "state-board"}
                onChange={(e) => handleRadioChange(e, "xiiBoard", "education")}
              />
              State-Board
            </label>
            <label>
              <input
                type="radio"
                name="XIIboard"
                value="icse"
                checked={formData.education.xiiBoard === "icse"}
                onChange={(e) => handleRadioChange(e, "xiiBoard", "education")}
              />
              ICSE
            </label>
            <label>
              <input
                type="radio"
                name="XIIboard"
                value="others"
                checked={formData.education.xiiBoard === "others"}
                onChange={(e) => handleRadioChange(e, "xiiBoard", "education")}
              />
              Others
            </label>
          </div>
        </div>

        <div className="form-group">
          <label>Name of the School:(with city)</label>
          <input
            type="text"
            value={formData.education.xiiSchool}
            onChange={(e) => handleInputChange(e, "xiiSchool", "education")}
          />
          <label>Year of Passing:</label>
          <input
            type="number"
            value={formData.education.xiiYear}
            onChange={(e) => handleInputChange(e, "xiiYear", "education")}
          />
        </div>

        <div className="form-group">
          <label>Percentage:</label>
          <input
            type="number"
            value={formData.education.xiiPercentage}
            onChange={(e) => handleInputChange(e, "xiiPercentage", "education")}
          />
          <label>Class XII Marksheet:</label>
          <input
            type="file"
          />
        </div>
      </fieldset>

      <fieldset>
        <legend>Class X</legend>
        <div className="form-group">
          <label>Board:</label>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="Xboard"
                value="cbse"
                checked={formData.education.xBoard === "cbse"}
                onChange={(e) => handleRadioChange(e, "xBoard", "education")}
              />
              CBSE
            </label>
            <label>
              <input
                type="radio"
                name="Xboard"
                value="state-board"
                checked={formData.education.xBoard === "state-board"}
                onChange={(e) => handleRadioChange(e, "xBoard", "education")}
              />
              State-Board
            </label>
            <label>
              <input
                type="radio"
                name="Xboard"
                value="icse"
                checked={formData.education.xBoard === "icse"}
                onChange={(e) => handleRadioChange(e, "xBoard", "education")}
              />
              ICSE
            </label>
            <label>
              <input
                type="radio"
                name="Xboard"
                value="others"
                checked={formData.education.xBoard === "others"}
                onChange={(e) => handleRadioChange(e, "xBoard", "education")}
              />
              Others
            </label>
          </div>
        </div>

        <div className="form-group">
          <label>Name of the School:(with city)</label>
          <input
            type="text"
            value={formData.education.xSchool}
            onChange={(e) => handleInputChange(e, "xSchool", "education")}
          />
          <label>Year of Passing:</label>
          <input
            type="number"
            value={formData.education.xYear}
            onChange={(e) => handleInputChange(e, "xYear", "education")}
          />
        </div>

        <div className="form-group">
          <label>Percentage:</label>
          <input
            type="number"
            value={formData.education.xPercentage}
            onChange={(e) => handleInputChange(e, "xPercentage", "education")}
          />
          <label>Class X Marksheet:</label>
          <input
            type="file"
          />
        </div>
      </fieldset>
    </div>
  );
};

export default Page3;
