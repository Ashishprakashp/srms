

import Fa_mgmt_img from "./res/Faculty_mgmt_image.jpg";
import { useState,useEffect } from "react";
import "./styles/AdminDashboard.css";
import { useNavigate } from "react-router-dom"; 
import AdminTitleBar from "./AdminTitleBar";
import axios from "axios";
import ResetCredentials from "./components/ResetCredentials";



export default function StudentDashboard({services}) {
  let navigate = useNavigate();
  const [service, setServices] = useState(services);
  const [isPasswordReset, setIsPasswordReset] = useState(true); // Default to true

const fetchAccountStatus = async () => {
    const studentId = sessionStorage.getItem("studentId");
    console.log(studentId);
    const response = await axios.get("http://localhost:5000/student/fetch", {
        params: { userId: studentId }
    });
    sessionStorage.setItem("branch",response.data.branch);
    console.log(response.data);
    console.log(sessionStorage.getItem("branch"));
    // if (response.data[0].reset === 0) {
    //     console.log("Password is not reset!");
    //     setIsPasswordReset(false);
    // } else {
    //     console.log("Password is reset!");
    //     setIsPasswordReset(true);
    // }
};


  useEffect(()=>{
    fetchAccountStatus();
  },[]);
  
  const handleServiceClick= (serviceTitle)=>{
    if(serviceTitle==="Student Form"){
      setServices([...services]);
      navigate('/student-form');  
      
    }
    if(serviceTitle==="Semester Form"){
      setServices([...services]);
      navigate('/student-dashboard/semforms');
      
    }
    if(serviceTitle==="Reset Credentials"){
      setServices([...services]);
      navigate('/reset-credentials');
      
    }
    if(serviceTitle==="Semester Enrollment"){
      setServices([...services]);
      navigate('/semester-enroll');
      
    }
  }
  return (
    <div>
    <div className="container">
      <AdminTitleBar title={"IST Student Records Management"} />
  
      {/* Background blur overlay */}
      {!isPasswordReset && <div className="blur-overlay"></div>}
  
      {/* Main Content */}
      <div className={`main-content ${!isPasswordReset ? "blurred" : ""}`}>
        <div className="card-container">
          {services.map((service, index) => (
            <div key={index} className="card" onClick={() => handleServiceClick(service.title)}>
              <img src={service.image} alt={service.title} className="card-image" />
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </div>
          ))}
        </div>
      </div>
  
      
    </div>
    {/* Show password reset form only if password is not reset */}
    {!isPasswordReset && (
      <ResetCredentials/>
    )}
    </div>
  );
  
}
