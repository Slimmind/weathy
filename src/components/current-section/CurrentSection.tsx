import React, { memo } from 'react';
import { getIcon } from '../../utils/get-icon';
import { WeatherData } from '../../utils/constants';
import { InfoGroup } from '../info-group/InfoGroup';
import LastUpdate from '../last-update';
import { useI18n } from '../../i18n';
import './current-section.styles.css';

interface CurrentSectionProps {
	data?: WeatherData;
	updateForecast: () => void;
	currentTime: number;
}

export const CurrentSection = memo(
	({ data, updateForecast, currentTime }: CurrentSectionProps) => {
		if (!data?.current_weather || !data?.daily) return null;

		const { current_weather, daily } = data;
		const DEGREE_SYMBOL = '°';
		const { t } = useI18n();

		const weatherInfo = {
			currentTemp: current_weather.temperature,
			windSpeed: current_weather.windspeed,
			iconCode: current_weather.weathercode,
			maxTemp: daily.temperature_2m_max[0],
			minTemp: daily.temperature_2m_min[0],
			maxFeelsLikeTemp: daily.apparent_temperature_max[0],
			minFeelsLikeTemp: daily.apparent_temperature_min[0],
			precip: daily.precipitation_sum[0],
		};

		const iconComponent = getIcon(weatherInfo.iconCode, currentTime);

		return (
			<div className='current-section'>
				<div className='current-section__wrapper'>
					<div className='current-section__block--left'>
						{iconComponent && (
							<div className='weather-icon weather-icon--large'>
								{React.createElement(iconComponent)}
							</div>
						)}
						<div className='header-current-temp'>
							<span>{weatherInfo.currentTemp}&deg;</span>
						</div>
					</div>
					<div className='current-section__block--right'>
						<LastUpdate
							updateForecast={updateForecast}
							time={new Date(currentTime)}
						/>
						<div className='current-section__info-group-wrap'>
							<InfoGroup
								label={t('weather.high')}
								value={`${weatherInfo.maxTemp}${DEGREE_SYMBOL}`}
							/>
							<InfoGroup
								label={t('weather.fl_high')}
								value={`${weatherInfo.maxFeelsLikeTemp}${DEGREE_SYMBOL}`}
							/>
							<InfoGroup
								label={t('weather.wind')}
								value={`${weatherInfo.windSpeed}${t('unit.wind')}`}
							/>
							<InfoGroup
								label={t('weather.low')}
								value={`${weatherInfo.minTemp}${DEGREE_SYMBOL}`}
							/>
							<InfoGroup
								label={t('weather.fl_low')}
								value={`${weatherInfo.minFeelsLikeTemp}${DEGREE_SYMBOL}`}
							/>
							<InfoGroup
								label={t('weather.precip')}
								value={`${weatherInfo.precip}${t('unit.precip')}`}
							/>
						</div>
					</div>
				</div>
			</div>
		);
	},
);
