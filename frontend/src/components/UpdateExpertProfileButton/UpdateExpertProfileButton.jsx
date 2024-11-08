import React from 'react';
import { useNavigate } from 'react-router-dom';
import './UpdateExpertProfileButton.scss'; // Optional: for custom styling

const UpdateExpertProfileButton = () => {
    const navigate = useNavigate();

    const handleUpdateButtonClick = () => {
        navigate('/update-expert-profile'); 
    };

    return (
        <div className='update-profile-button'>
            <button onClick={handleUpdateButtonClick} className='update-button'>
                Update Profile
            </button>
        </div>
    );
};

export default UpdateExpertProfileButton;
