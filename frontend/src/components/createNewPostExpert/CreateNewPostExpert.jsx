import React, { useState } from 'react'
// import axios from 'axios'
import './CreateNewPostExpert.scss'
import newRequest from '../../utils/newRequest.js'


const CreateNewPostExpert = () => {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [message, setMessage] = useState('')

    const handleSubmit = async(e)=>{
        e.preventDefault();
        try{
            // const token = localStorage.getItem('userRole');
            const response = await newRequest.post('/api/posts/create', {
                title, content
            });
            setMessage(response.data.message);
            setTitle('');
            setContent('');
        }catch(err){
            setMessage(err.response ? err.response.data.message : 'Something went wrong');
        }
        
    }

  return (
    <div className='create-post-container'>
        <h2>Create new post</h2>
        <form onSubmit={handleSubmit} className="create-post-form">
            {message && <p className="message">{message}</p>}
        
            <label htmlFor="title">Title</label>
            <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter post title"
            required
            />

            <label htmlFor="content">Content</label>
            <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Enter post content"
            required
            ></textarea>

            <button type="submit">Create Post</button>
        </form>
        
    </div>
  )
}

export default CreateNewPostExpert
