import React from 'react';
import { GraphBar } from './graph-bar/GraphBar';
import { ScaleXItem } from './scale-x-item/ScaleXItem';
import { getBarHeight } from '../../utils/get-bar-height';
import { Daily } from '../../utils/constants';
import './graph-section.styles.css';

interface TemperatureGraphProps {
	data: Daily | undefined;
	changeRelatedTab: (tabIndex: number) => void;
}

export const TemperatureGraph = ({
	data,
	changeRelatedTab,
}: TemperatureGraphProps) => {
	if (!data) {
		return null;
	}

	const weather = data.time.map((time, index) => ({
		timestamp: time * 1000,
		iconCode: data.weathercode[index],
		maxTemp: Math.round(data.temperature_2m_max[index]),
		minTemp: Math.round(data.temperature_2m_min[index]),
	}));
	const barHeights = getBarHeight(weather);

	return (
		<section className='temperature-graph'>
			<ul className='temperature-graph__bars'>
				{weather.map(({ maxTemp, minTemp, iconCode, timestamp }, idx) => (
					<li
						onClick={() => changeRelatedTab(idx)}
						key={idx}
						className='temperature-graph__bars-item'
					>
						<GraphBar
							key={timestamp}
							time={timestamp}
							maxTemp={maxTemp}
							minTemp={minTemp}
							icon={iconCode}
							size={barHeights[idx]}
						/>
					</li>
				))}
			</ul>
			<ul className='scale-x'>
				{weather.map(({ timestamp }) => (
					<ScaleXItem key={timestamp} timestamp={timestamp} />
				))}
			</ul>
		</section>
	);
};
