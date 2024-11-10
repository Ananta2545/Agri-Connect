import React, { useState } from 'react';
import './Recommendation.scss';
import newRequest from '../../utils/newRequest.js';

const Recommendation = () => {
    const [climate, setClimate] = useState('');
    const [soilType, setSoilType] = useState('');
    const [cropType, setCropType] = useState('');
    const [cropInfo, setCropInfo] = useState('');
    const [weatherDetails, setWeatherDetails] = useState('');
    const [cropConditions, setCropConditions] = useState('');
    const [recommendation, setRecommendation] = useState([]);
    const [error, setError] = useState('');
    const [loading, setloading] = useState(false);
    const [showOutput, setShowOutput] = useState(false); // visibility

    // Function to clean markdown symbols
    const cleanMarkdown = (text) => {
      // Remove markdown syntax for headers (##) and bold (**) or italic (*) symbols
      return text
          .replace(/(\*\*|\*|##)/g, '')  // Remove all asterisks (*) and headers (##)
          .trim();
  };
  

    // Here we are fetching the recommendation
    const fetchRecommendation = async () => {
        setloading(true);
        setError('');

        try {
            const response = await newRequest.post('/api/recommendations', {
                climate,
                soilType,
                cropType,
                cropInfo,
                weatherDetails,
                cropConditions,
            }, { withCredentials: true });

            // Here splitting any empty strings and cleaning up markdown symbols
            const recommendationsArray = response.data.recommendation
                .split('\n')
                .filter(item => item.trim() !== '')
                .map(item => cleanMarkdown(item)); // Clean each item

            setRecommendation(recommendationsArray);
            setShowOutput(true);
        } catch (err) {
            setError("Failed to fetch recommendations");
        } finally {
            setloading(false);
        }
    };

    const toggleOutputVisibility = () => {
        setShowOutput(!showOutput);
    };

    return (
        <div className='recommendations'>
            <h2>Crop Recommendations</h2>

            {/* Showing the input fields if the output field is hidden */}
            {!showOutput && (
                <>
                    <div className="input-group">
                        <label>Climate : </label>
                        <input
                            type="text"
                            value={climate}
                            onChange={(e) => setClimate(e.target.value)}
                            placeholder='e.g., tropical, temperate'
                        />
                    </div>
                    <div className="input-group">
                        <label>Soil Type : </label>
                        <input
                            type="text"
                            value={soilType}
                            onChange={(e) => setSoilType(e.target.value)}
                            placeholder="e.g., loamy, clay, sandy"
                        />
                    </div>

                    <div className="input-group">
                        <label>Crop Type : </label>
                        <input
                            type="text"
                            value={cropType}
                            onChange={(e) => setCropType(e.target.value)}
                            placeholder="e.g., rice, wheat"
                        />
                    </div>

                    <div className="input-group">
                        <label>Crop Info : </label>
                        <input
                            type="text"
                            value={cropInfo}
                            onChange={(e) => setCropInfo(e.target.value)}
                            placeholder="e.g., high yield, drought-resistant"
                        />
                    </div>

                    <div className="input-group">
                        <label>Today's Weather : </label>
                        <input
                            type="text"
                            value={weatherDetails}
                            onChange={(e) => setWeatherDetails(e.target.value)}
                            placeholder="e.g., sunny with a high of 30°C"
                        />
                    </div>

                    <div className="input-group">
                        <label>Crop Conditions : </label>
                        <input
                            type="text"
                            value={cropConditions}
                            onChange={(e) => setCropConditions(e.target.value)}
                            placeholder="e.g., well-irrigated"
                        />
                    </div>
                    <button onClick={fetchRecommendation}>Get Recommendations</button>
                </>
            )}

            {/* If loading showing the loading indicator */}
            {loading && <div className='loading'>Loading...</div>}

            {showOutput && recommendation.length > 0 && (
                <div className="result">
                    <h3>Farming Recommendations for today : </h3>
                    <div className="recommendation-section">
                        <h4>{`Farming Recommendation for your ${cropType} field : `}</h4>
                        <p><strong>Today's Focus:</strong> Maintaining healthy growth and preparing for the upcoming harvest.</p>
                        <h5>Suitable Farming Practices:</h5>
                        <ul>
                            {recommendation.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                        <h5>Precautions : </h5>
                        <p>Start planning for your harvest and monitor for signs of pests and diseases.</p>
                    </div>
                </div>
            )}

            {error && <p className='error'>{error}</p>}

            {/* Button to toggle the visibility */}
            {recommendation.length > 0 && (
                <button onClick={toggleOutputVisibility}>{showOutput ? 'Back to Input' : 'View recommendations'}</button>
            )}

        </div>
    );
};

export default Recommendation;
