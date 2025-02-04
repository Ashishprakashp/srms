import './App.css';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import AdminLogin from './AdminLogin';
import AdminDashboard from './AdminDashboard';
import FacultyManagement from './FacultyManagement';
import Fa_mgmt_img from "./res/Faculty_mgmt_image.jpg";
import StudentForm from './StudentForm';

function App() {
  const services1 = [
    { title: "Faculty Management", description: "", image: Fa_mgmt_img },
    { title: "Student Management", description: "Track student attendance seamlessly.", image: "https://via.placeholder.com/100" },
    { title: "Grades & Exams", description: "Monitor and update student performance.", image: "https://via.placeholder.com/100" },
    { title: "Notifications", description: "Send important updates to students.", image: "https://via.placeholder.com/100" }
  ];
  const services2 = [
    { title: "Create Credentials", description: "", image: Fa_mgmt_img },
    { title: "Reset Credentials", description: "", image: "https://via.placeholder.com/100" },
    { title: "Edit Details", description: "", image: "https://via.placeholder.com/100" },
    { title: "Notifications", description: "Send important updates to students.", image: "https://via.placeholder.com/100" }
  ];
  return(
  <Router>
    <Routes>
      <Route path='/' element={<AdminLogin/>}/>
      <Route path='/admin-dashboard' element={<AdminDashboard services={services1}/>}/>
      <Route path='/select-activity' element={<AdminDashboard services={services2}/>}/>
      <Route path='/faculty-management' element={<FacultyManagement/>}/>
    </Routes>
  </Router>
  );
}

export default App;
