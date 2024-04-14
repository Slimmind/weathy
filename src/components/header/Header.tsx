import React from 'react';
import Locations from '../locations';
import { getLocalDate } from '../../utils/get-local-date';
import './header-styles.css';

interface HeaderProps {
	changeLocation: (location: Location) => void;
}

export const Header = ({ changeLocation }) => {
	const fullDate = getLocalDate(Date.now(), 'full');

	return (
		<header className='main-header'>
			<div className='main-header__location'>
				<Locations changeLocation={changeLocation} />
			</div>
			<span className='main-header__date'>{fullDate}</span>
		</header>
	);
};
