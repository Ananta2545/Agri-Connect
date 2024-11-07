import React, { useState } from 'react';
import './Appointments.scss';
import {useNavigate} from 'react-router-dom';

const Appointments = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const expertsPerPage = 6;
  const navigate = useNavigate();

  // Demo experts data
  const experts = [
    { id: 1, name: "Srijita Baksi", specialization: 'Crop Specialist', image: 'https://www.pngfind.com/pngs/m/468-4686427_profile-demo-hd-png-download.png' },
    { id: 2, name: "Tuhin Chandra", specialization: 'Soil Expert', image: 'https://www.pngfind.com/pngs/m/468-4686427_profile-demo-hd-png-download.png' },
    { id: 3, name: "Kaustav Bhowmik", specialization: 'Livestock Management', image: 'https://www.pngfind.com/pngs/m/468-4686427_profile-demo-hd-png-download.png' },
    { id: 4, name: "Tiyasa Nag", specialization: "Pest Control Expert", image: 'https://www.pngfind.com/pngs/m/468-4686427_profile-demo-hd-png-download.png' },
    { id: 5, name: "Tiyasa Nag", specialization: "Pest Control Expert", image: 'https://www.pngfind.com/pngs/m/468-4686427_profile-demo-hd-png-download.png' },
    { id: 6, name: "Tiyasa Nag", specialization: "Pest Control Expert", image: 'https://www.pngfind.com/pngs/m/468-4686427_profile-demo-hd-png-download.png' },
    { id: 7, name: "Tiyasa Nag", specialization: "Pest Control Expert", image: 'https://www.pngfind.com/pngs/m/468-4686427_profile-demo-hd-png-download.png' },
    { id: 8, name: "Tiyasa Nag", specialization: "Pest Control Expert", image: 'https://www.pngfind.com/pngs/m/468-4686427_profile-demo-hd-png-download.png' },
    { id: 9, name: "Tiyasa Nag", specialization: "Pest Control Expert", image: 'https://www.pngfind.com/pngs/m/468-4686427_profile-demo-hd-png-download.png' },
    { id: 10, name: "Tiyasa Nag", specialization: "Pest Control Expert", image: 'https://www.pngfind.com/pngs/m/468-4686427_profile-demo-hd-png-download.png' },
  ];

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
    <div className='booking-appointment'>
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
          <div key={expert.id} className="expert-box" onClick={() => handleExpertClick(expert.id)}>
            <img src={expert.image} alt={expert.name} className="expert-image" />
            <div className="expert-info">
              <h3 className="expert-name">{expert.name}</h3>
              <p className="expert-specialization">{expert.specialization}</p>
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
    </div>
  );
};

export default Appointments;
