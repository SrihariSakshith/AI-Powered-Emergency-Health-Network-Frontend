import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Login from './Login.js'; // Import Login component
import Nav from './Nav.js'; // Import Nav component
import Home from './Home.js';
import Hospitals from './Hospitals.js';
import Donors from './Donors.js';
import DonorForm from './DonorForm.js';
import Contact from './Contact.js';
import ContactList from './ContactList.js';
import DonorList from './DonorList.js';
import HospitalProfile from './HospitalProfile.js';
import PatientProfile from './PatientProfile.js';
import Footer from './Footer.js';
import "./css/Chat.css";
import ChatClient from "./ChatClient.js"; // Updated import path

const App = () => {
  const [username, setUsername] = useState('');
  const [role, setRole] = useState(''); 

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    const storedRole = localStorage.getItem('role');
    if (storedUsername && storedRole) {
      setUsername(storedUsername);
      setRole(storedRole);
    } else {
      setUsername('guest');
      setRole('guest');
    }
  }, []);

  const handleLoginSuccess = (username, role) => {
    setUsername(username);
    setRole(role);
    localStorage.setItem('username', username);
    localStorage.setItem('role', role); 
  };

  const handleLogout = () => {
    setUsername('guest');
    setRole('guest');
    localStorage.removeItem('username');
    localStorage.removeItem('role');
  };

  return (
    <Router
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <div className="App">
        <Routes>
          <Route
            path="/Login"
            element={<Login onLoginSuccess={handleLoginSuccess} />}
          />

          <Route
            path="/Hospitals"
            element={
              !username || username === 'guest' ? (
                <Login onLoginSuccess={handleLoginSuccess} />
              ) : (
                <div>
                  <Nav username={username} role={role} onLogout={handleLogout} />
                  <Hospitals username={username} role={role}/>
                  <Footer />
                </div>
              )
            }
          />
          <Route
            path="/Donors"
            element={
              !username || username === 'guest' ? (
                <Login onLoginSuccess={handleLoginSuccess} />
              ) : (
                <div>
                  <Nav username={username} role={role} onLogout={handleLogout} />
                  <Donors username={username} role={role}/>
                  <Footer />
                </div>
              )
            }
          />
          <Route
            path="/Donorform"
            element={
              !username || username === 'guest' ? (
                <Login onLoginSuccess={handleLoginSuccess} />
              ) : (
                <div>
                  <Nav username={username} role={role} onLogout={handleLogout} />
                  <div style={{ minHeight: '20vh' }}></div>
                  <DonorForm username={username} role={role}/>
                  <div style={{ minHeight: '20vh' }}></div>
                  <Footer />
                </div>
              )
            }
          />
          <Route
            path="/Contact"
            element={
              !username || username === 'guest' ? (
                <Login onLoginSuccess={handleLoginSuccess} />
              ) : (
                <div>
                  <Nav username={username} role={role} onLogout={handleLogout} />
                  <div style={{ minHeight: '20vh' }}></div>
                  <Contact />
                  <div style={{ minHeight: '20vh' }}></div>
                  <Footer />
                </div>
              )
            }
          />
          <Route
            path="/Contactlist"
            element={
              role !== 'admin' ? (
                <Link to="/" />  
              ) : !username || username === 'guest' ? (
                <Login onLoginSuccess={handleLoginSuccess} />
              ) : (
                <div>
                  <Nav username={username} role={role} onLogout={handleLogout} />
                  <ContactList />
                  <Footer />
                </div>
              )
            }
          />
          <Route
            path="/Donorlist"
            element={
              role !== 'admin' ? (
                <Link to="/" />  
              ) : !username || username === 'guest' ? (
                <Login onLoginSuccess={handleLoginSuccess} />
              ) : (
                <div>
                  <Nav username={username} role={role} onLogout={handleLogout} />
                  <DonorList />
                  <Footer />
                </div>
              )
            }
          />
          <Route
            path="/Patientprofile"
            element={
             role==='patient' ? (
                  <div>
                    <Nav username={username} role={role} onLogout={handleLogout} />
                    <div style={{ minHeight: '10vh' }}></div>
                    <PatientProfile username={username}/>
                    <div style={{ minHeight: '10vh' }}></div>
                    <Footer />
                  </div>
             ):(
                  <div>
                    <Nav username={username} role={role} onLogout={handleLogout} />
                    No Patient Profile
                    <Footer />
                  </div>
             )
            }
          />
          <Route
            path="/Hospitalprofile"
            element={
             role==='hospital' ? (
                  <div>
                    <Nav username={username} role={role} onLogout={handleLogout} />
                    <div style={{ minHeight: '10vh' }}></div>
                    <HospitalProfile username={username}/>
                    <div style={{ minHeight: '10vh' }}></div>
                    <Footer />
                  </div>
             ):(
                  <div>
                    <Nav username={username} role={role} onLogout={handleLogout} />
                    No Hospital Profile
                    <Footer />
                  </div>
             )
            }
          />
          <Route
            path="/"
            element={
              !username || username === 'guest' ? (
                <Login onLoginSuccess={handleLoginSuccess} />
              ) : (
                <div>
                  <Nav username={username} role={role} onLogout={handleLogout} />
                  <Home />
                  <Footer />
                </div>
              )
            }
          />
          <Route
            path="/Chat"
            element={
              <ChatClient username={username} role={role} onLogout={handleLogout} />
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
