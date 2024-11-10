// Appointments.js
import React, { useEffect, useState } from 'react';
import './Appointments.scss';
import { useNavigate } from 'react-router-dom';
import newRequest from '../../utils/newRequest';
import RequestedAppointmentList from '../requestedAppointmentList/RequestedAppointmentList.jsx';

const Appointments = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [experts, setExperts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const expertsPerPage = 6;
  const navigate = useNavigate();

  // Fetch experts from the backend
  useEffect(() => {
    const fetchExperts = async () => {
      try {
        const response = await newRequest.get('api/users/experts');
        if (response.status === 200) {
          setExperts(response.data); // Update experts state with fetched data
        } else {
          console.error('Failed to fetch experts');
        }
      } catch (error) {
        console.error('Error fetching experts:', error);
      }
    };

    fetchExperts();
  }, []);

  const handleSearch = (e) => setSearchQuery(e.target.value);

  // Pagination logic
  const filteredExperts = experts.filter((expert) =>
    expert.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const totalPages = Math.ceil(filteredExperts.length / expertsPerPage);
  const displayedExperts = filteredExperts.slice(
    (currentPage - 1) * expertsPerPage,
    currentPage * expertsPerPage
  );

  const handlePageChange = (page) => setCurrentPage(page);

  const handleExpertClick = (id) => {
    navigate(`/expert/${id}`);
  };

  return (
    <div className="booking-appointment">
      <h1 className="heading">Booking Appointment</h1>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search for experts..."
          className="search-bar"
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>
      <div className="experts-container">
        {displayedExperts.map((expert) => (
          <div key={expert._id} className="expert-box" onClick={() => handleExpertClick(expert._id)}>
            <img src={expert.image || 'https://www.pngfind.com/pngs/m/468-4686427_profile-demo-hd-png-download.png'} alt={expert.name} className="expert-image" />
            <div className="expert-info">
              <h3 className="expert-name">{expert.name}</h3>
              <p className="expert-specialization">{expert.email}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            className={`page-button ${currentPage === index + 1 ? 'active' : ''}`}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}/{totalPages}
          </button>
        ))}
      </div>

      {/* Display the requested appointments list */}
      <RequestedAppointmentList />
    </div>
  );
};

export default Appointments;
