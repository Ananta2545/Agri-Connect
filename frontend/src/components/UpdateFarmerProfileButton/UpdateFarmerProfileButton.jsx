import React from 'react';
import { useNavigate } from 'react-router-dom';
import './UpdateFarmerProfileButton.scss'; 

const UpdateFarmerProfileButton = () => {
    const navigate = useNavigate();

    const handleUpdateButtonClick = () => {
        navigate('/update-farmer-profile'); 
    };

    return (
        <div className='update-profile-button'>
            <button onClick={handleUpdateButtonClick} className='update-button'>
                Update Profile
            </button>
        </div>
    );
};

export default UpdateFarmerProfileButton;
