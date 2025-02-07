import React from 'react';
import './Page1.css'; // Import the external CSS file
import Folder from "./res/folder.png";
import PassportPhotoUpload from './PassportPhotoUpload';

const Page1 = ({ formData, setFormData }) => {
  const [fileName, setFileName] = React.useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
        setFileName(file.name);  // Set the selected file name
    }
  };

  const handleChange = (section, field, value) => {
    // If it's year or percentage, convert to number
    if (field === 'year' || field === 'percentage' || field === 'cutoff') {
      value = parseFloat(value);
    } else if (field === 'dob') {
      // Convert date to timestamp (number)
      value = new Date(value);
    }

    setFormData((prevData) => ({
      ...prevData,
      [section]: {
        ...prevData[section],
        [field]: value
      }
    }));
  };

  return (
    <div className="page1-container">
      <h2>Page 1: Personal Information</h2>

      <div className='form-group'>
        <PassportPhotoUpload/>
      </div>

      <div className="form-group">
        <label>Name:</label>
        <input
          type="text"
          value={formData.personalInformation.name}
          onChange={(e) => handleChange('personalInformation', 'name', e.target.value)}
        />
        
        <label>Degree:</label>
        <select
          value={formData.personalInformation.degree}
          onChange={(e) => handleChange('personalInformation', 'degree', e.target.value)}
        >
          <option value="--">--</option>
          <option value="btech">BTech</option>
          <option value="mtech">MTech</option>
          <option value="mca">MCA</option>
        </select>

        <label>Register Number:</label>
        <input
          type="text"
          value={formData.personalInformation.register}
          onChange={(e) => handleChange('personalInformation', 'register', e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Date of Birth:</label>
        <input
          type="date"
          value={formData.personalInformation.dob ? new Date(formData.personalInformation.dob).toISOString().split('T')[0] : ''}
          onChange={(e) => handleChange('personalInformation', 'dob', e.target.value)}
        />
        <label>Sex:</label>
        <div className="radio-group">
          <label>
            <input
              type="radio"
              name="sex"
              value="M"
              checked={formData.personalInformation.sex === "M"}
              onChange={(e) => handleChange('personalInformation', 'sex', e.target.value)}
            />
            Male
          </label>
          <label>
            <input
              type="radio"
              name="sex"
              value="F"
              checked={formData.personalInformation.sex === "F"}
              onChange={(e) => handleChange('personalInformation', 'sex', e.target.value)}
            />
            Female
          </label>
        </div>
      </div>

      <div className="form-group">
        <label>Blood Group:</label>
        <select
          value={formData.personalInformation.blood}
          onChange={(e) => handleChange('personalInformation', 'blood', e.target.value)}
        >
          <option value="--">--</option>
          <option value="O+">O+</option>
          <option value="O-">O-</option>
          <option value="A+">A+</option>
          <option value="A-">A-</option>
          <option value="B+">B+</option>
          <option value="B-">B-</option>
          <option value="AB+">AB+</option>
          <option value="AB-">AB-</option>
        </select>
        <label>Community:</label>
        <select
          value={formData.personalInformation.community}
          onChange={(e) => handleChange('personalInformation', 'community', e.target.value)}
        >
          <option value="--">--</option>
          <option value="OC">OC</option>
          <option value="BC">BC</option>
          <option value="MBC">MBC</option>
          <option value="SC">SC</option>
          <option value="ST">ST</option>
        </select>
      </div>

      <div className="form-group">
        <label>Cutoff Mark:</label>
        <input
          type="number"
          min="0"
          max="100"
          step="0.001"
          value={formData.personalInformation.cutoff}
          onChange={(e) => handleChange('personalInformation', 'cutoff', e.target.value)}
        />
        <label>Special Category:</label>
        <select
          value={formData.personalInformation.splcategory}
          onChange={(e) => handleChange('personalInformation', 'splcategory', e.target.value)}
        >
          <option value="None">None</option>
          <option value="Ph">Ph</option>
          <option value="Sports">Sports</option>
          <option value="Ex-Service man">Ex-Service man</option>
          <option value="NRI">NRI</option>
          <option value="Other States">Other States</option>
          <option value="Any Other">Any Other</option>
        </select>
      </div>

      <div className="form-group">
        <label>Scholarship Received (if any):</label>
        <input
          type="text"
          value={formData.personalInformation.scholarship}
          onChange={(e) => handleChange('personalInformation', 'scholarship', e.target.value)}
        />
        <label>Volunteer In:</label>
        <select
          value={formData.personalInformation.volunteer}
          onChange={(e) => handleChange('personalInformation', 'volunteer', e.target.value)}
        >
          <option value="None">None</option>
          <option value="NSS">NSS</option>
          <option value="NSO">NSO</option>
          <option value="YRC">YRC</option>
        </select>
      </div>

      <div className="form-group">
        <label>Contact:</label>
        <input
          type="text"
          value={formData.personalInformation.contact}
          onChange={(e) => handleChange('personalInformation', 'contact', e.target.value)}
        />
        <label>Email:</label>
        <input
          type="email"
          value={formData.personalInformation.mail}
          onChange={(e) => handleChange('personalInformation', 'mail', e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Faculty Advisor:</label>
        <select
          value={formData.personalInformation.fa}
          onChange={(e) => handleChange('personalInformation', 'fa', e.target.value)}
        >
          <option value="None">None</option>
        </select>
      </div>
    </div>
  );
};

export default Page1;
