import React from 'react';
import { GraphBar } from './graph-bar/GraphBar';
import { ScaleXItem } from './scale-x-item/ScaleXItem';
import { getBarHeight } from '../../utils/get-bar-height';
import './graph-section.styles.css';

export const TemperatureGraph = React.memo(({ data }) => {
  const weather = data.time.map((time, index) => ({
    timestamp: time * 1000,
    iconCode: data.weathercode[index],
    maxTemp: Math.round(data.temperature_2m_max[index])
  }));
  const barHeights = getBarHeight(weather);

  return (
    <section className="temperature-graph">
      <ul className="temperature-graph__bars">
        {
          weather.map(({ maxTemp, iconCode, timestamp }, idx) => (
            <GraphBar
              key={timestamp}
              time={timestamp}
              temp={maxTemp}
              icon={iconCode}
              size={barHeights[idx]}
            />
          ))
        }
      </ul>
      <ul className="scale-x">
        {
          weather.map(({ timestamp }) => (
            <ScaleXItem key={timestamp} timestamp={timestamp} />
          ))
        }
      </ul>
    </section>
  );
});