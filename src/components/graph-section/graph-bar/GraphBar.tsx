import React from 'react';
import { DAY_FORMATTER } from '../../../utils/date-formatter';
import { getIcon } from '../../../utils/get-icon';
import './graph-bar.styles.css';

interface GraphBarProps {
	time: number;
	maxTemp: number;
	minTemp: number;
	icon: number;
	size: string;
}

export const GraphBar = ({
	time,
	maxTemp,
	minTemp,
	icon,
	size,
}: GraphBarProps) => {
	const IconComponent = getIcon(icon) as any;
	return (
		<div className='graph-bar' style={{ height: size }} data-min-temp={minTemp}>
			<strong className='graph-bar__value graph-bar__value--max'>
				{maxTemp}&deg;
			</strong>
			<strong className='graph-bar__value graph-bar__value--min'>
				{minTemp}&deg;
			</strong>
			<div className='graph-bar__icon'>
				<IconComponent />
			</div>
		</div>
	);
};
