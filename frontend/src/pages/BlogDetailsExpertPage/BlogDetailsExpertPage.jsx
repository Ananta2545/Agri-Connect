import React from 'react'
import ExpertSidebar from '../../components/expertSidebar/ExpertSidebar.jsx'
import './BlogDetailsExpertPage.scss';
import BlogDetailExpert from '../../components/blogDetailExpert/BlogDetailExpert.jsx';
import BackToPosts from '../../components/backToPosts/BackToPosts.jsx';


const BlogDetailsExpertPage = () => {
  return (
    <div className='blog-details-expert-page'>
        <div className="left">
            <ExpertSidebar/>
        </div>
        <div className="right">
            <div className="top">
                <BackToPosts/>
            </div>
            <div className="bottom">
                <BlogDetailExpert/>
            </div>
        </div>
    </div>
  )
}

export default BlogDetailsExpertPage