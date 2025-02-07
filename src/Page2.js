import React from 'react';
import './Page1.css';

const Page2 = ({ formData, setFormData }) => {
  const safeFormData = formData || { familyInformation: {} };

  const handleFamilyChange = (field, value) => {
    setFormData({
      ...formData,
      familyInformation: {
        ...formData.familyInformation,
        [field]: value
      }
    });
  };

  return (
    <div className="page1-container">
      <h2>Page 2: Parents Details</h2>

      <div className="form-group">
        <label>Father's Name (with initial at last):</label>
        <input
          type="text"
          value={safeFormData.familyInformation.fatherName || ''}
          onChange={(e) => handleFamilyChange('fatherName', e.target.value)}
        />
        <label>Father's Occupation:</label>
        <input
          type="text"
          value={safeFormData.familyInformation.fatherOcc || ''}
          onChange={(e) => handleFamilyChange('fatherOcc', e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Father's Annual income:</label>
        <input
          type="number"
          value={safeFormData.familyInformation.fatherInc || ''}
          onChange={(e) => handleFamilyChange('fatherInc', e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Mother's Name (with initial at last):</label>
        <input
          type="text"
          value={safeFormData.familyInformation.motherName || ''}
          onChange={(e) => handleFamilyChange('motherName', e.target.value)}
        />
        <label>Mother's Occupation:</label>
        <input
          type="text"
          value={safeFormData.familyInformation.motherOcc || ''}
          onChange={(e) => handleFamilyChange('motherOcc', e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Mother's Annual income:</label>
        <input
          type="number"
          value={safeFormData.familyInformation.motherInc || ''}
          onChange={(e) => handleFamilyChange('motherInc', e.target.value)}
        />
      </div>

      <div className="form-group2">
        <label>Name & Address of parent:</label>
        <textarea
          value={safeFormData.familyInformation.parentAddr || ''}
          onChange={(e) => handleFamilyChange('parentAddr', e.target.value)}
          rows="5" cols="50"
        ></textarea>
      </div>

      <div className="form-group">
        <label>Parent's telephone number:</label>
        <input
          type="text"
          value={safeFormData.familyInformation.parentContact || ''}
          onChange={(e) => handleFamilyChange('parentContact', e.target.value)}
        />
        <label>Parent's mail-id:</label>
        <input
          type="email"
          value={safeFormData.familyInformation.parentMail || ''}
          onChange={(e) => handleFamilyChange('parentMail', e.target.value)}
        />
      </div>

      <div className="form-group2">
        <label>Name & Address of guardian:</label>
        <textarea
          value={safeFormData.familyInformation.guardianAddr || ''}
          onChange={(e) => handleFamilyChange('guardianAddr', e.target.value)}
          rows="5" cols="50"
        ></textarea>
      </div>

      <div className="form-group">
        <label>Guardian's telephone number:</label>
        <input
          type="text"
          value={safeFormData.familyInformation.guardianContact || ''}
          onChange={(e) => handleFamilyChange('guardianContact', e.target.value)}
        />
        <label>Guardian's mail-id:</label>
        <input
          type="email"
          value={safeFormData.familyInformation.guardianMail || ''}
          onChange={(e) => handleFamilyChange('guardianMail', e.target.value)}
        />
      </div>
    </div>
  );
};

export default Page2;
