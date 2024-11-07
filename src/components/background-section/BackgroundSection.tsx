import React, { useState } from 'react';
import { getBackground } from '../../utils/get-background';

import './background-section.styles.css';

type BackgroundSectionProps = {
	iconCode: number;
};

export const BackgroundSection = ({ iconCode }: BackgroundSectionProps) => {
	const [isImageLoaded, setIsImageLoaded] = useState<boolean>(false);
	const imageUrl = getBackground(iconCode, Date.now());

	const handleImageLoad = (): void => {
		setIsImageLoaded(true);
	};

	return (
		<div className={`background-section ${isImageLoaded ? 'loaded' : ''}`}>
			<img
				onLoad={handleImageLoad}
				src={imageUrl}
				alt='weather background'
				loading='lazy'
			/>
		</div>
	);
};
