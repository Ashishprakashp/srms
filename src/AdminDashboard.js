

  import Fa_mgmt_img from "./res/Faculty_mgmt_image.jpg";
import { useState } from "react";
import "./AdminDashboard.css";
import { useNavigate } from "react-router-dom"; 
import AdminTitleBar from "./AdminTitleBar";



export default function AdminDashboard({ services }) {
  let navigate = useNavigate();
  const branch = sessionStorage.getItem("branch");

  // Filter semesters based on branch
  const filteredServices = services[0]?.title.includes("Semester")
    ? branch === "MCA" || branch === "Mtech"
      ? services.slice(0, 4) // Show only 4 semesters
      : services // Show all 8 semesters
    : services; // If services are not semesters, show everything

  const handleServiceClick = (serviceTitle, serviceDesc) => {
    if (serviceTitle === "Faculty Management") {
      navigate("/faculty-dashboard/select-activity");
    } else if (serviceTitle === "Student Management") {
      navigate("/student-dashboard/select-activity");
    } else if (serviceTitle === "Create Credentials" && serviceDesc === "Admin Create") {
      navigate("/faculty-dashboard/select-activity/faculty-management");
    } else if (serviceTitle === "Reset Credentials" && serviceDesc === "Admin Reset") {
      navigate("/faculty-dashboard/select-activity/reset-credentials");
    } else if (serviceTitle === "Create Credentials" && serviceDesc === "Student Create") {
      navigate("/faculty-dashboard/select-activity/student-management");
    } else if (serviceTitle === "Reset Credentials" && serviceDesc === "Student Reset") {
      navigate("/faculty-dashboard/select-activity/student-reset-credentials");
    }else if(serviceTitle.includes("Semester") && serviceDesc==="Form"){
      const semesterNumber = serviceTitle.split(" ")[1]; // Extract semester number
      navigate(`/semester-form/${semesterNumber}`);
    }else if(serviceTitle.includes("Semester") && serviceDesc==="Enroll"){
      const semesterNumber = serviceTitle.split(" ")[1]; // Extract semester number
      navigate(`/semester-enroll/${semesterNumber}`);
    }else if(serviceTitle === "Finalize grades"){
      navigate("/admin-dashboard/select-activity/finalize-grades");
    }else if(serviceDesc === "Finalize Grades"){
      navigate(`/admin-dashboard/select-activity/finalize-grades/${serviceTitle}`);
    }
  };

  return (
    <div className="container">
      {/* Title Bar */}
      <AdminTitleBar title={"IST Student Records Admin"} />

      {/* Main Content */}
      <div className="main-content">
        <div className="card-container">
          {filteredServices.map((service, index) => (
            <div key={index} className="card" onClick={() => handleServiceClick(service.title, service.description)}>
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

