import React from 'react';
import { groupForecastValues } from '../../utils/group-forecast-values';
import './forecast.styles.css';

type ForecastProps = {
	data: any;
};

export const Forecast = ({ data }: ForecastProps) => {
	const tempData = groupForecastValues(data.hourly);
	const averageDayTemp = tempData.map(({ min, max }) =>
		min + max < 0 ? Math.floor((min + max) / 2) : Math.ceil((min + max) / 2)
	);
	const minTempValue = Math.min(...data.hourly.temperature_2m);
	const maxTempValue = Math.max(...data.hourly.temperature_2m);
	const tempRange = maxTempValue - minTempValue;
	const minGraphHeight = 25;

	const setGraphHeight = (temp: number): string => {
		const shiftedTemp = temp - minTempValue;
		const height = (75 / tempRange) * shiftedTemp + minGraphHeight;
		return `${Math.min(height, 100)}%`;
	};

	return (
		<div className='forecast'>
			<div className='forecast__wrapper'>
				<div className='forecast__graph-wrapper'>
					<div className='forecast__day-info'>
						<span>Temperature forecast for 16 days</span>
					</div>
					<ul className='forecast__graph'>
						{averageDayTemp.map((day, idx) => (
							<li
								key={idx}
								className='forecast__graph-item'
								style={{ height: setGraphHeight(day) }}
							>
								<span className='forecast__temperature'>{day}&deg;</span>
								<div className='forecast__date'>
									<span>{tempData[idx].date.dayName}</span>
									<span>{tempData[idx].date.dayNum}</span>
								</div>
							</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	);
};
