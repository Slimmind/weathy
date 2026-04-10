import React, { memo, useEffect, useRef, useState, useMemo } from 'react';
import clsx from 'clsx';
import { useDateFormatters } from '../../hooks/useDateFormatters';
import { HourGroup } from './hour-group/HourGroup';
import { Hour, WeatherData } from '../../utils/constants';
import './hour-section.styles.css';

interface HourSectionProps {
	data: WeatherData;
	relatedTab: number;
}

const partitionDataByDay = (
	data: Hour[],
	shortDayFormatter: Intl.DateTimeFormat,
): Hour[][] => {
	return data.reduce<Hour[][]>((acc, hourlyData, index, array) => {
		const currentDay = shortDayFormatter.format(hourlyData.timestamp);
		const previousDay =
			index === 0 ? null : shortDayFormatter.format(array[index - 1].timestamp);

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
	const { shortDayFormatter } = useDateFormatters();

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
				({ timestamp }) => timestamp >= (current_weather?.time ?? 0) * 1000,
			) ?? [];

	const dividedData = useMemo(
		() => partitionDataByDay(hourlyWeather, shortDayFormatter),
		[hourlyWeather, shortDayFormatter],
	);

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
						{shortDayFormatter.format(day[0].timestamp).slice(0, 3)}
					</li>
				))}
			</ul>
			{dividedData.length > 0 && <HourGroup data={dividedData[activeTab]} />}
		</div>
	);
};
