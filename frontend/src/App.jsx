// import React from 'react';
// import Register from './Register';
// import Login from './Login';

// const App = () => {
//   return (
//     <div>
//       <h1>Welcome to the Login System</h1>
//       <Register />
//       <Login />
//     </div>
//   );
// };

// export default App;





import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import UserDashboard from './components/UserDashboard';
import AdminDashboard from './components/AdminDashboard';
import CommunicationMethodManagement from './components/CommunicationMethodManagement';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Login />} />
          <Route path="/Navbar" element={<Navbar />} />
          <Route path="/Footer" element={<Footer />} />
          <Route path='/user-dashboard' element={<UserDashboard />} />
          <Route path='/admin-dashboard' element={<AdminDashboard />} />
          <Route path='/CommunicationMethodManagement' element={<CommunicationMethodManagement />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
