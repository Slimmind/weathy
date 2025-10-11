import React, { useMemo } from 'react';
import HourRow from '../hour-row';
import { getLocalDate } from '../../../utils/get-local-date';
import { DAY_FORMATTER } from '../../../utils/date-formatter';
import { Hour } from '../../../utils/constants';
import './hour-group.styles.css';

interface HourGroupProps {
	data: Hour[];
}

const HourGroup = ({ data }: HourGroupProps) => {
	// Handle empty data case
	if (!data || data.length === 0) {
		return null;
	}

	// Memoize expensive calculations to avoid recomputing on every render
	const { day, date, hourRows } = useMemo(() => {
		const day = DAY_FORMATTER.format(data[0].timestamp);
		const date = getLocalDate(data[0].timestamp);
		
		const hourRows = data.map((hourData) => (
			<HourRow key={hourData.timestamp} data={hourData} />
		));
		
		return { day, date, hourRows };
	}, [data]);

	return (
		<div className='hour-section__group'>
			<li className='hour-section__row--separator'>
				<span>{day}</span>
				<strong>{date}</strong>
			</li>
			<ul className='hour-section__group-list'>
				{hourRows}
			</ul>
		</div>
	);
};

export { HourGroup };
