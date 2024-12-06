import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import required components
import UserDashboard from './pages/user/userDb';
import UserPage from "./pages/user/userPage";
import AdminDashboard from './pages/admin/adminPage';
import AddStudent from './components/adminComps/addStudent';

function App() {
  return (
    <Router> {/* Wrap your app in BrowserRouter */}
      <div className="App">
        {/* Set up routes using Routes */}
        <Routes>
          <Route path="/" element={<UserPage />} /> {/* Route for UserPage at root */}
          <Route path="/user-dashboard" element={<UserDashboard />} /> {/* Route for UserDashboard */}
          <Route path= "/admin-dashboard" element={<AdminDashboard/>} /> 
          <Route path= "/add-student" element={<AddStudent/>} />


        </Routes>
      </div>
    </Router>
  );
}

export default App;
