import React, { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { DAY_FORMATTER } from '../../utils/date-formatter';
import { HourGroup } from './hour-group/HourGroup';
import { Hour, WeatherData } from '../../utils/constants';
import './hour-section.styles.css';

interface HourSectionProps {
	data: WeatherData;
	relatedTab: number;
}

const partitionDataByDay = (data: Hour[]): Hour[][] => {
	return data.reduce<Hour[][]>((acc, hourlyData, index, array) => {
		const currentDay = DAY_FORMATTER.format(hourlyData.timestamp);
		const previousDay =
			index === 0 ? null : DAY_FORMATTER.format(array[index - 1].timestamp);

		if (previousDay !== currentDay) {
			acc.push([]);
		}
		acc[acc.length - 1].push(hourlyData);
		return acc;
	}, []);
};

export const HourSection = ({ data, relatedTab }: HourSectionProps) => {
	const { hourly, current_weather } = data;
	const [activeTab, setActiveTab] = useState<number>(relatedTab);
	const sectionRef = useRef<HTMLDivElement>(null);

	const scrollToRef = (): void => {
		if (sectionRef.current) {
			sectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
		}
	};

	const hourlyWeather: Hour[] =
		hourly?.time
			.map((time, index) => ({
				timestamp: time * 1000,
				iconCode: hourly.weathercode[index],
				temp: Math.round(hourly.temperature_2m[index]),
				feelsLike: Math.round(hourly.apparent_temperature[index]),
				windSpeed: Math.round(hourly.windspeed_10m[index]),
				precip: Math.round(hourly.precipitation[index] * 100) / 100,
			}))
			.filter(
				({ timestamp }) => timestamp >= (current_weather?.time ?? 0) * 1000
			) ?? [];

	const dividedData = partitionDataByDay(hourlyWeather);

	useEffect(() => {
		if (activeTab !== relatedTab) {
			scrollToRef();
			setActiveTab(relatedTab);
		}
	}, [relatedTab]);

	return (
		<div className='hour-section' ref={sectionRef}>
			<ul className='hour-section__tab-header'>
				{dividedData.slice(0, 7).map((day, idx) => (
					<li
						role='button'
						key={day[0].timestamp}
						className={clsx('hour-section__tab-header-item', {
							'hour-section__tab-header-item--active': idx === activeTab,
						})}
						onClick={() => setActiveTab(idx)}
					>
						{DAY_FORMATTER.format(day[0].timestamp).slice(0, 3)}
					</li>
				))}
			</ul>
			{dividedData.length > 0 && <HourGroup data={dividedData[activeTab]} />}
		</div>
	);
};
