

  import Fa_mgmt_img from "./res/Faculty_mgmt_image.jpg";

import "./AdminDashboard.css";
import { useNavigate } from "react-router-dom"; 
import AdminTitleBar from "./AdminTitleBar";



export default function AdminDashboard({services}) {
  let navigate = useNavigate();
  

  const handleServiceClick= (serviceTitle)=>{
    if(serviceTitle==="Faculty Management"){
      navigate('/select-activity');  
    }
    if(serviceTitle==="Create Credentials"){
      navigate('/faculty-management');
    }
  }
  return (
    <div className="container">
      {/* Title Bar */}
      <AdminTitleBar title={"IST Student Records Admin"}/>

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
