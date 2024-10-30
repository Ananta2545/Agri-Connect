import React,{useRef} from 'react';
import './authentication.scss';

const Authentication = () => {
  const containerRef = useRef(null);

  const handleRegisterClick = ()=>{
    containerRef.current.classList.add('active');
  }

  //  This is the comment 
  const handleLoginClick = () => {
    // Remove the "active" class from the container
    containerRef.current.classList.remove('active');
  };

  return (
    <div ref={containerRef} className="container" id="container">
        <div className="form-container sign-up">
            <form>
                <h1>Create Account</h1>
                <input type="text" placeholder="Name" />
                <input type="email" placeholder="Email" />
                <input type="password" placeholder="Password" />
                <button>Sign Up</button>
            </form>
        </div>
        <div className="form-container sign-in">
            <form>
                <h1>Sign In</h1>
                <input type="email" placeholder="Email" />
                <input type="password" placeholder="Password" />
                <a href="#">Forgot Your Password?</a>
                <button>Sign In</button>
            </form>
        </div>
        <div className="toggle-container">
            <div className="toggle">
                <div className="toggle-panel toggle-left">
                    <h1>Welcome Back!</h1>
                    <p>Enter your personal details to use all site features</p>
                    <button onClick={handleLoginClick} className="hidden" id="login">Sign In</button>
                </div>
                <div className="toggle-panel toggle-right">
                    <h1>Hello, Friend!</h1>
                    <p>Register with your personal details to use all site features</p>
                    <button className="hidden" id="register" onClick={handleRegisterClick}>Sign Up</button>
                </div>
            </div>
        </div>
    </div>
  );
}

export default Authentication;
