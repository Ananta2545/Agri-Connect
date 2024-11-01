// FarmingNews.jsx
import React from 'react';
import './FarmingNews.scss';

const newsData = [
    { 
      id: 1,
      headline: "New Organic Farming Techniques Boost Yield by 30%", 
      source: "Agriculture Daily", 
      date: "Nov 1, 2024" 
    },
    { 
      id: 2, 
      headline: "Government Grants Announced for Small-Scale Farmers", 
      source: "Farmers' News", 
      date: "Oct 28, 2024" 
    },
    { 
      id: 3, 
      headline: "Drought Resilient Crops Tested Successfully in Rajasthan", 
      source: "Agri Today", 
      date: "Oct 27, 2024" 
    },
    { 
      id: 4, 
      headline: "Precision Agriculture Tools See High Adoption Among Young Farmers", 
      source: "Tech Agri", 
      date: "Oct 26, 2024" 
    },
    { 
      id: 5, 
      headline: "New Subsidies for Solar-Powered Irrigation Systems Launched", 
      source: "Farmers’ Weekly", 
      date: "Oct 25, 2024" 
    },
    { 
      id: 6, 
      headline: "Climate Change Impacts on Monsoon Patterns Affect Crop Yields", 
      source: "The Green Leaf", 
      date: "Oct 23, 2024" 
    },
    { 
      id: 7, 
      headline: "Introduction of Artificial Intelligence in Pest Control Solutions", 
      source: "Agri Innovations", 
      date: "Oct 21, 2024" 
    },
    { 
      id: 8, 
      headline: "Farmers in Punjab Switching to Millet Cultivation Amid Water Crisis", 
      source: "Eco Farming", 
      date: "Oct 20, 2024" 
    },
    { 
      id: 9, 
      headline: "New Farming Drone Technologies to Monitor Crop Health and Soil Quality", 
      source: "Agri Drones Weekly", 
      date: "Oct 18, 2024" 
    },
    { 
      id: 10, 
      headline: "Soil Health Awareness Campaigns Launch Across India", 
      source: "Soil & Sustainability", 
      date: "Oct 15, 2024" 
    },
    { 
      id: 11, 
      headline: "Hybrid Rice Varieties Provide Higher Yields for Eastern India", 
      source: "Rice Research Journal", 
      date: "Oct 12, 2024" 
    },
    { 
      id: 12, 
      headline: "Agriculture Startups Receive Record Funding in 2024", 
      source: "Startup Agri", 
      date: "Oct 10, 2024" 
    },
    { 
      id: 13, 
      headline: "Vertical Farming: Urban Areas Embrace Indoor Agriculture Solutions", 
      source: "City Farmers", 
      date: "Oct 9, 2024" 
    },
    { 
      id: 14, 
      headline: "New High-Protein Wheat Varieties Developed for Nutrient Security", 
      source: "Nutrition News", 
      date: "Oct 8, 2024" 
    },
    { 
      id: 15, 
      headline: "Farm-to-Table Movement Grows: Direct Sales from Farmers to Consumers", 
      source: "Healthy Harvest", 
      date: "Oct 7, 2024" 
    }
  ];
  

const FarmingNews = () => {
  return (
    <div className="farming-news">
      <h2 className="farming-news__title">Latest Farming News</h2>
      <div className="farming-news__scroll-container">
        {newsData.map((news) => (
          <div key={news.id} className="farming-news__card">
            <h3 className="farming-news__headline">{news.headline}</h3>
            <div className="farming-news__info">
              <span className="farming-news__source">{news.source}</span>
              <span className="farming-news__date">{news.date}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FarmingNews;
