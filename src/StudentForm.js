import React, { useState } from 'react';
import Page1 from './Page1';
import Page2 from './Page2';
import Page3 from './Page3';
import Page4 from './Page4';
import Page5 from './Page5';
import './StudentForm.css';
import AdminTitleBar from './AdminTitleBar';

const StudentForm = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const nextPage = () => setCurrentPage(currentPage + 1);
  const prevPage = () => setCurrentPage(currentPage - 1);

  const [formData, setFormData] = useState({
    // Page 1 fields
    name: '',
    register: '',
    dob: '',
    sex: '',
    blood: '--',
    community: '--',
    cutoff: '',
    splcategory: 'None',
    scholarship: '',
    volunteer: 'None',
    contact: '',
    mail: '',
    fa: 'None',
  
    // Page 2 fields (Parents Details)
    fatherName: '',
    fatherOcc: '',
    fatherInc: '',
    motherName: '',
    motherOcc: '',
    motherInc: '',
    parentAddr: '',
    parentContact: '',
    parentMail: '',
    guardianAddr: '',
    guardianContact: '',
    guardianMail: '',
  
    // Page 3 fields (School Education Details)
    ug: '', // UG degree (BE, BTech, Bsc, BCA)
    ugCollege: '', // Name of the Institute
    ugYear: '', // Year of Passing
    ugPercentage: '', // Percentage
    xiiBoard: '', // Class XII Board (cbse, state-board)
    xiiSchool: '', // Name of the School
    xiiYear: '', // Year of Passing
    xiiPercentage: '', // Percentage
    xBoard: '', // Class X Board (cbse, state-board)
    xSchool: '', // Name of the School
    xYear: '', // Year of Passing
    xPercentage: '', // Percentage
  
    // Page 4 fields (Entrance Exam Details)
    entrance: '', // Entrance Exam (TANCET, GATE)
    entranceRegister: '', // Register Number
    entranceScore: '', // Score
    entranceYear: '', // Year
    workExperiences: [] // Array to store multiple work experiences
  });

  const handleSubmit = () => {
    console.log('Form Data: ', formData);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 1:
        return <Page1 formData={formData} setFormData={setFormData} />;
      case 2:
        return <Page2 formData={formData} setFormData={setFormData} />;
      case 3:
        return <Page3 formData={formData} setFormData={setFormData}/>;
      case 4:
        return <Page4 formData={formData} setFormData={setFormData}/>;
      case 5:
        return <Page5 formData={formData} setFormData={setFormData}/>;
      default:
        return <div>Invalid Page!</div>;
    }
  };

  return (
    <div>
    <AdminTitleBar />
    <div className="student-form-container">
      
      
      
      <div className="form-content">
      {renderPage()}
        <div className="form-navigation">
          {currentPage > 1 && (
            <button className="nav-button prev-button" onClick={prevPage}>
              Back
            </button>
          )}
          {currentPage < 5 && (
            <button className="nav-button next-button" onClick={nextPage}>
              Next
            </button>
          )}
          {currentPage === 5 && (
            <button className="nav-button submit-button" onClick={handleSubmit}>
              Submit
            </button>
          )}
        </div>
      </div>
    </div>
    </div>
  );
};

export default StudentForm;