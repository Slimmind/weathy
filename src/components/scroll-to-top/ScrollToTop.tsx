import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import './scroll-to-top.styles.css';

export const ScrollToTop = () => {
	const [isVisible, setIsVisible] = useState(false);

	const toggleVisibility = () => {
		if (window.scrollY > 300) {
			setIsVisible(true);
		} else {
			setIsVisible(false);
		}
	};

	const scrollToTop = () => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	};

	useEffect(() => {
		window.addEventListener('scroll', toggleVisibility);
		return () => {
			window.removeEventListener('scroll', toggleVisibility);
		};
	}, []);

	const classes = clsx('scroll-to-top', isVisible && 'scroll-to-top--visible');

	return (
		<div className={classes}>
			<button
				className='scroll-to-top__button'
				onClick={scrollToTop}
				aria-label='scroll to top'
			/>
		</div>
	);
};
