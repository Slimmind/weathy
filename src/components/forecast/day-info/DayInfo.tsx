import React from 'react';
import './day-info.styles.css';

type DayInfoProps = {
	dateData: {
		monthName: string;
		dayName: string;
		dayNumber: number;
	};
	minTemp: number;
	maxTemp: number;
};

export const DayInfo = ({ dateData, minTemp, maxTemp }: DayInfoProps) => {
	const { monthName, dayName, dayNumber } = dateData;
	return (
		<div className='forecast__day-info'>
			<span>{dayName}</span>
			<span>{dayNumber}</span>
			<span>{monthName}</span>
			<span>↓ {minTemp}&deg;</span>
			<span>↑ {maxTemp}&deg;</span>
		</div>
	);
};
