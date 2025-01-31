import { useState } from "react";
import { Menu } from "lucide-react";
import { motion } from "framer-motion";
import "./AdminDashboard.css";

const services = [
  { title: "Student Records", description: "Manage student data efficiently.", image: "https://via.placeholder.com/100" },
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
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="menu-button">
          <Menu size={28} />
        </button>
        <h1>IST Student Records</h1>
      </div>

      {/* Sidebar */}
      <motion.div
        initial={{ x: -250 }}
        animate={{ x: sidebarOpen ? 0 : -250 }}
        transition={{ duration: 0.3 }}
        className="sidebar"
      >
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
