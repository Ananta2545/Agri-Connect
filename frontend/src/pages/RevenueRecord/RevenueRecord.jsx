import React,{useState} from 'react'
import Sidebar from '../../components/sidebar/Sidebar.jsx'
import Navbar from '../../components/navbar/Navbar'
import BackToHome from '../../components/backToHome/BackToHome.jsx'
import AddRecord from '../../components/addRecord/AddRecord.jsx'
import MonthlySummary from '../../components/monthlySummary/MonthlySummary.jsx'
import './RevenueRecord.scss'

const RevenueRecord = () => {
  // const [recordAdded, setRecordAdded] = useState(false);

  // const handleRecordAdded = () => {
  //   setRecordAdded(!recordAdded); // Toggle state to trigger re-render or refresh
  // };

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
                <AddRecord onRecordAdded={() => {}} />
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