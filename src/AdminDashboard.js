

import Fa_mgmt_img from "./res/Faculty_mgmt_image.jpg";

import "./AdminDashboard.css";
import { useNavigate } from "react-router-dom"; 
import AdminTitleBar from "./AdminTitleBar";

const services = [
  { title: "Faculty Management", description: "", image: Fa_mgmt_img },
  { title: "Attendance", description: "Track student attendance seamlessly.", image: "https://via.placeholder.com/100" },
  { title: "Grades & Exams", description: "Monitor and update student performance.", image: "https://via.placeholder.com/100" },
  { title: "Notifications", description: "Send important updates to students.", image: "https://via.placeholder.com/100" }
];

export default function AdminDashboard() {
  let navigate = useNavigate();
  

  const handleServiceClick= (serviceTitle)=>{
    if(serviceTitle==="Faculty Management"){
      navigate('/faculty-management');  
    }
  }
  return (
    <div className="container">
      {/* Title Bar */}
      <AdminTitleBar/>

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
      </div>
    </div>
  );
}
