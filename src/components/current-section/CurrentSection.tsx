import React from 'react';
import { getIcon } from '../../utils/get-icon';
import './current-section.styles.css';
import { CurrentWeather, Daily, WeatherData } from '../../utils/constants';

interface CurrentSectionProps {
	data: WeatherData;
}

export const CurrentSection = ({ data }: CurrentSectionProps) => {
	const { current_weather, daily } = data || {};

	const {
		temperature: currentTemp,
		windspeed: windSpeed,
		weathercode: iconCode,
	} = current_weather as CurrentWeather;

	const {
		temperature_2m_max: [maxTemp],
		temperature_2m_min: [minTemp],
		apparent_temperature_max: [maxFeelsLikeTemp],
		apparent_temperature_min: [minFeelsLikeTemp],
		precipitation_sum: [precip],
	} = daily as Daily;

	const IconComponent = getIcon(iconCode, Date.now());

	return (
		<div className='current-section'>
			<div className='current-section__left'>
				{IconComponent && (
					<div className='weather-icon weather-icon--large'>
						<IconComponent />
					</div>
				)}
				<div className='header-current-temp'>
					<span>{currentTemp}&deg;</span>
				</div>
			</div>
			<div className='current-section__right'>
				<div className='info-group'>
					<div className='label'>High</div>
					<span>{maxTemp}&deg;</span>
				</div>
				<div className='info-group'>
					<div className='label'>FL High</div>
					<span>{maxFeelsLikeTemp}&deg;</span>
				</div>
				<div className='info-group'>
					<div className='label'>Wind</div>
					<div>
						<span>{windSpeed}</span>
						<span className='value-sub-info'>m/s</span>
					</div>
				</div>
				<div className='info-group'>
					<div className='label'>Low</div>
					<span>{minTemp}&deg;</span>
				</div>
				<div className='info-group'>
					<div className='label'>FL Low</div>
					<span>{minFeelsLikeTemp}&deg;</span>
				</div>
				<div className='info-group'>
					<div className='label'>Precip</div>
					<div>
						<span>{precip}</span>
						<span className='value-sub-info'>mm</span>
					</div>
				</div>
			</div>
		</div>
	);
};
