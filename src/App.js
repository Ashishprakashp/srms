import './App.css';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import AdminLogin from './AdminLogin';
import AdminDashboard from './AdminDashboard';
import FacultyManagement from './FacultyManagement';
import StudentForm from './StudentForm';

function App() {
  return(
  <Router>
    <Routes>
      <Route path='/' element={<FacultyManagement/>}/>
      <Route path='/admin-dashboard' element={<AdminDashboard/>}/>
      <Route path='/faculty-management' element={<FacultyManagement/>}/>
    </Routes>
  </Router>
  );
}

export default App;
