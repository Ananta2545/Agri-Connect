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
import ProfilePage from './pages/profilePage/ProfilePage.jsx';

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
      element: <ProfilePage />
    }
  ]);

  return (
    <RouterProvider router={router} />
  );
}

export default App;
