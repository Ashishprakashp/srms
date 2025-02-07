

  import Fa_mgmt_img from "./res/Faculty_mgmt_image.jpg";
import { useState } from "react";
import "./AdminDashboard.css";
import { useNavigate } from "react-router-dom"; 
import AdminTitleBar from "./AdminTitleBar";



export default function AdminDashboard({services}) {
  let navigate = useNavigate();
  const [service, setServices] = useState(services);
  

  const handleServiceClick= (serviceTitle,serviceDesc)=>{
    if(serviceTitle==="Faculty Management"){
      setServices([...services]);
      navigate('/faculty-dashboard/select-activity');  
      
    }
    if(serviceTitle==="Student Management"){
      setServices([...services]);
      navigate('/student-dashboard/select-activity');  
      
    }
    if(serviceTitle==="Create Credentials" && serviceDesc==="Admin Create"){
      setServices([...services]);
      navigate('/faculty-dashboard/select-activity/faculty-management');
      
    }
    if(serviceTitle==="Reset Credentials" && serviceDesc==="Admin Reset"){
      setServices([...services]);
      navigate('/faculty-dashboard/select-activity/reset-credentials');
      
    }
    if(serviceTitle==="Create Credentials" && serviceDesc==="Student Create"){
      setServices([...services]);
      navigate('/faculty-dashboard/select-activity/student-management');
      
    }
    if(serviceTitle==="Reset Credentials" && serviceDesc==="Student Reset"){
      setServices([...services]);
      navigate('/faculty-dashboard/select-activity/student-reset-credentials');
      
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
            <div key={index} className="card" onClick={()=>handleServiceClick(service.title,service.description)}>
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
