import DayCard from "./day-card";
import './day-section-styles.css';

export const DaySection = ({ data }) => {
  const weather = data.time.map((time, index) => ({
    timestamp: time * 1000,
    iconCode: data.weathercode[index],
    maxTemp: Math.round(data.temperature_2m_max[index])
  }));

  return (
    <ul className="day-section">
      {
        weather.slice(1, weather.length).map(({ timestamp, iconCode, maxTemp }) => (
          <li key={timestamp} className="day-section__item">
            <DayCard time={timestamp} icon={iconCode} temp={maxTemp} />
          </li>
        ))
      }
    </ul>
  );
};