import React from 'react';
import './footer.styles.css';

export const Footer = () => {
	const now = new Date();
	const currentYear = now.getFullYear();
	return (
		<footer className='main-footer'>
			<small>SLIMMIND &copy; {currentYear}</small>
		</footer>
	);
};
