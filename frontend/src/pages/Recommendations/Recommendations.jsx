import React from 'react'
import './Recommendations.scss'
import Sidebar from '../../components/sidebar/Sidebar.jsx'
import Navbar from '../../components/navbar/Navbar'
import Recommendation from '../../components/Recommendation/Recommendation.jsx'
import BackToHome from '../../components/backToHome/BackToHome.jsx'


const Recommendations = () => {
  return (
    <div className='recommendation-container'>
        <div className="left">
            <Sidebar/>
        </div>
        <div className="right">
            <div className="top">
              <BackToHome/>
            </div>
            <div className="bottom">
              <Recommendation/>
            </div>
        </div>
    </div>
  )
}

export default Recommendations