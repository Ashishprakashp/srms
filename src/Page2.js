import React from 'react';
import './Page1.css'

const Page2 = ({ formData, setFormData }) => {
  return (
    <div className="page1-container">
      <h2>Page 2: Parents Details</h2>

      <div className="form-group">
        <label>Father's Name (with initial at last):</label>
        <input
          type="text"
          value={formData.fatherName}
          onChange={(e) => setFormData({ ...formData, fatherName: e.target.value })}
        />
        <label>Father's Occupation:</label>
        <input
          type="text"
          value={formData.fatherOcc}
          onChange={(e) => setFormData({ ...formData, fatherOcc: e.target.value })}
        />
        
      </div>

      <div className="form-group">
      <label>Father's Annual income:</label>
        <input
          type="number"
          value={formData.fatherInc}
          onChange={(e) => setFormData({ ...formData, fatherInc: e.target.value })}
        />
      </div>

      <div className="form-group">
        <label>mother's Name (with initial at last):</label>
        <input
        type="text"
        value={formData.motherName}
        onChange={(e) => setFormData({ ...formData, motherName: e.target.value })}
        />
        <label>mother's Occupation:</label>
        <input
        type="text"
        value={formData.motherOcc}
        onChange={(e) => setFormData({ ...formData, motherOcc: e.target.value })}
        />
        

      </div>

      <div className="form-group">
      <label>mother's Annual income:</label>
        <input
        type="number"
        value={formData.motherInc}
        onChange={(e) => setFormData({ ...formData, motherInc: e.target.value })}
        />
      </div>

      <div className="form-group2">
      <label>Name & Address of parent:</label>
        <textarea
        value={formData.parentAddr}
        onChange={(e) => setFormData({ ...formData, parentAddr: e.target.value })}
        rows="5" cols="50"
        ></textarea>
        
      </div>
      
      <div className="form-group">
      <label>parent's telephone number:</label>
        <input
        type="text"
        value={formData.parentContact}
        onChange={(e) => setFormData({ ...formData, parentContact: e.target.value })}
        />
        <label>parent's mail-id:</label>
        <input
        type="email"
        value={formData.parentMail}
        onChange={(e) => setFormData({ ...formData, parentMail: e.target.value })}
        />
      </div>

      <div className="form-group2">
      <label>Name & Address of guardian:</label>
        <textarea
        value={formData.guardianAddr}
        onChange={(e) => setFormData({ ...formData, guardianAddr: e.target.value })}
        rows="5" cols="50"
        ></textarea>
      </div>

      <div className="form-group">
      <label>guardian's telephone number:</label>
        <input
        type="text"
        value={formData.guardianContact}
        onChange={(e) => setFormData({ ...formData, guardianContact: e.target.value })}
        />
        <label>guardian's mail-id:</label>
        <input
        type="email"
        value={formData.guardianMail}
        onChange={(e) => setFormData({ ...formData, guardianMail: e.target.value })}
        />
      </div>
    </div>
  );
};

export default Page2;