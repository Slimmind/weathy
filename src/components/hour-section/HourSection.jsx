import { DAY_FORMATTER } from '../../utils/date-formatter';
import { HourGroup } from './hour-group/HourGroup';
import './hour-section.styles.css';

export const HourSection = ({ data }) => {
  const { hourly, current_weather } = data;

  const hourlyWeather = hourly.time
    .map((time, index) => {
      return {
        timestamp: time * 1000,
        iconCode: hourly.weathercode[index],
        temp: Math.round(hourly.temperature_2m[index]),
        feelsLike: Math.round(hourly.apparent_temperature[index]),
        windSpeed: Math.round(hourly.windspeed_10m[index]),
        precip: Math.round(hourly.precipitation[index] * 100) / 100,
      };
    })
    .filter(({ timestamp }) => timestamp >= current_weather.time * 1000);

  const partitionDataByDay = (data) => {
    const dayPartitions = [];

    data.forEach((hourlyData, index) => {
      const currentDay = DAY_FORMATTER.format(hourlyData.timestamp);
      const previousDay = (index === 0) ? null : DAY_FORMATTER.format(data[index - 1].timestamp);

      if (previousDay !== currentDay) {
        dayPartitions.push([]);
      }
      dayPartitions[dayPartitions.length - 1].push(hourlyData);
    });

    return dayPartitions;
  }

  const dividedData = partitionDataByDay(hourlyWeather);

  return (
    <section className="hour-section">
      {
        dividedData.map(day => (
          <HourGroup key={day[0].timestamp} data={day} />
        ))
      }
    </section>
  );
}