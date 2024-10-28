// SignUp.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
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

  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
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
    if (!username.trim()) errors.username = 'Username is required';
    if (!email) errors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) errors.email = 'Email is invalid';
    if (!password) errors.password = 'Password is required';
    else if (password.length < 6) errors.password = 'Password must be at least 6 characters';
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    setErrors(formErrors);

    if (Object.keys(formErrors).length === 0) {
      const user = { username, email, password };
      try {
        await axios.post('http://localhost:3001/users', user);
        navigate('/mainpage');
      } catch (error) {
        console.error('Error registering user:', error);
      }
    }
  };

  return (
    <div style={containerStyle}>
      <div style={formContainerStyle}>
        <h1>Create an Account</h1>
        <form onSubmit={handleSubmit} style={formStyle}>
          <label>
            <b>Username</b>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={inputStyle}
              required
            />
            {errors.username && <p style={{ color: 'red' }}>{errors.username}</p>}
          </label>
          <label>
            <b>Email</b>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={inputStyle}
              required
            />
            {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
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
            {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}
          </label>
          <button
            type="submit"
            style={buttonStyle}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor}
          >
            Sign Up
          </button>
        </form>
        <Link to="/" style={{ display: 'block', marginTop: '20px', color: '#007bff', textDecoration: 'none' }}>
          Back to Home
        </Link>
        <Link to="/login" style={{ display: 'block', marginTop: '10px', color: '#007bff', textDecoration: 'none' }}>
          Already have an account? Login
        </Link>
      </div>
    </div>
  );
};

export default SignUp;
