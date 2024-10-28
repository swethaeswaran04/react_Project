// Login.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [formErrors, setFormErrors] = useState({});
  const navigate = useNavigate();

  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundImage: 'url("https://media.licdn.com/dms/image/C5612AQGEie4gcTFmxQ/article-cover_image-shrink_720_1280/0/1622620199901?e=2147483647&v=beta&t=GmJa0tKELeJzg_RseMNQbJVI4Sci1RfXWn-CnJ4LzTc")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  const formContainerStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    padding: '50px',
    borderRadius: '12px',
    boxShadow: '0 6px 12px rgba(0, 0, 0, 0.3)',
    textAlign: 'center',
    maxWidth: '400px',
    width: '100%',
  };

  const inputStyle = {
    padding: '12px',
    margin: '10px 0',
    borderRadius: '4px',
    border: '1px solid #ccc',
    fontSize: '16px',
  };

  const buttonStyle = {
    padding: '14px',
    backgroundColor: '#021526',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
    marginTop: '20px',
    transition: 'background-color 0.3s ease',
  };

  const buttonHoverStyle = {
    backgroundColor: '#03346E',
  };

  const validateForm = () => {
    const errors = {};
    if (!email) errors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) errors.email = 'Email is invalid';
    if (!password) errors.password = 'Password is required';
    return errors;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      try {
        // Fetch users from JSON server
        const response = await axios.get('http://localhost:3001/users');
        const users = response.data;

        // Check if user exists with matching email and password
        const user = users.find((user) => user.email === email && user.password === password);

        if (user) {
          navigate('/main');
        } else {
          setError('Invalid email or password');
        }
      } catch (error) {
        console.error('Error logging in:', error);
        setError('An error occurred while logging in');
      }
    }
  };

  return (
    <div style={containerStyle}>
      <div style={formContainerStyle}>
        <h1>Login</h1>
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column' }}>
          <label>
            <b>Email</b>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={inputStyle}
              required
            />
            {formErrors.email && <p style={{ color: 'red' }}>{formErrors.email}</p>}
          </label>
          <label>
            <b>Password</b>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={inputStyle}
              required
            />
            {formErrors.password && <p style={{ color: 'red' }}>{formErrors.password}</p>}
          </label>
          <button
            type="submit"
            style={buttonStyle}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor}
          >
            Login
          </button>
        </form>
        {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
        <Link to="/signup" style={{ display: 'block', marginTop: '20px', color: '#007bff', textDecoration: 'none' }}>
          Don't have an account? Sign Up
        </Link>
      </div>
    </div>
  );
};

export default Login;
