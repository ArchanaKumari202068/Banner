import React, { useState, useEffect } from "react";

const Banner = ({ isVisible, description, initialTimer, link }) => {
  const [timeLeft, setTimeLeft] = useState(initialTimer);

  useEffect(() => {
    if (!isVisible || timeLeft <= 0) return;

    const timerInterval = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [isVisible, timeLeft]);

  if (!isVisible || timeLeft <= 0) return null;

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="banner">
      <p>{description}</p>
      <p>
        Time left: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
      </p>
      <a href={link} target="_blank" rel="noopener noreferrer">
        Click here
      </a>
    </div>
  );
};

export default Banner;
