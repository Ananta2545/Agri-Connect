import React from 'react';
import { useNavigate } from 'react-router-dom';
import './BackToHome.scss'; // Optional: for custom styling

const BackToHome = () => {
    const navigate = useNavigate();

    const handleBackToHome = () => {
        navigate('/farmer_home'); // Redirect to /farmer_home
    };

    return (
        <div className='back-to-home'>
            <button onClick={handleBackToHome} className='back-button'>
                Back to Home
            </button>
        </div>
    );
};

export default BackToHome;
