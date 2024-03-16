import React from 'react';
import { getIcon } from '../../../utils/get-icon';
import { HOUR_FORMATTER } from '../../../utils/date-formatter';
import './hour-row.styles.css';

interface HourRowProps {
	data: {
		timestamp: number;
		iconCode: number;
		temp: number;
		feelsLike: number;
		windSpeed: number;
		precip: number;
	};
}

export const HourRow = React.memo(({ data }: HourRowProps) => {
	const { timestamp, iconCode, temp, feelsLike, windSpeed, precip } = data;
	const hour = HOUR_FORMATTER.format(timestamp);
	const IconComponent = getIcon(iconCode, timestamp);

	return (
		<li className='hour-section__row'>
			<div>
				<div className='info-group'>
					<div>{hour}</div>
				</div>
			</div>
			<div className='weather-icon'>
				<IconComponent />
			</div>
			<div>
				<div className='info-group'>
					<div className='label'>Temp</div>
					<div>{temp}&deg;</div>
				</div>
			</div>
			<div>
				<div className='info-group'>
					<div className='label'>FL Temp</div>
					<div>{feelsLike}&deg;</div>
				</div>
			</div>
			<div>
				<div className='info-group'>
					<div className='label'>Wind</div>
					<div>
						{windSpeed}
						<span className='value-sub-info'>m/s</span>
					</div>
				</div>
			</div>
			<div>
				<div className='info-group'>
					<div className='label'>Precip</div>
					<div>
						{precip}
						<span className='value-sub-info'>mm</span>
					</div>
				</div>
			</div>
		</li>
	);
});
