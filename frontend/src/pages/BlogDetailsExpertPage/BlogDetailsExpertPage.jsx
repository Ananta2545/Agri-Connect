import React from 'react'
import ExpertSidebar from '../../components/expertSidebar/ExpertSidebar.jsx'
import BackToExpertHome from '../../components/backToExpertHome/BackToExpertHome.jsx'

import './BlogDetailsExpertPage.scss';
import BlogDetailExpert from '../../components/blogDetailExpert/BlogDetailExpert.jsx';


const BlogDetailsExpertPage = () => {
  return (
    <div className='blog-details-expert-page'>
        <div className="left">
            <ExpertSidebar/>
        </div>
        <div className="right">
            <div className="top">
                <BackToExpertHome/>
            </div>
            <div className="bottom">
                <BlogDetailExpert/>
            </div>
        </div>
    </div>
  )
}

export default BlogDetailsExpertPage