import React from 'react';
import { useState } from 'react';
import './Page1.css';

const Page4 = ({ formData, setFormData }) => {
  const [workExperience, setWorkExperience] = useState(formData.workExperience || []);
  const [newExperience, setNewExperience] = useState({ employerName: '', role: '', expYears: '' });

  const handleAddExperience = () => {
    if (newExperience.employerName && newExperience.role && newExperience.expYears) {
      const updatedExperience = [...workExperience, newExperience];
      setWorkExperience(updatedExperience);
      setFormData({ ...formData, workExperience: updatedExperience });
      setNewExperience({ employerName: '', role: '', expYears: '' });
    }
  };

  const handleRemoveExperience = (index) => {
    setFormData((prevFormData) => {
      const updatedWorkExperience = prevFormData.workExperience.filter((_, i) => i !== index);
      return { ...prevFormData, workExperience: updatedWorkExperience };
    });
    setWorkExperience((prevWorkExperience) => prevWorkExperience.filter((_, i) => i !== index));
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
              checked={formData.entrance === "TANCET"}
              onChange={(e) => setFormData({ ...formData, entrance: e.target.value })}
            />
            TANCET
          </label>
          <label>
            <input
              type="radio"
              name="entrance"
              value="GATE"
              checked={formData.entrance === "GATE"}
              onChange={(e) => setFormData({ ...formData, entrance: e.target.value })}
            />
            GATE
          </label>
        </div>
      </div>
      <div className="form-group">
        <label>Register Number:</label>
        <input
          type="text"
          value={formData.entranceRegister || ''}
          onChange={(e) => setFormData({ ...formData, entranceRegister: e.target.value })}
        />
        <label>Score:</label>
        <input
          type="number"
          value={formData.entranceScore || ''}
          onChange={(e) => setFormData({ ...formData, entranceScore: e.target.value })}
        />
        <label>Year:</label>
        <input
          type="number"
          value={formData.entranceYear || ''}
          onChange={(e) => setFormData({ ...formData, entranceYear: e.target.value })}
        />
        <label>Scorecard: </label>
        <input
        type='file'
        />
      </div>
      <div className="form-group">
        
      </div>
      <div className="form-group">
        
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
        type='file'
        />
      </div>
      <div className="btn-container">
        <button className='nav-button add-button' onClick={handleAddExperience}>Add</button>
      </div>
      
      {workExperience.length > 0 && (
        <table className="experience-table">
          <thead>
            <tr>
              <th>Employer Name</th>
              <th>Role/Designation</th>
              <th>Experience (Years)</th>
            </tr>
          </thead>
          <tbody>
            {workExperience.map((exp, index) => (
              <tr key={index}>
                <td>{exp.employerName}</td>
                <td>{exp.role}</td>
                <td>{exp.expYears}</td>
                <td><button onClick={() => handleRemoveExperience(index)}>Remove</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Page4;
