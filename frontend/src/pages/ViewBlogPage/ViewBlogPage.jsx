import React from 'react'
import ExpertSidebar from '../../components/expertSidebar/ExpertSidebar.jsx'
import BackToExpertHome from '../../components/backToExpertHome/BackToExpertHome.jsx'

import './ViewBlogPage.scss';
import BlogListExpert from '../../components/blogListExpert/BlogListExpert.jsx';


const ViewBlogPage = () => {
  return (
    <div className='view-blog-page'>
        <div className="left">
            <ExpertSidebar/>
        </div>
        <div className="right">
            <div className="top">
                <BackToExpertHome/>
            </div>
            <div className="bottom">
                <BlogListExpert/>
            </div>
        </div>
    </div>
  )
}

export default ViewBlogPage