import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import newRequest from '../../utils/newRequest.js';
import './BlogDetailsFarmer.scss';

const BlogDetailsFarmer = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await newRequest.get(`/api/posts/${id}`);
                setPost(response.data);
            } catch (err) {
                console.error("Error fetching post details", err);
            }
        };
        fetchPost();
    }, [id]);

    const handleBackToHome = () => {
        navigate('/');
    };

    return (
        <div className='blogDetails'>
            {post ? (
                <>
                    <h1>{post.title}</h1>
                    <p>{post.content}</p>
                </>
            ) : (
                <p>Loading post details...</p>
            )}
            <button className="backButton" onClick={handleBackToHome}>
                Back to Home
            </button>
        </div>
    );
};

export default BlogDetailsFarmer;
