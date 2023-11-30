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

export const GraphBar: React.FC<GraphBarProps> = ({
	time,
	maxTemp,
	minTemp,
	icon,
	size,
}) => {
	const IconComponent = getIcon(icon);
	const linkUrl = `#${DAY_FORMATTER.format(time).toLowerCase()}`;
	return (
		<li className='graph-bar' style={{ height: size }} data-min-temp={minTemp}>
			<a href={linkUrl} className='graph-bar__link'>
				<strong className='graph-bar__value graph-bar__value--max'>
					{maxTemp}&deg;
				</strong>
				<strong className='graph-bar__value graph-bar__value--min'>
					{minTemp}&deg;
				</strong>
				<div className='graph-bar__icon'>
					<IconComponent />
				</div>
			</a>
		</li>
	);
};
