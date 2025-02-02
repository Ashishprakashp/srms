import {React} from 'react';
import { useState } from 'react';
import Page1 from './Page1.js';
import Page2 from './Page2.js';
import './StudentForm.css';
import AdminTitleBar from './AdminTitleBar';

const StudentForm= () => {
    const[currentPage,setCurrentPage] = useState(1);
    const nextPage = () => setCurrentPage(currentPage+1);
    const prevPage = () => setCurrentPage(currentPage-1);
    const[formData,setFormData]= useState({
        name: '',
        email: '',
        address: '',
        city: '',
        phone: '',
    });

    const handleSubmit = () => {
        console.log('Form Data: ',formData);
    };

    const renderPage = () =>{
        switch(currentPage){
            case 1:
                return <Page1 formData={formData} setFormData={setFormData}/>;
            case 2:
                return <Page2 formData={formData} setFormData={setFormData}/>;
            default:
                return <div>Invalid Page!</div>;
        }
    };

    return(
        <div>
            {renderPage()}
            <div>
                {currentPage > 1 && (
                    <button onClick={prevPage}>Back</button>
                )}
                {currentPage <2 && (
                    <button onClick={nextPage}>Next</button>
                )}
                {currentPage ===2 && (
                    <button onClick={handleSubmit}>Submit</button>
                )}
            </div>
        </div>
    );
}

export default StudentForm;