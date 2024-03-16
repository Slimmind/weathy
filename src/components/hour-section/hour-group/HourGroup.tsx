import React from 'react';
import HourRow from '../hour-row';
import { getLocalDate } from '../../../utils/get-local-date';
import { DAY_FORMATTER } from '../../../utils/date-formatter';
import { Hour } from '../../../utils/constants';
import './hour-group.styles.css';

interface HourGroupProps {
	data: Hour[];
}

export const HourGroup = ({ data }: HourGroupProps) => {
	const day = DAY_FORMATTER.format(data[0].timestamp);
	const date = getLocalDate(data[0].timestamp);

	return (
		<ul className='hour-section__group'>
			<li className='hour-section__row--separator'>
				<span>{day}</span>
				<strong>{date}</strong>
			</li>
			{data.map((hour) => (
				<HourRow key={hour.timestamp} data={hour} />
			))}
		</ul>
	);
};
