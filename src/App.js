import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import required components
import UserDashboard from './pages/user/userDb';
import UserLogin from "./pages/user/userPage";
import AdminDashboard from './pages/admin/adminDashboard';


import AdminLogin from './pages/admin/adminLogin';
function App() {
  return (
    <Router> {/* Wrap your app in BrowserRouter */}
      <div className="App">
        {/* Set up routes using Routes */}
        <Routes>
          <Route path="/" element={<AdminLogin/>} /> {/* Route for UserPage at root */}
          <Route path="/user-login" element={<UserLogin/>} />
          <Route path="/user-dashboard" element={<UserDashboard />} /> {/* Route for UserDashboard */}
          <Route path= "/admin-dashboard" element={<AdminDashboard/>} />
          
   

        </Routes>
      </div>
    </Router>
  );
}

export default App;
