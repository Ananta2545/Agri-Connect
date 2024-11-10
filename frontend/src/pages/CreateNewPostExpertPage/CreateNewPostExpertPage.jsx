import React from 'react'
import ExpertSidebar from '../../components/expertSidebar/ExpertSidebar.jsx'
import BackToExpertHome from '../../components/backToExpertHome/BackToExpertHome.jsx'
import CreateNewPostExpert from '../../components/createNewPostExpert/CreateNewPostExpert.jsx'
import './CreateNewPostExpertPage.scss';


const CreateNewPostExpertPage = () => {
  return (
    <div className='create-post-container-page'>
        <div className="left">
            <ExpertSidebar/>
        </div>
        <div className="right">
            <div className="top">
                <BackToExpertHome/>
            </div>
            <div className="bottom">
                <CreateNewPostExpert/>
            </div>
        </div>
    </div>
  )
}

export default CreateNewPostExpertPage