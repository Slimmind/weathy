import React from 'react';
import HourRow from '../hour-row';
import { DAY_FORMATTER } from '../../../utils/date-formatter';
import { Hour } from '../../../utils/types';
import './hour-group.styles.css';

interface HourGroupProps {
	data: Hour[];
}

export const HourGroup = ({ data }: HourGroupProps) => {
	const day = DAY_FORMATTER.format(data[0].timestamp);

	return (
		<ul
			className='hour-section__group'
			data-timestamp={data[0].timestamp}
			id={day.toLocaleLowerCase()}
		>
			<li className='hour-section__row--separator'>
				<a href='#current-section'>{day}</a>
			</li>
			{data.map((hour) => (
				<HourRow key={hour.timestamp} data={hour} />
			))}
		</ul>
	);
};
