

  import Fa_mgmt_img from "./res/Faculty_mgmt_image.jpg";
import { useState } from "react";
import "./AdminDashboard.css";
import { useNavigate } from "react-router-dom"; 
import AdminTitleBar from "./AdminTitleBar";



export default function AdminDashboard({services}) {
  let navigate = useNavigate();
  const [service, setServices] = useState(services);
  

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
