import React from 'react';
import './Page1.css'

const Page2 = ({ formData, setFormData }) => {
  return (
    <div className="page1-container">
      
      <div className='signature'>
      
        <input type='checkbox' id='acceptance'/>&nbsp;&nbsp;
        <label>I hereby accept that all the details and documents produced by me is correct.</label>
      </div>
        
      
      
    </div>
  );
};

export default Page2;