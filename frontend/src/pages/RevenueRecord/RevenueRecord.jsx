import React from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import Navbar from '../../components/navbar/Navbar'
import BackToHome from '../../components/backToHome/BackToHome'
import AddRecord from '../../components/addRecord/AddRecord'
import MonthlySummary from '../../components/monthlySummary/MonthlySummary'
import './RevenueRecord.scss'

const RevenueRecord = () => {
  return (
    <div className='revenue-container'>
        <div className="left">
            <Sidebar/>
        </div>
        <div className="right">
            <div className="top">
              <BackToHome/>
            </div>
            <div className="bottom">
                <div className="bottom-left">
                    <AddRecord/>
                </div>
                <div className="bottom-right">
                    <MonthlySummary/>
                </div>
            </div>
           
        </div>
    </div>
  )
}

export default RevenueRecord