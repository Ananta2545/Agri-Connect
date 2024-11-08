import React from 'react';
import { useNavigate } from 'react-router-dom';
import './BackToExpertHome.scss'; // Optional: for custom styling

const BackToExpertHome = () => {
    const navigate = useNavigate();

    const handleBackToHome = () => {
        navigate('/expert_home'); // Redirect to /expert_home
    };

    return (
        <div className='back-to-home'>
            <button onClick={handleBackToHome} className='back-button'>
                Back to Home
            </button>
        </div>
    );
};

export default BackToExpertHome;
