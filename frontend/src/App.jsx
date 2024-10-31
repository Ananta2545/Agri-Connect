import './App.css';
import Authentication from './pages/Authentication/Authentication.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ExpertHome from './pages/Expert/ExpertHome.jsx';
import { useEffect, useState } from 'react';
import FarmerHome from './pages/FarmerHome/FarmerHome.jsx';


function App() {
  const [userRole, setUserRole] = useState(localStorage.getItem("userRole")); // State to manage user role

  // in this way after page reloads the server persist the userRole
  useEffect(()=>{
    if(userRole){
      localStorage.setItem("userRole",userRole);
    }
  }, [userRole])

  // Create a browser router with routes
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Authentication setUserRole={setUserRole} />, // Pass function to set user role
    },
    {
      path: '/farmer_home',
      element: userRole === 'farmer' ? <FarmerHome/> : <Authentication setUserRole={setUserRole} />,
    },
    {
      path: '/expert_home',
      element: userRole === 'expert' ? <ExpertHome /> : <Authentication setUserRole={setUserRole} />,
    },
  ]);

  return (
    <RouterProvider router={router} />
  );
}

export default App;
