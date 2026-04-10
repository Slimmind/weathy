import React from 'react';
import { HourRow } from '../hour-row/HourRow';
import { Hour } from '../../../utils/constants';
import { useDateFormatters } from '../../../hooks/useDateFormatters';
import './hour-group.styles.css';

interface HourGroupProps {
	data: Hour[];
}

export const HourGroup = ({ data }: HourGroupProps) => {
	const { dayFormatter } = useDateFormatters();
	const day = data.length > 0 ? dayFormatter.format(data[0].timestamp) : '';

	return (
		<ul className='hour-group'>
			{data.map((hour) => (
				<HourRow key={hour.timestamp} data={hour} />
			))}
		</ul>
	);
};
