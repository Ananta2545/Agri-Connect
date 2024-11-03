import React from 'react'
import './Recommendations.scss'
import Sidebar from '../../components/sidebar/Sidebar'
import Navbar from '../../components/navbar/Navbar'
import Recommendation from '../../components/Recommendation/Recommendation'
import BackToHome from '../../components/backToHome/BackToHome'


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