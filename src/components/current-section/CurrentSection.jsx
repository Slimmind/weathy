import { getIcon } from '../../utils/get-icon';
import './current-section.styles.css';

export const CurrentSection = ({ data }) => {
  const { current_weather, daily } = data;
  const {
    temperature: currentTemp,
    windspeed: windSpeed,
    weathercode: iconCode,
  } = current_weather;
  const {
    temperature_2m_max: [maxTemp],
    temperature_2m_min: [minTemp],
    apparent_temperature_max: [maxFeelsLikeTemp],
    apparent_temperature_min: [minFeelsLikeTemp],
    precipitation_sum: [precip],
  } = daily;
  const IconComponent = getIcon(iconCode, Date.now());

  return (
    <div className="current-section">
      <div className="current-section__left">
        <div className="weather-icon weather-icon--large">
          <IconComponent />
        </div>
        <div className="header-current-temp">
          <span>{currentTemp}&deg;</span>
        </div>
      </div>
      <div className="current-section__right">
        <div className="info-group">
          <div className="label">High</div>
          <span>{maxTemp}&deg;</span>
        </div>
        <div className="info-group">
          <div className="label">FL High</div>
          <span>{maxFeelsLikeTemp}&deg;</span>
        </div>
        <div className="info-group">
          <div className="label">Wind</div>
          <div>
            <span>{windSpeed}</span>
            <span className="value-sub-info">ms</span>
          </div>
        </div>
        <div className="info-group">
          <div className="label">Low</div>
          <span>{minTemp}&deg;</span>
        </div>
        <div className="info-group">
          <div className="label">FL Low</div>
          <span>{minFeelsLikeTemp}&deg;</span>
        </div>
        <div className="info-group">
          <div className="label">Precip</div>
          <div>
            <span>{precip}</span>
            <span className="value-sub-info">mm</span>
          </div>
        </div>
      </div>
    </div>
  );
}