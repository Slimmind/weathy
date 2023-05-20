import { useState, useEffect } from 'react';
import { getBackground } from '../../utils/get-background';

import './background-section.styles.css';

export const BackgroundSection = ({ iconCode }) => {
  const imagePrompt = getBackground(iconCode, Date.now());
  const [backgroundImage, setBackgroundImage] = useState('');
  console.log('ICON: ', imagePrompt);

  useEffect(() => {
    const generateRandomImage = async () => {
      const response = await fetch('https://api.openai.com/v1/images/generations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer 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'
        },
        body: JSON.stringify({
          'prompt': imagePrompt,
          "n": 1,
          "size": "512x512"
        })
      });

      const data = await response.json();
      const image = data.data[0].url;
      console.log('IMAGE: ', image);

      setBackgroundImage(image);
    };

    generateRandomImage();
  }, []);

  return (
    <section className="background-section">
      {
        backgroundImage && (
          <img src={backgroundImage} alt={imagePrompt} />
        )
      }
    </section>
  );
};