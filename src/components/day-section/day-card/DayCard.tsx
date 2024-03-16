import React from 'react';
import {
	CARD_DATE_FORMATTER,
	DAY_FORMATTER,
} from '../../../utils/date-formatter';
import { getIcon } from '../../../utils/get-icon';
import './day-card-styles.css';

interface DayCardComponentProps {
	time: number;
	icon: number;
	minTemp: number;
	maxTemp: number;
}

export const DayCard: React.FC<DayCardComponentProps> = ({
	time,
	icon,
	minTemp,
	maxTemp,
}) => {
	const IconComponent = getIcon(icon);

	return (
		<div className='day-card'>
			<p className='day-card__calendar'>{CARD_DATE_FORMATTER.format(time)}</p>
			<div className='weather-icon weather-icon--middle'>
				<IconComponent />
			</div>
			<div className='day-card__date'>{DAY_FORMATTER.format(time)}</div>
			<div className='day-card__temperature'>
				<span>
					{minTemp}&deg; | {maxTemp}&deg;
				</span>
			</div>
		</div>
	);
};
