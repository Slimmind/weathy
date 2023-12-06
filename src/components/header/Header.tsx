import React from 'react';
import { getFullDate } from '../../utils/get-full-date';
import Locations from '../locations';
import './header-styles.css';

export const Header: React.FC = () => {
	return (
		<header className='main-header' id='main-header'>
			<div className='main-header__location'>
				<Locations />
			</div>
			<span className='main-header__date'>{getFullDate()}</span>
		</header>
	);
};
