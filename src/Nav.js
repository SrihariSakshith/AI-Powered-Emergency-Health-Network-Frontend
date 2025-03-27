import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './css/nav.css';

const Nav = ({ username, role }) => {
  const navigate = useNavigate(); 

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      localStorage.removeItem('username');
      localStorage.removeItem('role');
      navigate('/Login');
    }
  };

  role = role || 'guest'; 

  return (
    <header className="nav-header">
      <div className="nav-bottom">
        <div className="container">
          <Link to="/" className="nav-logo" aria-label="Home">MedReady</Link>
          <nav className="nav-navbar">
            <ul className="nav-navbar-list">
              <li><Link to="/" className="nav-navbar-link">Home</Link></li>
              <li><Link to="/Hospitals" className="nav-navbar-link">Hospitals</Link></li>
              <li>
                {role === 'admin' ? (
                  <>
                    <Link to="/Donorlist" className="nav-navbar-link">Donors List</Link>
                    <Link to="/Contactlist" className="nav-navbar-link">Queries</Link>
                  </>
                ) : (
                  role === 'patient' ? (
                    <>
                      <Link to="/Donors" className="nav-navbar-link">Find donor</Link>
                      <Link to="/Donorform" className="nav-navbar-link">Become Donor</Link>
                      <Link to="/Contact" className="nav-navbar-link">Contact</Link>
                      <Link to="/Patientprofile" className="nav-navbar-link">Profile</Link>
                    </>
                  ) : (
                    <>
                      <Link to="/Donors" className="nav-navbar-link">Find donor</Link>
                      <Link to="/Donorform" className="nav-navbar-link">Become Donor</Link>
                      <Link to="/Contact" className="nav-navbar-link">Contact</Link>
                      <Link to="/Hospitalprofile" className="nav-navbar-link">Profile</Link>
                    </>
                  )
                )}
              </li>
              <li><Link to="/Chat" className="nav-navbar-link">Chat</Link></li>
            </ul>
          </nav>
          <div className="nav-user-info">
            {username ? (
              <div className="nav-user">
                <span className="nav-username">{username}</span>
                <span className="nav-role">{role}</span>
                <button onClick={handleLogout} className="nav-btn">Logout</button>
              </div>
            ) : (
              <Link to="/Login" className="nav-btn">Login / Register</Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Nav;
