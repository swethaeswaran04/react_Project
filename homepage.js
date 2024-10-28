//Home.js
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    //background: 'linear-gradient(to bottom, #87CEEB, #000)', // Gradient background
    backgroundImage: "url('https://qa-www.appointy.com/online-booking-software/uploads/2020/10/Customer-scheduling-an-online-appointment.svg')",
    
    backgroundSize: 'cover', // Ensures the image covers the entire container
  backgroundRepeat: 'no-repeat', // Prevents the image from repeating
  backgroundPosition: 'center', // Centers the image
    color: '#fff',
    textAlign: 'center',
    padding: '20px',
    boxSizing: 'border-box',
  };

  const headerStyle = {
    width: '100%',
    backgroundColor: '#021526', // Header background color
    color: '#fff',
    padding: '20px 0',
    textAlign: 'center',
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: 1000,
  };

  const headingStyle = {
    fontSize: '2rem',
    margin: 0,
    fontWeight: 'bold',
    textShadow: '2px 2px 5px rgba(1, 1, 1, 2)',
    color:'#2E236C',
  };

  const headings = {
    fontSize: '2rem',
    margin: 0,
    fontWeight: 'bold',
    textShadow: '2px 2px 5px rgba(1, 1, 1, 2)',
    
  };

  const containerInnerStyle = {
    marginTop: '60px', // Space for fixed header
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const linkStyle = {
    color: '#fff',
    textDecoration: 'none',
    fontSize: '1.5rem',
    padding: '10px 20px',
    borderRadius: '5px',
    backgroundColor: '#021526', // Button color
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    transition: 'background-color 0.3s, color 0.3s',
  };

  const linkHoverStyle = {
    backgroundColor: '#03346E', // Hover color
    color: '#fff',
  };

  return (
    <>
      <header style={headerStyle}>
        <h1 style={headings}>Scheduling Planner</h1>
      </header>
      <div style={containerStyle}>
        <div style={containerInnerStyle}>
          <h2 style={headingStyle}>Welcome to the Scheduling Planner</h2>
          <br></br>
          <br></br>
          <div>
            <Link 
              to="/login" 
              style={linkStyle} 
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = linkHoverStyle.backgroundColor;
                e.currentTarget.style.color = linkHoverStyle.color;
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = '#021526'; // Reset to original color
                e.currentTarget.style.color = '#fff'; // Reset to original color
              }}
            >
              Login
            </Link>
            <span style={{ margin: '0 10px', color: '#fff' }}>or</span>
            <Link 
              to="/signup" 
              style={linkStyle} 
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = linkHoverStyle.backgroundColor;
                e.currentTarget.style.color = linkHoverStyle.color;
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = '#021526'; // Reset to original color
                e.currentTarget.style.color = '#fff'; // Reset to original color
              }}
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
