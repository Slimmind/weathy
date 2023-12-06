import React, { useState } from 'react';
import clsx from 'clsx';
import { DAY_FORMATTER } from '../../utils/date-formatter';
import { HourGroup } from './hour-group/HourGroup';
import { Hour, WeatherData } from '../../utils/types';
import './hour-section.styles.css';

interface HourSectionProps {
	data: WeatherData;
}

export const HourSection = ({ data }: HourSectionProps) => {
	const { hourly, current_weather } = data;
	const [activeTab, setActiveTab] = useState<number>(0);

	const hourlyWeather = hourly?.time
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

	const partitionDataByDay = (data: Hour[]): Hour[][] => {
		const dayPartitions: Hour[][] = [];

		data.forEach((hourlyData, index: number): void => {
			const currentDay = DAY_FORMATTER.format(hourlyData.timestamp);
			const previousDay =
				index === 0 ? null : DAY_FORMATTER.format(data[index - 1].timestamp);

			if (previousDay !== currentDay) {
				dayPartitions.push([]);
			}
			dayPartitions[dayPartitions.length - 1].push(hourlyData);
		});

		return dayPartitions;
	};

	const dividedData = partitionDataByDay(hourlyWeather);

	const handleActiveTab = (tabIndex: number): void => {
		setActiveTab(tabIndex);
	};

	return (
		<section className='hour-section'>
			<ul className='hour-section__tab-header'>
				{dividedData.map((day: Hour[], idx: number) => (
					<li
						key={day[0].timestamp}
						className={clsx('hour-section__tab-header-item', {
							'hour-section__tab-header-item--active': idx === activeTab,
						})}
						onClick={() => handleActiveTab(idx)}
					>
						{DAY_FORMATTER.format(day[0].timestamp).slice(0, 3)}
					</li>
				))}
			</ul>
			{dividedData.length > 0 && <HourGroup data={dividedData[activeTab]} />}
		</section>
	);
};
