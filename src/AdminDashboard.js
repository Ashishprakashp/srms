import { useState } from "react";
import { Menu } from "lucide-react";
import { motion } from "framer-motion";
import closeIcon from "./res/close.png";
import Fa_mgmt_img from "./res/Faculty_mgmt_image.jpg";
import "./AdminDashboard.css";

const services = [
  { title: "Faculty Management", description: "", image:Fa_mgmt_img },
  { title: "Attendance", description: "Track student attendance seamlessly.", image: "https://via.placeholder.com/100" },
  { title: "Grades & Exams", description: "Monitor and update student performance.", image: "https://via.placeholder.com/100" },
  { title: "Notifications", description: "Send important updates to students.", image: "https://via.placeholder.com/100" }
];

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="container">
      {/* Title Bar */}
      <div className="title-bar">
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="menu-button" style={{ cursor: "pointer" }}>
          <Menu size={28} />
        </button>
        <h1>IST Student Records Admin</h1>
      </div>

      {/* Sidebar */}
      <motion.div
        initial={{ x: -250 }}
        animate={{ x: sidebarOpen ? 0 : -250 }}
        transition={{ duration: 0.3 }}
        className="sidebar"
      >
        <img
          src={closeIcon}
          id="close"
          alt="Close"
          width="24px"
          height="24px"
          onClick={() => setSidebarOpen(false)}
          style={{ cursor: "pointer" }}
        />
        <ul>
          <li>Dashboard</li>
          <li>Settings</li>
          <li>Profile</li>
        </ul>
      </motion.div>

      {/* Main Content */}
      <div className="main-content">
        {/* Card Section */}
        <div className="card-container">
          {services.map((service, index) => (
            <div key={index} className="card">
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