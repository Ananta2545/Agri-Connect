import React, { useEffect, useState } from "react";
import axios from "axios";
import "./BlogRecommendation.scss";
import newRequest from "../../utils/newRequest";

const BlogRecommendation = () => {
  const [recommendation, setRecommendation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecommendation = async () => {
      try {
        const response = await newRequest.get("/api/blog-recommendations");
        setRecommendation(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch recommendations.");
        setLoading(false);
      }
    };
    fetchRecommendation();
  }, []);

  // Helper function to clean Markdown or extract necessary text
  const cleanMarkdown = (text) => {
    if (!text) return ""; // Avoid errors if text is undefined
    return text
      .replace(/(\*\*|__)(.*?)\1/g, "$2") // Remove bold (**) or (__) and leave the text
      .replace(/(\#\#)(.*?)$/g, "") // Remove headings (##)
      .replace(/\*/g, "") // Remove other Markdown symbols like *
      .replace(/_/g, ""); // Remove underscores
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  // Extract topics by splitting the recommendations string by each line starting with "**"
  const recommendationsText = recommendation?.recommendations || "";
  const topics = recommendationsText
    .split("\n")
    .filter((line) => line.startsWith("**"))
    .map((topic) => cleanMarkdown(topic));

  return (
    <div className="recommendation-box">
      <h2>Topics of the Day to Write Upon </h2>
      <ul>
        {topics.length > 0 ? (
          topics.map((topic, index) => <li key={index}>{topic}</li>)
        ) : (
          <li>No topics available.</li>
        )}
      </ul>
    </div>
  );
};

export default BlogRecommendation;
