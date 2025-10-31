import React from 'react';
import { getIcon } from '../../../utils/get-icon';
import { HOUR_FORMATTER } from '../../../utils/date-formatter';
import { InfoGroup } from '../../info-group/InfoGroup';
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
	const IconComponent = getIcon(iconCode, timestamp) || null;

	return (
		<li className='hour-section__row'>
			{hour}
			<div className='weather-icon'>{IconComponent && <IconComponent />}</div>
			<InfoGroup label='Temp' value={`${temp}${String.fromCharCode(176)}`} />
			<InfoGroup
				label='FL Temp'
				value={`${feelsLike}${String.fromCharCode(176)}`}
			/>
			<InfoGroup label='Wind' value={`${windSpeed} m/s`} />
			<InfoGroup label='Precip' value={`${precip} mm`} />
		</li>
	);
});
