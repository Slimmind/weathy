import React from 'react';
import DayCard from './day-card';
import './day-section-styles.css';
import { Daily } from '../../utils/types';

interface Weather {
	timestamp: number;
	iconCode: number;
	minTemp: number;
	maxTemp: number;
}

interface DaySectionProps {
	data: Daily | undefined;
}

export const DaySection = React.memo(({ data }: DaySectionProps) => {
	if (!data?.time.length) {
		return <div className='day-section--skeleton'></div>;
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
			{weather.map(({ timestamp, iconCode, minTemp, maxTemp }) => (
				<li key={timestamp} className='day-section__item'>
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
});
