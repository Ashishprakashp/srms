import React, { useState } from 'react';
import axios from 'axios';
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
  const skipPageFwd = () => setCurrentPage(currentPage + 2);
  const skipPageBwd = () => setCurrentPage(currentPage - 2);
  const prevPage = () => setCurrentPage(currentPage - 1);
  const branch = sessionStorage.getItem("branch");

  const [formData, setFormData] = useState({
    personalInformation: {
      name: '',
      register: '',
      dob: null,  // Date initialized as null
      sex: '',
      blood: 'B-',  // Default to B-
      community: 'SC',  // Default to SC
      cutoff: null,  // Null for percentage
      splcategory: 'None',  // Default to None
      scholarship: '',
      volunteer: 'None',  // Default to None
      contact: '',
      mail: '',
      fa: 'None',  // Default to None
      passportPhoto: ''
    },
  
    familyInformation: {
      fatherName: '',
      fatherOcc: '',
      fatherInc: null,  // Null for numeric input
      motherName: '',
      motherOcc: '',
      motherInc: null,  // Null for numeric input
      parentAddr: '',
      parentContact: '',
      parentMail: '',
      guardianAddr: '',
      guardianContact: '',
      guardianMail: ''
    },
  
    education: {
      ug: '',  // UG degree (BE, BTech, Bsc, BCA)
      ugCollege: '',  // Name of the Institute
      ugYear: null,  // Null for year
      ugPercentage: null,  // Null for numeric input
      ugProvisionalCertificate: '',
      xiiBoard: '',  // Class XII Board (cbse, state-board)
      xiiSchool: '',  // Name of the School
      xiiYear: null,  // Null for year
      xiiPercentage: null,  // Null for numeric input
      xiiMarksheet: '',
      xBoard: '',  // Class X Board (cbse, state-board)
      xSchool: '',  // Name of the School
      xYear: null,  // Null for year
      xPercentage: null,  // Null for numeric input
      xMarksheet: ''
    },
  
    entranceAndWorkExperience: {
      entrance: '',  // Entrance Exam (TANCET, GATE)
      entranceRegister: '',  // Register Number
      entranceScore: null,  // Null for numeric input
      entranceYear: null,  // Null for year
      scorecard: '',
      workExperience: [{
        employerName: '',
        role: '',
        expYears: null,  // Null for numeric input
        certificate: ''
      }]
    }
  });
  

  const handleSubmit = async(req,res) => {
    
    
    console.log('Form Data: ', formData);
    try{
      const response = await axios.post("http://localhost:5000/student",{student: formData});
      console.log(response);
    }catch(error){
      alert("Error saving student details: " + error.message);
    }
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
    <AdminTitleBar title={"IST Student Records Management System"}/>
    <div className="student-form-container">
      
      
      
      <div className="form-content">
      {renderPage()}
      <div className="form-navigation">
  {/* Back Button Logic */}
  {(currentPage > 1) && (
    <button
      className="nav-button prev-button"
      onClick={currentPage === 5 && branch === "Btech" ? skipPageBwd : prevPage}
    >
      Back
    </button>
  )}

  {/* Next Button Logic */}
  {(currentPage < 5) && (
    <button
      className="nav-button next-button"
      onClick={currentPage === 3 && branch === "Btech" ? skipPageFwd : nextPage}
    >
      Next
    </button>
  )}

  {/* Submit Button Logic */}
  {(currentPage === 5) && (
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