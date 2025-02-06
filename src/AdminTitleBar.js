import React from "react";
import { useState } from "react";
import { Menu } from "lucide-react";
import { motion } from "framer-motion";
import closeIcon from "./res/close.png";
import Uni_logo from "./res/AnnaUniLogo.png";

export default function AdminTitleBar({title}){
    const [sidebarOpen, setSidebarOpen] = useState(false);
    return(
        <div>
        <div className="title-bar">
        <img src={Uni_logo} width="50px" height="50px" alt="University Logo" />
        <h1 style={{color:"white"}}>{title}</h1>

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
      </div>
    );
}