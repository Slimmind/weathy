import React from 'react';
import DayCard from './day-card';
import './day-section-styles.css';
import { Daily } from '../../utils/constants';

interface Weather {
	timestamp: number;
	iconCode: number;
	minTemp: number;
	maxTemp: number;
}

interface DaySectionProps {
	data: Daily | undefined;
	changeRelatedTab: (tabIndex: number) => void;
}

export const DaySection = ({ data, changeRelatedTab }: DaySectionProps) => {
	if (!data) {
		return null;
	}

	const weather: Weather[] = data.time
		.slice(1)
		.map((time: number, idx: number) => {
			const index = idx + 1;
			return {
				timestamp: time * 1000,
				iconCode: data.weathercode[index],
				minTemp: Math.round(data.temperature_2m_min[index]),
				maxTemp: Math.round(data.temperature_2m_max[index]),
			};
		});

	return (
		<ul className='day-section'>
			{weather.map(({ timestamp, iconCode, minTemp, maxTemp }, idx) => (
				<li
					key={timestamp}
					className='day-section__item'
					onClick={() => changeRelatedTab(idx + 1)}
				>
					<DayCard
						time={timestamp}
						icon={iconCode}
						minTemp={minTemp}
						maxTemp={maxTemp}
					/>
				</li>
			))}
		</ul>
	);
};
