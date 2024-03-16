import React from 'react';
import { SHORT_DAY_FORMATTER } from '../../../utils/date-formatter';
import './scale-x-item.styles.css';

interface ScaleXItemProps {
	timestamp: number;
}

export const ScaleXItem = ({ timestamp }: ScaleXItemProps) => {
	const day = SHORT_DAY_FORMATTER.format(timestamp);

	return <li className='scale-x-item'>{day}</li>;
};
