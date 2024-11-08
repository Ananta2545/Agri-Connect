import React from 'react';
import { useNavigate } from 'react-router-dom';
import './BackToPosts.scss'; // Optional: for custom styling

const BackToPosts= () => {
    const navigate = useNavigate();

    const handleBackToHome = () => {
        navigate('/viewMyBlogs'); // Redirect to /viewMyBlogs
    };

    return (
        <div className='back-to-posts'>
            <button onClick={handleBackToHome} className='back-button'>
                Back to Posts
            </button>
        </div>
    );
};

export default BackToPosts;
