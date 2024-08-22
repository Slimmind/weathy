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
	const minTemp = Math.min(...data.hourly.temperature_2m);
	const maxTemp = Math.max(...data.hourly.temperature_2m);
	const setGraphHeight = (temp: number): string => {
		return (100 / (minTemp + maxTemp)) * temp + '%';
	};
	const getHour = (value: number): string | number => {
		const hour = value + 1;
		return hour < 10 ? `0${hour}` : hour;
	};

	const timeString = (idx: number): string => timeData[idx * 24];

	return (
		<div className='forecast'>
			{/* <h3 className='forecast__title'>Temperature for the next 16 days</h3> */}
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
