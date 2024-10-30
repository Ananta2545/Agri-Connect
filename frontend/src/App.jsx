import './App.css';
import Authentication from './components/Authentication/Authentication';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import FarmerHome from './pages/FarmerHome/FarmerHome.jsx';
import ExpertHome from './pages/Expert/ExpertHome.jsx';
import { useState } from 'react';

function App() {
  const [userRole, setUserRole] = useState(null); // State to manage user role

  // Create a browser router with routes
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Authentication setUserRole={setUserRole} />, // Pass function to set user role
    },
    {
      path: '/farmer_home',
      element: userRole === 'farmer' ? <FarmerHome /> : <Authentication setUserRole={setUserRole} />,
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
