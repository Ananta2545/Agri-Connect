import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import newRequest from '../../utils/newRequest';
import './BlogDetailExpert.scss';

const BlogDetailExpert = () => {
  const { id } = useParams(); // Get blog ID from URL
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false); // Track if we're editing the blog
  const [updatedTitle, setUpdatedTitle] = useState('');
  const [updatedContent, setUpdatedContent] = useState('');
  const navigate = useNavigate();

  // Fetch blog details
  useEffect(() => {
    const fetchBlogDetails = async () => {
      try {
        const response = await newRequest.get(`/api/posts/${id}`, {
          withCredentials: true,
        });
        setBlog(response.data);
        setUpdatedTitle(response.data.title);
        setUpdatedContent(response.data.content);
      } catch (error) {
        setError('Error fetching blog details');
      } finally {
        setLoading(false);
      }
    };

    fetchBlogDetails();
  }, [id]);

  const handleUpdateClick = () => {
    setIsEditing(true); // Switch to edit mode
  };

  const handleSaveClick = async () => {
    try {
      const response = await newRequest.patch(`/api/posts/${id}`, {
        title: updatedTitle,
        content: updatedContent,
      }, {
        withCredentials: true,
      });

      // Immediately update the state with the updated blog
      setBlog(response.data.post);
      setIsEditing(false); // Switch back to view mode after saving
    } catch (error) {
      setError('Error updating blog');
    }
  };

  const handleCancelClick = () => {
    setIsEditing(false); // Cancel editing and revert to initial blog data
    setUpdatedTitle(blog.title);
    setUpdatedContent(blog.content);
  };

  const handleDeleteClick = async () => {
    try {
      await newRequest.delete(`/api/posts/${id}`, {
        withCredentials: true,
      });
      navigate('/'); // Redirect to the homepage or blog list after deletion
    } catch (error) {
      setError('Error deleting blog');
    }
  };

  if (loading) return <p>Loading blog...</p>;

  return (
    <div className="blog-detail">
      {error && <p className="error">{error}</p>}
      {blog && (
        <>
          {isEditing ? (
            <>
              <input
                type="text"
                value={updatedTitle}
                onChange={(e) => setUpdatedTitle(e.target.value)}
                className="input-title"
              />
              <textarea
                value={updatedContent}
                onChange={(e) => setUpdatedContent(e.target.value)}
                className="textarea-content"
              />
              <div className="buttons">
                <button onClick={handleSaveClick}>Save</button>
                <button onClick={handleCancelClick}>Cancel</button>
              </div>
            </>
          ) : (
            <>
              <h1>{blog.title}</h1>
              <p>{blog.content}</p>
              <div className="buttons">
                <button onClick={handleUpdateClick}>Update</button>
                <button onClick={handleDeleteClick}>Delete</button>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default BlogDetailExpert;
