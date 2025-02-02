import React, { useState } from 'react';
import Page1 from './Page1';
import Page2 from './Page2';
import Page3 from './Page3';
import './StudentForm.css';
import AdminTitleBar from './AdminTitleBar';

const StudentForm = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const nextPage = () => setCurrentPage(currentPage + 1);
  const prevPage = () => setCurrentPage(currentPage - 1);

  const [formData, setFormData] = useState({
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
        return <Page3 formData={formData} setFormData={setFormData}/>;
      case 5:
        return <Page3 formData={formData} setFormData={setFormData}/>;
      default:
        return <div>Invalid Page!</div>;
    }
  };

  return (
    <div className="student-form-container">
      <AdminTitleBar />
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
  );
};

export default StudentForm;