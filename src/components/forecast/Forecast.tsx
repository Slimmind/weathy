import React from 'react';
import { groupForecastValues } from '../../utils/group-forecast-values';
import { getDateInfo } from '../../utils/get-date-info';
import { DayInfo } from './day-info/DayInfo';
import './forecast.styles.css';

type ForecastProps = {
	data: any;
};

export const Forecast = ({ data }: ForecastProps) => {
	const tempData = groupForecastValues(data.hourly.temperature_2m);
	const timeData = data.hourly.time;
	const minTempValue = Math.min(...data.hourly.temperature_2m);
	const maxTempValue = Math.max(...data.hourly.temperature_2m);
	const tempRange = maxTempValue - minTempValue;
	const minGraphHeight = 15;

	const setGraphHeight = (temp: number): string => {
		const shiftedTemp = temp - minTempValue;
		const height = (85 / tempRange) * shiftedTemp + minGraphHeight;
		return `${Math.min(height, 100)}%`;
	};

	const getHour = (value: number): string | number => {
		const hour = value + 1;
		return hour < 10 ? `0${hour}` : hour;
	};

	const timeString = (idx: number): string => timeData[idx * 24];

	return (
		<div className='forecast'>
			<div className='forecast__wrapper'>
				{tempData.map((day, idx) => (
					<div key={timeString(idx)} className='forecast__graph-wrapper'>
						<DayInfo
							dateData={getDateInfo(timeString(idx))}
							minTemp={day.min}
							maxTemp={day.max}
						/>
						<ul className='forecast__graph'>
							{day.values.map((value, idx) => (
								<li
									key={idx}
									className='forecast__graph-item'
									style={{ height: setGraphHeight(value) }}
								>
									<span className='forecast__temperature'>{value}</span>
									<span className='forecast__hour'>{getHour(idx)}</span>
								</li>
							))}
						</ul>
					</div>
				))}
			</div>
		</div>
	);
};
