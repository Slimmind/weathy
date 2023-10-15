import { WeatherData } from './types';

export async function getWeather(
  lat: number,
  lng: number,
  timezone: string
): Promise<WeatherData | undefined> {
  const url = `https://api.open-meteo.com/v1/forecast?hourly=temperature_2m,apparent_temperature,precipitation,weathercode,windspeed_10m&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,precipitation_sum&current_weather=true&windspeed_unit=ms&timeformat=unixtime&latitude=${lat}&longitude=${lng}&timezone=${timezone}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return undefined;
  }
}
