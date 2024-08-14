import React, { useState, useEffect } from "react";
import axios from "axios";

const Dashboard = ({ onUpdateBanner }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [description, setDescription] = useState("");
  const [timer, setTimer] = useState(60); // Default 1 minute
  const [link, setLink] = useState("");
  const [message, setMessage] = useState(""); // For user feedback

  useEffect(() => {
    const fetchBannerData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/banner");
        const { isVisible, description, timer, link } = response.data;
        setIsVisible(isVisible);
        setDescription(description);
        setTimer(timer);
        setLink(link);
      } catch (error) {
        console.error("Error fetching banner data:", error);
        setMessage("Failed to load banner data.");
      }
    };

    fetchBannerData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!description || !timer || !link) {
      setMessage("All fields are required.");
      return;
    }

    const bannerData = {
      isVisible,
      description,
      timer,
      link,
    };
    console.log("Data being sent:", bannerData); 

    try {
      const response = await axios.post("http://localhost:5000/api/banner/update", bannerData);
      
      setMessage("Banner updated successfully!");
      console.log("Response from server:", response.data); 
      onUpdateBanner(bannerData);
    } catch (error) {
      console.error("Failed to update banner:", error.response?.data || error.message);
      setMessage("Failed to update banner.");
    }
  };

  return (
    <div className="dashboard">
      <h2>Banner Dashboard</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Banner On/Off:
            <input
              type="checkbox"
              checked={isVisible}
              onChange={(e) => setIsVisible(e.target.checked)}
            />
          </label>
        </div>
        <div>
          <label>
            Banner Description:
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Banner Timer (seconds):
            <input
              type="number"
              value={timer}
              onChange={(e) => setTimer(Number(e.target.value))}
            />
          </label>
        </div>
        <div>
          <label>
            Banner Link:
            <input
              type="text"
              value={link}
              onChange={(e) => setLink(e.target.value)}
            />
          </label>
        </div>
        <button type="submit">Update Banner</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Dashboard;
