import React, { useState } from 'react';
import { getBackground } from '../../utils/get-background';

import './background-section.styles.css';

interface BackgroundSectionProps {
	iconCode: number;
}

export const BackgroundSection: React.FC<BackgroundSectionProps> = React.memo(
	({ iconCode }) => {
		const [isImageLoaded, setIsImageLoaded] = useState(false);
		const imageUrl = getBackground(iconCode, Date.now());

		const handleImageLoad = (): void => {
			setIsImageLoaded(true);
		};

		return (
			<section
				className={`background-section ${isImageLoaded ? 'loaded' : ''}`}
			>
				{imageUrl && (
					<img
						onLoad={handleImageLoad}
						src={imageUrl}
						alt='weather background'
					/>
				)}
			</section>
		);
	}
);
