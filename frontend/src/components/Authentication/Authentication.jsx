import React, { useRef, useState } from 'react';
import './authentication.scss';
import { useNavigate } from 'react-router-dom'; // assuming you're using React Router

const Authentication = ({ setUserRole }) => {
  const containerRef = useRef(null);
  const navigate = useNavigate();
  const [role, setRole] = useState('farmer'); // Default role is farmer

  const handleRegisterClick = () => {
    containerRef.current.classList.add('active');
  };

  const handleLoginClick = () => {
    containerRef.current.classList.remove('active');
  };

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Set user role before navigating
    setUserRole(role);

    // Redirect based on the role
    if (role === 'farmer') {
      navigate('/farmer_home');
    } else {
      navigate('/expert_home');
    }
  };

  return (
    <div ref={containerRef} className="container" id="container">
      <div className="form-container sign-up">
        <form onSubmit={handleSubmit}>
          <h1>Create Account</h1>
          <input type="text" placeholder="Name" required />
          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="Password" required />
          <select value={role} onChange={handleRoleChange}>
            <option value="farmer">Farmer</option>
            <option value="expert">Agriculture Expert</option>
          </select>
          <button type="submit">Sign Up</button>
        </form>
      </div>
      <div className="form-container sign-in">
        <form onSubmit={handleSubmit}>
          <h1>Sign In</h1>
          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="Password" required />
          <a href="#">Forgot Your Password?</a>
          <select value={role} onChange={handleRoleChange}>
            <option value="farmer">Farmer</option>
            <option value="expert">Agriculture Expert</option>
          </select>
          <button type="submit">Sign In</button>
        </form>
      </div>
      <div className="toggle-container">
        <div className="toggle">
          <div className="toggle-panel toggle-left">
            <h1>Welcome Back!</h1>
            <p>Enter your personal details to use all site features</p>
            <button onClick={handleLoginClick} className="hidden" id="login">
              Sign In
            </button>
          </div>
          <div className="toggle-panel toggle-right">
            <h1>Hello, Friend!</h1>
            <p>Register with your personal details to use all site features</p>
            <button
              className="hidden"
              id="register"
              onClick={handleRegisterClick}
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Authentication;
