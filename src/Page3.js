import React from 'react';
import './Page1.css'

const Page3 = ({ formData, setFormData }) => {
  return (
    <div className="page1-container">
      <h2>Page 3: School Education Details</h2>
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
                checked={formData.ug === "BE"}
                onChange={(e) => setFormData({ ...formData, ug: e.target.value })}
              />
              BE
            </label>
            <label>
              <input
                type="radio"
                name="UG"
                value="BTech"
                checked={formData.ug === "BTech"}
                onChange={(e) => setFormData({ ...formData, ug: e.target.value })}
              />
              BTech
            </label>
            <label>
              <input
                type="radio"
                name="UG"
                value="Bsc"
                checked={formData.ug === "Bsc"}
                onChange={(e) => setFormData({ ...formData, ug: e.target.value })}
              />
              Bsc
            </label>
            <label>
              <input
                type="radio"
                name="UG"
                value="BCA"
                checked={formData.ug === "BCA"}
                onChange={(e) => setFormData({ ...formData, ug: e.target.value })}
              />
              BCA
            </label>
          </div>
      </div>
      <div className="form-group">
      <label>Name of the Institute:</label>
        <input
          type="text"
          value={formData.ugCollege}
          onChange={(e) => setFormData({ ...formData, ugCollege: e.target.value })}
        />
        <label>Year of Passing:</label>
        <input
        type="number"
        value={formData.ugYear}
        onChange={(e) => setFormData({ ...formData, ugYear: e.target.value })}
        />
      </div>
      <div className="form-group">
        
        <label>Percentage:</label>
        <input
        type="number"
        value={formData.ugPercentage}
        onChange={(e) => setFormData({ ...formData, ugPercentage: e.target.value })}
        />
        <label>Provisional Certificate:</label>
        <input
        type="file"
        />
        
      </div>
      </fieldset>
      
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
                checked={formData.xiiBoard === "cbse"}
                onChange={(e) => setFormData({ ...formData, xiiBoard: e.target.value })}
              />
              CBSE
            </label>
            <label>
              <input
                type="radio"
                name="XIIboard"
                value="state-board"
                checked={formData.xiiBoard === "state-board"}
                onChange={(e) => setFormData({ ...formData, xiiBoard: e.target.value })}
              />
              State-Board
            </label>
          </div>
      </div>

      <div className="form-group">
      <label>Name of the School:</label>
        <input
          type="text"
          value={formData.xiiSchool}
          onChange={(e) => setFormData({ ...formData, xiiSchool: e.target.value })}
        />
        <label>Year of Passing:</label>
        <input
        type="number"
        value={formData.xiiYear}
        onChange={(e) => setFormData({ ...formData, xiiYear: e.target.value })}
        />
      </div>

      <div className="form-group">
        
        <label>Percentage:</label>
        <input
        type="number"
        value={formData.xiiPercentage}
        onChange={(e) => setFormData({ ...formData, xiiPercentage: e.target.value })}
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
                checked={formData.xBoard === "cbse"}
                onChange={(e) => setFormData({ ...formData, xBoard: e.target.value })}
              />
              CBSE
            </label>
            <label>
              <input
                type="radio"
                name="Xboard"
                value="state-board"
                checked={formData.xBoard === "state-board"}
                onChange={(e) => setFormData({ ...formData, xBoard: e.target.value })}
              />
              State-Board
            </label>
          </div>
      </div>

      <div className="form-group">
      <label>Name of the School:</label>
        <input
          type="text"
          value={formData.xSchool}
          onChange={(e) => setFormData({ ...formData, xSchool: e.target.value })}
        />
        <label>Year of Passing:</label>
        <input
        type="number"
        value={formData.xYear}
        onChange={(e) => setFormData({ ...formData, xYear: e.target.value })}
        />
      </div>

      <div className="form-group">
        
        <label>Percentage:</label>
        <input
        type="number"
        value={formData.xPercentage}
        onChange={(e) => setFormData({ ...formData, xPercentage: e.target.value })}
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