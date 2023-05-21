import React, { useState } from 'react';
import { getBackground } from '../../utils/get-background';

import './background-section.styles.css';

export const BackgroundSection = React.memo(({ iconCode }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const imageUrl = getBackground(iconCode, Date.now());
  console.log('IMAGE_URL', imageUrl);

  const handleImageLoad = () => {
    setIsImageLoaded(true);
    console.log('IMAGE IS LOADED');
  }

  return (
    <section className={`background-section ${isImageLoaded ? 'loaded' : ''}`}>
      {
        imageUrl && (
          <img onLoad={handleImageLoad} src={imageUrl} alt="weather background" />
        )
      }
    </section>
  );
});