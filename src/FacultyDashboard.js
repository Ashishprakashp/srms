

import Fa_mgmt_img from "./res/Faculty_mgmt_image.jpg";
import { useState,useEffect } from "react";
import "./AdminDashboard.css";
import { useNavigate } from "react-router-dom"; 
import AdminTitleBar from "./AdminTitleBar";
import axios from "axios";



export default function FacultyDashboard({services}) {
  let navigate = useNavigate();
  const [service, setServices] = useState(services);
  

  const fetchAccountStatus = async()=>{
    const facultyId = sessionStorage.getItem("facultyId");
    console.log(facultyId);
    const response = await axios.get("http://localhost:5000/faculty",{params: {facultyId:facultyId}});
    console.log(response.data);
    if(response.data[0].reset===0){
        console.log("Password is not reset!");
        
    }else{
        console.log("Password is reset!");
    }
  }

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
    <div className="container">
      {/* Title Bar */}
      <AdminTitleBar title={"IST Student Records Faculty"}/>

      {/* Main Content */}
      <div className="main-content">
        <div className="card-container">
          {services.map((service, index) => (
            <div key={index} className="card" onClick={()=>handleServiceClick(service.title)}>
              <img src={service.image} alt={service.title} className="card-image" />
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </div>
          ))}
        </div>
        <div className="card-container">
        <h2>Enter new Password</h2>
        <form>
          <input type="password" name="pwd1" placeholder="Enter password"/>
          <input type="password" name="pwd2" placeholder="Re-enter password"/>
        </form>
      </div>
      </div>
      
    </div>
  );
}
