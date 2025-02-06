import './App.css';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import AdminLogin from './AdminLogin';
import AdminDashboard from './AdminDashboard';
import FacultyDashboard from './FacultyDashboard';
import FacultyManagement from './FacultyManagement';
import FacultyLogin from './FacultyLogin';
import ResetCredentials from './ResetCredentials';
import Fa_mgmt_img from "./res/Faculty_mgmt_image.jpg";
import StudentForm from './StudentForm';

function App() {
  const services1 = [
    { title: "Faculty Management", description: "Faculty Management", image: Fa_mgmt_img },
    { title: "Student Management", description: "Student Management", image: Fa_mgmt_img },
    { title: "Grades & Exams", description: "Monitor and update student performance.", image: Fa_mgmt_img },
    { title: "Notifications", description: "Send important updates to students.", image: Fa_mgmt_img }
  ];
  const services2 = [
    { title: "Create Credentials", description: "Admin Create", image: Fa_mgmt_img },
    { title: "Reset Credentials", description: "Admin Reset", image: "https://via.placeholder.com/100" },
    { title: "Edit Details", description: "", image: "https://via.placeholder.com/100" },
    { title: "Notifications", description: "Send important updates to students.", image: "https://via.placeholder.com/100" }
  ];
  return(
  <Router>
    <Routes>
      <Route path='/' element={<AdminLogin/>}/>
      <Route path='/faculty-login' element={<FacultyLogin/>}/>
      <Route path='/faculty-dashboard' element={<FacultyDashboard services={services1}/>}/>
      <Route path='/admin-dashboard' element={<AdminDashboard services={services1}/>}/>
      <Route path='/select-activity' element={<AdminDashboard services={services2}/>}/>
      <Route path='/student-form' element={<StudentForm/>}/>
      <Route path='/faculty-management' element={<FacultyManagement/>}/>
      <Route path='/reset-credentials' element={<ResetCredentials/>}/>
    </Routes>
  </Router>
  );
}

export default App;
