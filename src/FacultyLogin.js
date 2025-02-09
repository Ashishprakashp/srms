// login.js (React Version with Fullscreen Updates)

import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import placeholderImage from './res/placeholder2.jpg'; // Add a placeholder image
import './styles/AdminLogin.css'
import AdminDashboard from './AdminDashboard';
import AdminTitleBar from './AdminTitleBar';


function FacultyLogin() {
  let navigate = useNavigate();
  const [facultyId, setFacultyId] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (event) => {
    event.preventDefault();
    sessionStorage.setItem("facultyId", facultyId); 
    navigate('/faculty-dashboard');
    // if (email && password) {
    //   console.log(`Email: ${email}, Password: ${password}`);
    //   // Add your login logic here
    // } else {
    //   alert('Please fill in all fields');
    // }
  };

  return (
    
    <div className="login-container">
      <AdminTitleBar title="IST Student Records Faculty"/>
      <div className="illustration">
        <img src={placeholderImage} alt="Illustration" />
      </div>
      <form className="form-section" onSubmit={handleLogin}>
        <h2 id='title'>IST Student Records</h2>
        <h2>Faculty Login</h2>
        <input
          type="text"
          id="email"
          placeholder="Faculty Id"
          value={facultyId}
          onChange={(e) => setFacultyId(e.target.value)}
        />
        <input
          type="password"
          id="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button id="login-button" type="submit">Login</button>
      </form>
    </div>
  );
}

export default FacultyLogin;