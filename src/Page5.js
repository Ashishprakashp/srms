import React from 'react';
import './Page1.css'

const Page2 = ({ formData, setFormData }) => {
  return (
    <div className="page1-container">
      <h2>Page 5: Previous Work Experience (if any)</h2>

      
      <div className="form-group5">
      <label>Employer Name:</label>
        <input
          type="text"
          value={formData.employerName1}
          onChange={(e) => setFormData({ ...formData, employerName1: e.target.value })}
        />

        <label>Role/Designation :</label>
        <input
        type="text"
        value={formData.role1}
        onChange={(e) => setFormData({ ...formData, role1: e.target.value })}
        />

        <label>Experience (in Years):</label>
        <input
        type="number"
        value={formData.expYears1}
        onChange={(e) => setFormData({ ...formData, expYears1: e.target.value })}
        />
      </div>
      
      <div className="btn-container">
        <button className='nav-button add-button'>Add</button>
      </div>
      <div className="form-group">
        
        

      </div>
      
    </div>
  );
};

export default Page2;