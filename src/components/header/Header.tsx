import React, { lazy } from 'react';
import { getLocalDate } from '../../utils/get-local-date';
import { Location } from '../../utils/constants';
import './header-styles.css';

const Locations = lazy(() => import('../locations'));

interface HeaderProps {
	changeLocation: (newLocation: Location) => void;
}

export const Header = ({ changeLocation }: HeaderProps) => {
	const fullDate = getLocalDate(Date.now(), 'full');

	return (
		<header className='main-header'>
			<div className='main-header__location'>
				<Locations changeLocation={changeLocation} />
			</div>
			<div className='main-header__right'>
				<span className='main-header__date'>{fullDate}</span>
			</div>
		</header>
	);
};
