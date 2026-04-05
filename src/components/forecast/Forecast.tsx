import { useMemo } from 'react';
import { groupForecastValues } from '../../utils/group-forecast-values';
import { ChunkGroup } from '../../utils/constants';
import './forecast.styles.css';

interface ForecastHourlyData {
	temperature_2m: number[];
	time: string[];
}

interface ForecastProps {
	data:
		| {
				hourly: ForecastHourlyData;
		  }
		| null
		| undefined;
}

export const Forecast = ({ data }: ForecastProps) => {
	const averageDayTemp = useMemo(() => {
		if (!data?.hourly) return [];
		const tempData = groupForecastValues(data.hourly);
		return {
			tempData,
			averages: tempData.map(({ min, max }) => ({
				max,
				min,
				average:
					min + max < 0
						? Math.floor((min + max) / 2)
						: Math.ceil((min + max) / 2),
			})),
		};
	}, [data]);

	const graphConfig = useMemo(() => {
		if (!data?.hourly?.temperature_2m.length) return null;
		const temps = data.hourly.temperature_2m;
		const minTempValue = Math.min(...temps);
		const maxTempValue = Math.max(...temps);
		const tempRange = maxTempValue - minTempValue;
		const minGraphHeight = 30;

		return {
			minTempValue,
			maxTempValue,
			tempRange,
			minGraphHeight,
			setGraphHeight: (temp: number): string => {
				const shiftedTemp = temp - minTempValue;
				const height =
					tempRange === 0
						? '50%'
						: `${Math.min((70 / tempRange) * shiftedTemp + minGraphHeight, 100)}%`;
				return height;
			},
		};
	}, [data]);

	if (!data?.hourly || !averageDayTemp.tempData || !graphConfig) return null;

	const { tempData, averages } = averageDayTemp;
	const { minTempValue, maxTempValue, setGraphHeight } = graphConfig;

	return (
		<div className='forecast'>
			<div className='forecast__wrapper'>
				<div className='forecast__graph-wrapper'>
					<div className='forecast__day-info'>
						<span>Temperature:</span>
						<strong>&darr;{minTempValue}&deg;</strong>
						<strong>&uarr;{maxTempValue}&deg;</strong>
					</div>
					<ul className='forecast__graph'>
						{averages.map(({ max, min, average }, idx) => (
							<li
								key={tempData[idx].date.dayNum + tempData[idx].date.dayName}
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
