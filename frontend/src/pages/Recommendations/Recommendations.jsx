import React from 'react'
import './Recommendations.scss'
import Sidebar from '../../components/sidebar/Sidebar'
import Navbar from '../../components/navbar/Navbar'
import Recommendation from '../../components/Recommendation/Recommendation'


const Recommendations = () => {
  return (
    <div className='recommendation-container'>
        <div className="left">
            <Sidebar/>
        </div>
        <div className="right">
            <Navbar/>
            <Recommendation/>
        </div>
    </div>
  )
}

export default Recommendations