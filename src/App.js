import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import required components
import UserDashboard from './components/userComps/user';
import UserPage from "./pages/user/userPage";
import TestFile from './components/userComps/test';
import AdminDashboard from './pages/admin/adminDashboard';
import AddStudent from './components/adminComps/addStudent';
import ManageRoom from './components/adminComps/manageRoom';
import Fees from './components/adminComps/fees';
import FeesManagement from './components/adminComps/fees';
import AdminLogin from './pages/admin/adminLogin';
function App() {
  return (
    <Router> {/* Wrap your app in BrowserRouter */}
      <div className="App">
        {/* Set up routes using Routes */}
        <Routes>
          <Route path="/" element={<UserPage />} /> {/* Route for UserPage at root */}
          <Route path="/dashboard" element={<UserDashboard />} /> {/* Route for UserDashboard */}
          <Route path= "/test" element={<TestFile/>} /> 
          <Route path= "/admin-dashboard" element={<AdminDashboard/>} /> 
          <Route path= "/add-student" element={<AddStudent/>} /> 

          <Route path= "/manage-room" element={<ManageRoom/>} /> 
          <Route path="/fees" element= {<FeesManagement/>}/>
          <Route path="/admin-login" element= {<AdminLogin/>}/>
   

        </Routes>
      </div>
    </Router>
  );
}

export default App;
