import React from 'react';
import './Page1.css'; // Import the external CSS file

const Page1 = ({ formData, setFormData }) => {
  return (
    <div className="page1-container">
      <h2>Page 1: Personal Information</h2>

      <div className="form-group">
        <label>Name:</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <label>Register Number:</label>
        <input
          type="text"
          value={formData.register}
          onChange={(e) => setFormData({ ...formData, register: e.target.value })}
        />
      </div>

      <div className="form-group">
        
      </div>

      <div className="form-group">
        <label>Date of Birth:</label>
        <input
          type="date"
          value={formData.dob}
          onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
        />
        <label>Sex:</label>
        <div className="radio-group">
          <label>
            <input
              type="radio"
              name="sex"
              value="M"
              checked={formData.sex === "M"}
              onChange={(e) => setFormData({ ...formData, sex: e.target.value })}
            />
            Male
          </label>
          <label>
            <input
              type="radio"
              name="sex"
              value="F"
              checked={formData.sex === "F"}
              onChange={(e) => setFormData({ ...formData, sex: e.target.value })}
            />
            Female
          </label>
        </div>
      </div>

      <div className="form-group">
        
      </div>

      <div className="form-group">
        <label>Blood Group:</label>
        <select
          value={formData.blood}
          onChange={(e) => setFormData({ ...formData, blood: e.target.value })}
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
          value={formData.community}
          onChange={(e) => setFormData({ ...formData, community: e.target.value })}
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
        
      </div>

      <div className="form-group">
        <label>Cutoff Mark:</label>
        <input
          type="number"
          min="0"
          max="100"
          step="0.001"
          value={formData.cutoff}
          onChange={(e) => setFormData({ ...formData, cutoff: e.target.value })}
        />
        <label>Special Category:</label>
        <select
          value={formData.splcategory}
          onChange={(e) => setFormData({ ...formData, splcategory: e.target.value })}
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
        
      </div>

      <div className="form-group">
        <label>Scholarship Received (if any):</label>
        <input
          type="text"
          value={formData.scholarship}
          onChange={(e) => setFormData({ ...formData, scholarship: e.target.value })}
        />
        <label>Volunteer In:</label>
        <select
          value={formData.volunteer}
          onChange={(e) => setFormData({ ...formData, volunteer: e.target.value })}
        >
          <option value="None">None</option>
          <option value="NSS">NSS</option>
          <option value="NSO">NSO</option>
          <option value="YRC">YRC</option>
        </select>
      </div>

      <div className="form-group">
        
      </div>

      <div className="form-group">
        <label>Contact:</label>
        <input
          type="text"
          value={formData.contact}
          onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
        />
        <label>Email:</label>
        <input
          type="email"
          value={formData.mail}
          onChange={(e) => setFormData({ ...formData, mail: e.target.value })}
        />
      </div>

      <div className="form-group">
        
      </div>

      <div className="form-group">
        <label>Faculty Advisor:</label>
        <select
          value={formData.fa}
          onChange={(e) => setFormData({ ...formData, fa: e.target.value })}
        >
          <option value="None">None</option>
        </select>
      </div>
    </div>
  );
};

export default Page1;