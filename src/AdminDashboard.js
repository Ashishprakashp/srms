import { useState } from "react";
import { Menu } from "lucide-react";
import { motion } from "framer-motion";
import closeIcon from "./res/close.png";
import Fa_mgmt_img from "./res/Faculty_mgmt_image.jpg";
import Uni_logo from "./res/AnnaUniLogo.png";
import "./AdminDashboard.css";

const services = [
  { title: "Faculty Management", description: "", image: Fa_mgmt_img },
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
        <img src={Uni_logo} width="50px" height="50px" alt="University Logo" />
        <h1>IST Student Records Admin</h1>

        {/* Navigation Boxes (Visible on Large Screens) */}
        <div className="nav-links">
          <button className="nav-box">Dashboard</button>
          <button className="nav-box">Settings</button>
          <button className="nav-box">Profile</button>
        </div>

        {/* Menu Button (Visible on Small Screens) */}
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="menu-button">
          <Menu size={28} />
        </button>
      </div>

      {/* Sidebar (Fixed Animation) */}
      <motion.div
        initial={{ right: "-250px" }}  /* Initially hidden */
        animate={{ right: sidebarOpen ? "0px" : "-250px" }}  /* Slide when toggled */
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
