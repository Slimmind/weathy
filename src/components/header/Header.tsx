import React from 'react';
import './header-styles.css';
import { getLocalDate } from '../../utils/get-local-date';

interface HeaderComponentProps {
	location: string;
	dateToShow: number;
}

export const Header: React.FC<HeaderComponentProps> = ({
	location,
	dateToShow,
}) => {
	const getFullDate = (timestamp: number) => getLocalDate(timestamp, 'full');

	return (
		<header className='main-header' id='main-header'>
			{location && <span className='main-header__city'>{location}</span>}
			<span className='main-header__date'>{getFullDate(dateToShow)}</span>
		</header>
	);
};
