import React, { useState } from 'react';
import './styles/Page1.css';

const Page4 = ({ formData, setFormData }) => {
  const [newExperience, setNewExperience] = useState({ employerName: '', role: '', expYears: '' });

  const handleAddExperience = () => {
    if (newExperience.employerName && newExperience.role && newExperience.expYears) {
      const updatedExperience = [
        ...(formData.entranceAndWorkExperience.workExperience || []),
        {
          ...newExperience,
          expYears: parseFloat(newExperience.expYears), // Ensure expYears is stored as a number
        },
      ];
      setFormData({
        ...formData,
        entranceAndWorkExperience: {
          ...formData.entranceAndWorkExperience,
          workExperience: updatedExperience,
        },
      });
      setNewExperience({ employerName: '', role: '', expYears: '' });
    }
  };

  const handleRemoveExperience = (index) => {
    setFormData((prevFormData) => {
      const updatedWorkExperience = prevFormData.entranceAndWorkExperience.workExperience.filter((_, i) => i !== index);
      return {
        ...prevFormData,
        entranceAndWorkExperience: {
          ...prevFormData.entranceAndWorkExperience,
          workExperience: updatedWorkExperience,
        },
      };
    });
  };

  const handleFormChange = (field, value) => {
    if (field === 'entranceScore' || field === 'entranceYear') {
      value = parseFloat(value);
    }
  
    // Ensure you're updating entrance and entranceRegister inside entranceAndWorkExperience
    if (field === 'entrance' || field === 'entranceRegister' || field === 'entranceScore' || field === 'entranceYear') {
      setFormData((prevData) => ({
        ...prevData,
        entranceAndWorkExperience: {
          ...prevData.entranceAndWorkExperience,
          [field]: value,
        },
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [field]: value,
      }));
    }
  };
  

  return (
    <div className="page1-container">
      <h2>Page 4: Entrance Exam Details</h2>
      <div className="form-group">
        <label>Entrance Exam:</label>
        <div className="radio-group">
          <label>
            <input
              type="radio"
              name="entrance"
              value="TANCET"
              checked={formData.entranceAndWorkExperience.entrance === "TANCET"}
              onChange={(e) => handleFormChange('entrance', e.target.value)}
            />
            TANCET
          </label>
          <label>
            <input
              type="radio"
              name="entrance"
              value="GATE"
              checked={formData.entranceAndWorkExperience.entrance === "GATE"}
              onChange={(e) => handleFormChange('entrance', e.target.value)}
            />
            GATE
          </label>
        </div>
      </div>
      <div className="form-group">
        <label>Register Number:</label>
        <input
          type="text"
          value={formData.entranceAndWorkExperience.entranceRegister || ''}
          onChange={(e) => handleFormChange('entranceRegister', e.target.value)}
        />
        <label>Score:</label>
        <input
          type="number"
          value={formData.entranceAndWorkExperience.entranceScore || ''}
          onChange={(e) => handleFormChange('entranceScore', e.target.value)}
        />
        <label>Year:</label>
        <input
          type="number"
          value={formData.entranceAndWorkExperience.entranceYear || ''}
          onChange={(e) => handleFormChange('entranceYear', e.target.value)}
        />
        <label>Scorecard: </label>
        <input
          type="file"
          onChange={(e) => setFormData({ ...formData, entranceScorecard: e.target.files[0] })}
        />
      </div>

      <h2>Previous Work Experience Details</h2>
      <div className="form-group">
        <label>Employer Name:</label>
        <input
          type="text"
          value={newExperience.employerName}
          onChange={(e) => setNewExperience({ ...newExperience, employerName: e.target.value })}
        />
        <label>Role/Designation:</label>
        <input
          type="text"
          value={newExperience.role}
          onChange={(e) => setNewExperience({ ...newExperience, role: e.target.value })}
        />
        <label>Experience (in Years):</label>
        <input
          type="number"
          value={newExperience.expYears}
          onChange={(e) => setNewExperience({ ...newExperience, expYears: e.target.value })}
        />
        <label>Certificate: </label>
        <input
          type="file"
          onChange={(e) => setNewExperience({ ...newExperience, certificate: e.target.files[0] })}
        />
      </div>
      <div className="btn-container">
        <button className="nav-button add-button" onClick={handleAddExperience}>
          Add
        </button>
      </div>

      {formData.entranceAndWorkExperience.workExperience && formData.entranceAndWorkExperience.workExperience.length > 0 && (
        <table className="experience-table">
          <thead>
            <tr>
              <th>Employer Name</th>
              <th>Role/Designation</th>
              <th>Experience (Years)</th>
            </tr>
          </thead>
          <tbody>
            {formData.entranceAndWorkExperience.workExperience.map((exp, index) => (
              <tr key={index}>
                <td>{exp.employerName}</td>
                <td>{exp.role}</td>
                <td>{exp.expYears}</td>
                <td>
                  <button onClick={() => handleRemoveExperience(index)}>Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Page4;
