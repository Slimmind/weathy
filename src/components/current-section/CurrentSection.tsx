import React, { memo, useMemo } from 'react';
import { getIcon } from '../../utils/get-icon';
import { WeatherData } from '../../utils/constants';
import { InfoGroup } from '../info-group/InfoGroup';
import LastUpdate from '../last-update';
import './current-section.styles.css';

interface CurrentSectionProps {
	data?: WeatherData;
	updateForecast: () => void;
}

export const CurrentSection = memo(
	({ data, updateForecast }: CurrentSectionProps) => {
		if (!data?.current_weather || !data?.daily) return null;

		const { current_weather, daily } = data;
		const DEGREE_SYMBOL = '°';

		const weatherInfo = useMemo(
			() => ({
				currentTemp: current_weather.temperature,
				windSpeed: current_weather.windspeed,
				iconCode: current_weather.weathercode,
				maxTemp: daily.temperature_2m_max[0],
				minTemp: daily.temperature_2m_min[0],
				maxFeelsLikeTemp: daily.apparent_temperature_max[0],
				minFeelsLikeTemp: daily.apparent_temperature_min[0],
				precip: daily.precipitation_sum[0],
			}),
			[current_weather, daily]
		);

		const IconComponent = useMemo(
			() => getIcon(weatherInfo.iconCode, Date.now()),
			[weatherInfo.iconCode]
		);

		console.log('CURRENT_SECTION');

		return (
			<div className='current-section'>
				<div className='current-section__wrapper'>
					<div className='current-section__block--left'>
						{IconComponent && (
							<div className='weather-icon weather-icon--large'>
								<IconComponent />
							</div>
						)}
						<div className='header-current-temp'>
							<span>
								{weatherInfo.currentTemp}
								{DEGREE_SYMBOL}
							</span>
						</div>
					</div>
					<div className='current-section__block--right'>
						<LastUpdate updateForecast={updateForecast} time={new Date()} />
						<div className='current-section__info-group-wrap'>
							<InfoGroup
								label='High'
								value={`${weatherInfo.maxTemp}${DEGREE_SYMBOL}`}
							/>
							<InfoGroup
								label='FL High'
								value={`${weatherInfo.maxFeelsLikeTemp}${DEGREE_SYMBOL}`}
							/>
							<InfoGroup label='Wind' value={`${weatherInfo.windSpeed} m/s`} />
							<InfoGroup
								label='Low'
								value={`${weatherInfo.minTemp}${DEGREE_SYMBOL}`}
							/>
							<InfoGroup
								label='FL Low'
								value={`${weatherInfo.minFeelsLikeTemp}${DEGREE_SYMBOL}`}
							/>
							<InfoGroup label='Precip' value={`${weatherInfo.precip} mm`} />
						</div>
					</div>
				</div>
			</div>
		);
	}
);
