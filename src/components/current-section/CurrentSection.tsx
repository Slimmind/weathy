import React from 'react';
import { getIcon } from '../../utils/get-icon';
import { CurrentWeather, Daily, WeatherData } from '../../utils/constants';
import { InfoGroup } from '../info-group/InfoGroup';
import { getCurrentTime } from '../../utils/getCurrentTime';
import { ClockIcon } from '../../icons';
import './current-section.styles.css';

interface CurrentSectionProps {
	data: WeatherData | undefined;
}

export const CurrentSection = ({ data }: CurrentSectionProps) => {
	if (!data) {
		return null;
	}

	const { current_weather, daily } = data;

	if (!current_weather || !daily) {
		return null;
	}

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
			<header className='current-section__header'>
				<div className='current-section__header-content'>
					<ClockIcon />
					Last updated at {getCurrentTime()}
				</div>
			</header>
			<div className='current-section__wrapper'>
				<div className='current-section__block--left'>
					{IconComponent && (
						<div className='weather-icon weather-icon--large'>
							<IconComponent />
						</div>
					)}
					<div className='header-current-temp'>
						<span>{currentTemp}&deg;</span>
					</div>
				</div>
				<div className='current-section__block--right'>
					<InfoGroup
						label='High'
						value={`${maxTemp}${String.fromCharCode(176)}`}
					/>
					<InfoGroup
						label='FL High'
						value={`${maxFeelsLikeTemp}${String.fromCharCode(176)}`}
					/>
					<InfoGroup label='Wind' value={`${windSpeed} m/s`} />
					<InfoGroup
						label='Low'
						value={`${minTemp}${String.fromCharCode(176)}`}
					/>
					<InfoGroup
						label='FL Low'
						value={`${minFeelsLikeTemp}${String.fromCharCode(176)}`}
					/>
					<InfoGroup label='Precip' value={`${precip} mm`} />
				</div>
			</div>
		</div>
	);
};
