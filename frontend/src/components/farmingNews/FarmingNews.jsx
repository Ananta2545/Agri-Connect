import React, { useState, useEffect, useRef } from 'react';
import './FarmingNews.scss';
import newRequest from '../../utils/newRequest.js';

const FarmingNews = () => {
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const carouselRef = useRef(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await newRequest.get('/api/news/farming_news');
        console.log(response.data);
        setNewsData(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  useEffect(() => {
    if (newsData.length > 0) {
      const interval = setInterval(() => {
        if (carouselRef.current) {
          carouselRef.current.scrollLeft += 1;
          if (carouselRef.current.scrollLeft >= carouselRef.current.scrollWidth - carouselRef.current.clientWidth) {
            carouselRef.current.scrollLeft = 0; // Reset for infinite effect
          }
        }
      }, 30);

      return () => clearInterval(interval);
    }
  }, [newsData]);

  if (loading) {
    return <div className="farming-news__loading">Loading news...</div>;
  }

  if (error) {
    return <div className="farming-news__error">Error: {error}</div>;
  }

  return (
    <div className="farming-news">
      <h2 className="farming-news__title">Latest Farming News</h2>
      <div ref={carouselRef} className="farming-news__scroll-container">
        {newsData.length > 0 ? (
          newsData.map((news, index) => (
            <div key={news.id || index} className="farming-news__card">
              <h3 className="farming-news__headline">
                {typeof news.headline === 'object' ? JSON.stringify(news.headline) : news.title}
              </h3>
              <div className="farming-news__info">
                <span className="farming-news__source">
                  {typeof news.source === 'object' ? JSON.stringify(news.source.name) : news.source.name}
                </span>
                <span className="farming-news__date">
                  {typeof news.date === 'object' ? JSON.stringify(news.date) : news.date}
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className="farming-news__no-data">No news available at the moment.</div>
        )}
      </div>
    </div>
  );
};

export default FarmingNews;
