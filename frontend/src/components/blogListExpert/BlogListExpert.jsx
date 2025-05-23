import React, { useEffect, useState } from 'react';
import BlogCardExpert from '../blogCardExpert/BlogCardExpert.jsx';
import './BlogListExpert.scss';
import newRequest from '../../utils/newRequest';
import { useNavigate } from 'react-router-dom';

const BlogListExpert = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null); // Track logged-in user data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Used for navigation



  // Fetch user's blogs
  useEffect(() => {
    const fetchUserBlogs = async () => {
      try {
        const response = await newRequest.get('/api/posts/user', {
          withCredentials: true,
        });
        setBlogs(response.data);
      } catch (error) {
        setError('An error occurred while fetching blogs');
      } finally {
        setLoading(false);
      }
    };

    fetchUserBlogs();
  }, []);

  const handleBlogClick = (id) => {
    navigate(`/blog/${id}`); // Navigate to blog detail page
  };

  if (loading) return <p>Loading blogs...</p>;

  return (
    <div className="blog-list">
      {error && <p className="error">{error}</p>}
      
      {/* Display user greeting */}
      <h1 className='greeting'>Hey! These are all your posts</h1>
      {/* Display blogs */}
      <div className="blogs-container">
        {blogs.length > 0 ? (
          blogs.map((blog) => (
            <BlogCardExpert
              key={blog._id}
              title={blog.title}
              onClick={() => handleBlogClick(blog._id)} // Pass the blog ID to navigate
            />
          ))
        ) : (
          <p>No blogs available</p>
        )}
      </div>
    </div>
  );
};

export default BlogListExpert;
