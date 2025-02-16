import React, { lazy, memo, Suspense, useMemo } from 'react';
import { Daily } from '../../utils/constants';
import './day-section-styles.css';

const DayCard = lazy(() => import('./day-card'));

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

export const DaySection = memo(
	({ data, changeRelatedTab }: DaySectionProps) => {
		if (!data) return null;

		const { time, weathercode, temperature_2m_min, temperature_2m_max } = data;

		const weather = useMemo<Weather[]>(
			() =>
				time.slice(1).map((timestamp, idx) => ({
					timestamp: timestamp * 1000,
					iconCode: weathercode[idx + 1],
					minTemp: Math.round(temperature_2m_min[idx + 1]),
					maxTemp: Math.round(temperature_2m_max[idx + 1]),
				})),
			[data]
		);

		const handleTabChange = (tabIndex: number) => () =>
			changeRelatedTab(tabIndex);

		return (
			<ul className='day-section'>
				<Suspense fallback={<div>Loading...</div>}>
					{weather.map(({ timestamp, iconCode, minTemp, maxTemp }, idx) => (
						<li
							key={timestamp}
							className='day-section__item'
							onClick={handleTabChange(idx + 1)}
						>
							<DayCard
								time={timestamp}
								icon={iconCode}
								minTemp={minTemp}
								maxTemp={maxTemp}
							/>
						</li>
					))}
				</Suspense>
			</ul>
		);
	}
);
