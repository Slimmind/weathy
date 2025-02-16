import React from 'react';
import { groupForecastValues } from '../../utils/group-forecast-values';
import './forecast.styles.css';

type ForecastProps = {
	data: any;
};

export const Forecast = ({ data }: ForecastProps) => {
	const tempData = groupForecastValues(data.hourly);
	const averageDayTemp = tempData.map(({ min, max }) => ({
    max,
    min,
    average: min + max < 0 ? Math.floor((min + max) / 2) : Math.ceil((min + max) / 2)
  }));

	const minTempValue = Math.min(...data.hourly.temperature_2m);
	const maxTempValue = Math.max(...data.hourly.temperature_2m);
	const tempRange = maxTempValue - minTempValue;
	const minGraphHeight = 30;

	const setGraphHeight = (temp: number): string => {
		const shiftedTemp = temp - minTempValue;
		const height = (70 / tempRange) * shiftedTemp + minGraphHeight;
		return `${Math.min(height, 100)}%`;
	};

	return (
		<div className='forecast'>
			<div className='forecast__wrapper'>
				<div className='forecast__graph-wrapper'>
					<div className='forecast__day-info'>
						<span>Temperature:</span><strong>&darr;{minTempValue}&deg;</strong><strong>&uarr;{maxTempValue}&deg;</strong>
					</div>
					<ul className='forecast__graph'>
						{averageDayTemp.map(({max, min, average}, idx) => (
							<li
								key={idx}
								className='forecast__graph-item'
								style={{ height: setGraphHeight(average) }}
							>
                <div className='forecast__temperature'>
                  <span className='forecast__temperature--max'>{max}&deg;</span>
                  <span className='forecast__temperature--min'>{min}&deg;</span>
                </div>
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
