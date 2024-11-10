import React, { useRef, useState, useEffect } from 'react';
import './Authentication.scss';
import { useNavigate } from 'react-router-dom'; // assuming you're using React Router
import newRequest from '../../utils/newRequest';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Authentication = ({ setUserRole }) => {
  const containerRef = useRef(null);
  const navigate = useNavigate();
  const [role, setRole] = useState('farmer'); // Default role is farmer
  const [name,setName]=useState('')
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')

  useEffect(() => {
    const checkToken = async () => {
      try {
        const response = await newRequest.get('/api/auth/validate-token', { 
          withCredentials: true 
        });
        if (response.data && response.data.role) {
          toast.success(response.data.message)
          setUserRole(response.data.role);
          navigate(response.data.role === 'farmer' ? '/farmer_home' : '/expert_home');
        }
      } catch (error) {
        console.log("No valid token found, proceed to login/signup");
      }
    };
    checkToken();
  }, [setUserRole]);

  const handleRegisterClick = () => {
    containerRef.current.classList.add('active');
  };

  const handleLoginClick = () => {
    containerRef.current.classList.remove('active');
  };

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const handleSignup = async (e)=>{
    e.preventDefault()
    try{
      const response = await newRequest.post('/api/auth/signup',{
        name,
        email,
        password,
        role,
      },{withCredentials: true})
      toast.success(response.data.message)
      setUserRole(role)
      navigate(role === 'farmer'? '/farmer_home': 'expert_home')

    }catch(error){
      toast.error(error.response?.data?.message || 'Signup failed' )
    }
  }

  const handleSignin = async(e)=>{
    e.preventDefault()
    try{
      const response = await newRequest.post('/api/auth/signin',{
        email,
        password,
        role,
      },{withCredentials: true})
      toast.success(response.data.message)
      setUserRole(role)
      navigate(role === 'farmer'? '/farmer_home': 'expert_home')


    }catch(error){
      toast.error(error.response?.data?.message || 'Signin failed')
    }
  }

  return (
    <div ref={containerRef} className="container" id="container">
      <ToastContainer position= "top-right" autoClose= {3000} hideProgressBar draggable/>
      <div className="form-container sign-up">
        <form onSubmit={handleSignup}>
          <h1>Create Account</h1>
          <input type="text" placeholder="Name"   onChange={(e) => setName(e.target.value)}required />
          <input type="email" placeholder="Email" 
           onChange={(e) => setEmail(e.target.value)}required />
          <input type="password" placeholder="Password"  onChange={(e) => setPassword(e.target.value)} required />
          <select value={role} onChange={handleRoleChange}>
            <option value="farmer">Farmer</option>
            <option value="expert">Agriculture Expert</option>
          </select>
          <button type="submit">Sign Up</button>
        </form>
      </div>
      <div className="form-container sign-in">
        <form onSubmit={handleSignin}>
          <h1>Sign In</h1>
          <input type="email" placeholder="Email"  onChange={(e) => setEmail(e.target.value)}required />
          <input type="password" placeholder="Password"  onChange={(e) => setPassword(e.target.value)} required />
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
