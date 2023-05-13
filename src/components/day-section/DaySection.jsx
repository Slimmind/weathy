import React from 'react';
import DayCard from "./day-card";
import './day-section-styles.css';

export const DaySection = React.memo(({ data }) => {
  const weather = data.time.map((time, index) => ({
    timestamp: time * 1000,
    iconCode: data.weathercode[index],
    minTemp: Math.round(data.temperature_2m_min[index]),
    maxTemp: Math.round(data.temperature_2m_max[index]),
  }));

  return (
    <ul className="day-section">
      {
        weather.slice(1, weather.length).map(({ timestamp, iconCode, minTemp, maxTemp }) => (
          <li key={timestamp} className="day-section__item">
            <DayCard time={timestamp} icon={iconCode} minTemp={minTemp} maxTemp={maxTemp} />
          </li>
        ))
      }
    </ul>
  );
});