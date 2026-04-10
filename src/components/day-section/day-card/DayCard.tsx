import React, { memo, useMemo } from 'react';
import { getIcon } from '../../../utils/get-icon';
import { useDateFormatters } from '../../../hooks/useDateFormatters';
import './day-card-styles.css';

interface DayCardComponentProps {
	time: number;
	icon: number;
	minTemp: number;
	maxTemp: number;
}

export const DayCard = memo(
	({ time, icon, minTemp, maxTemp }: DayCardComponentProps) => {
		const IconComponent = useMemo(() => {
			const iconComponent = getIcon(icon);
			return iconComponent || null;
		}, [icon]);
		const { cardDateFormatter, dayFormatter } = useDateFormatters();

		return (
			<div className='day-card'>
				<p className='day-card__calendar'>{cardDateFormatter.format(time)}</p>
				<div className='weather-icon weather-icon--middle'>
					{IconComponent && <IconComponent />}
				</div>
				<div className='day-card__date'>{dayFormatter.format(time)}</div>
				<div className='day-card__temperature'>
					<span>
						{minTemp}&deg; | {maxTemp}&deg;
					</span>
				</div>
			</div>
		);
	},
);
