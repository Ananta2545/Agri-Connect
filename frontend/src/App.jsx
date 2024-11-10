import './App.css';
import Authentication from './pages/Authentication/Authentication.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ExpertHome from './pages/Expert/ExpertHome.jsx';
import { useEffect, useState } from 'react';
import FarmerHome from './pages/FarmerHome/FarmerHome.jsx';
import WeatherReport from './pages/Weather-report/WeatherReport.jsx';
import Recommendations from './pages/Recommendations/Recommendations.jsx';
import TaskSchedulingPage from './pages/TaskSchedulingPage/TaskSchedulingPage.jsx';
import RevenueRecord from './pages/RevenueRecord/RevenueRecord.jsx';
import CropDetailsPage from './pages/cropDetailsManagement/CropDetailsManagement.jsx';
import AppointmentPage from './pages/AppointmentPage/AppointmentPage.jsx';
import ExpertDetails from './pages/ExpertDetailsPage/ExpertDetails.jsx';
import ExpertProfilePage from './pages/ExpertProfilePage/ExpertProfilePage.jsx';
import CreateNewPostExpertPage from './pages/CreateNewPostExpertPage/CreateNewPostExpertPage.jsx';
import ViewBlogPage from './pages/ViewBlogPage/ViewBlogPage.jsx';
import BlogDetailsExpertPage from './pages/BlogDetailsExpertPage/BlogDetailsExpertPage.jsx';
import BlogDetailsFarmer from './components/blogDetailsFarmer/BlogDetailsFarmer.jsx';
import UpdateExpertProfile from './components/UpdateExpertProfile/UpdateExpertProfile.jsx';
import ProfilePage from './pages/profilePage/ProfilePage.jsx';
import UpdateFarmerProfile from './components/UpdateFarmerProfile/UpdateFarmerProfile.jsx';
import ExpertAppointments from './pages/ExpertAppointment/ExpertAppointment.jsx';
import VideoCallPage from './pages/videoCallPage/VideoCallPage.jsx';
import VideoCallRoom from './pages/videoCallPage/VideoCallPage.jsx';
import AddFarmerProfile from './components/addProfile/AddProfile.jsx';

function App() {
  const [userRole, setUserRole] = useState(localStorage.getItem("userRole") || null);

  // Persist userRole in localStorage
  useEffect(() => {
    if (userRole) {
      localStorage.setItem("userRole", userRole);
    } else {
      localStorage.removeItem("userRole");
    }
  }, [userRole]);

  // Define routes based on userRole
  const router = createBrowserRouter([
    {
      path: '/',
      element: userRole === null ? (
        <Authentication setUserRole={setUserRole} />
      ) : userRole === 'farmer' ? (
        <FarmerHome setUserRole={setUserRole} /> // Pass setUserRole here
      ) : (
        <ExpertHome setUserRole={setUserRole} /> // Pass setUserRole here
      ),
    },
    {
      path: '/farmer_home',
      element: userRole === 'farmer' ? (
        <FarmerHome setUserRole={setUserRole} /> // Pass setUserRole here
      ) : (
        <Authentication setUserRole={setUserRole} />
      ),
    },
    {
      path: '/expert_home',
      element: userRole === 'expert' ? (
        <ExpertHome setUserRole={setUserRole} /> // Pass setUserRole here
      ) : (
        <Authentication setUserRole={setUserRole} />
      ),
    },
    {
      path: '/weather_report',
      element: <WeatherReport />
    },
    {
      path: '/farming_recommendations',
      element: <Recommendations />
    },
    {
      path: '/task_scheduling',
      element: <TaskSchedulingPage />
    },
    {
      path: '/revenue_record',
      element: <RevenueRecord />
    },
    {
      path: '/crop_details_management',
      element: <CropDetailsPage />
    },
    {
      path: '/profile',
      element: <ProfilePage/>
    },
    {
      path: '/appointments',
      element: <AppointmentPage/>
    },
    {
      path: '/expert/:id',
      element: <ExpertDetails/>
    },
    {
      path: '/expert-profile',
      element:<ExpertProfilePage/>
    },
    {
      path:'/createPost',
      element: <CreateNewPostExpertPage/>
    },{
      path: '/viewMyBlogs',
      element: <ViewBlogPage/>
    },
    {
      path: '/blog/:id',
      element: <BlogDetailsExpertPage/>
    },
    {
      path: '/posts/:id',
      element: <BlogDetailsFarmer/>
    },
    {
      path:'/update-expert-profile',
      element:<UpdateExpertProfile/>
    },
    {
      path:'/update-farmer-profile',
      element:<UpdateFarmerProfile/>
    },
    {
      path: "/appointment_requests",
      element: <ExpertAppointments/>
    },
    {
      path: "/video-call/:appointmentId",
      element:<VideoCallRoom/>
    },
    {
      path: "/add-profile",
      element: <AddFarmerProfile/>
    }
  ]);

  return (
    <RouterProvider router={router} />
  );
}

export default App;
