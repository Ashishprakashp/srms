

import Fa_mgmt_img from "./res/Faculty_mgmt_image.jpg";
import { useState,useEffect } from "react";
import "./AdminDashboard.css";
import { useNavigate } from "react-router-dom"; 
import AdminTitleBar from "./AdminTitleBar";
import axios from "axios";
import ResetCredentials from "./components/ResetCredentials";



export default function FacultyDashboard({services}) {
  let navigate = useNavigate();
  const [service, setServices] = useState(services);
  const [isPasswordReset, setIsPasswordReset] = useState(true); // Default to true

const fetchAccountStatus = async () => {
    const facultyId = sessionStorage.getItem("facultyId");
    console.log(facultyId);
    const response = await axios.get("http://localhost:5000/faculty/fetch", {
        params: { userId: facultyId ,userName: ""}
    });
    console.log(response.data);
    if (response.data[0].reset === 0) {
        console.log("Password is not reset!");
        setIsPasswordReset(false);
    } else {
        console.log("Password is reset!");
        setIsPasswordReset(true);
    }
};


  useEffect(()=>{
    fetchAccountStatus();
  },[]);
  
  const handleServiceClick= (serviceTitle)=>{
    if(serviceTitle==="Faculty Management"){
      setServices([...services]);
      navigate('/select-activity');  
      
    }
    if(serviceTitle==="Create Credentials"){
      setServices([...services]);
      navigate('/faculty-management');
      
    }
    if(serviceTitle==="Reset Credentials"){
      setServices([...services]);
      navigate('/reset-credentials');
      
    }
  }
  return (
    <div>
    <div className="container">
      <AdminTitleBar title={"IST Student Records Faculty"} />
  
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
