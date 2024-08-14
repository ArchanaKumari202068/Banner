
import React, { useState } from "react";
import Banner from "./Components/Banner";
import Dashboard from "./Components/Dashboard";
import "./App.css";

const App = () => {
  const [bannerData, setBannerData] = useState({
    isVisible: false,
    description: "Welcome to our site!",
    timer: 60,
    link: "https://example.com",
  });

  const handleUpdateBanner = (data) => {
    setBannerData(data);
  };

  return (
    <div className="App">
      <Banner
        isVisible={bannerData.isVisible}
        description={bannerData.description}
        initialTimer={bannerData.timer}
        link={bannerData.link}
      />
      <Dashboard onUpdateBanner={handleUpdateBanner} />
    </div>
  );
};

export default App;
