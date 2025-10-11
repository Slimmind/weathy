import React, { useState, useMemo, useCallback, useEffect } from "react";
import { getBackground } from "../../utils/get-background";
import { ImagePreloader } from "../../utils/image-preloader";

import "./background-section.styles.css";

type BackgroundSectionProps = {
  iconCode: number;
};

export const BackgroundSection = React.memo(
  ({ iconCode }: BackgroundSectionProps) => {
    const [isImageLoaded, setIsImageLoaded] = useState<boolean>(false);
    const [isPreloaded, setIsPreloaded] = useState<boolean>(false);

    const imageUrl = useMemo(
      () => getBackground(iconCode, Date.now()),
      [iconCode],
    );

    const handleImageLoad = useCallback(() => {
      setIsImageLoaded(true);
    }, []);

    // Preload the background image when component mounts
    useEffect(() => {
      const preload = async () => {
        try {
          await ImagePreloader.preloadImage(imageUrl);
          setIsPreloaded(true);
        } catch (error) {
          console.warn("Failed to preload background image:", error);
          setIsPreloaded(true); // Still mark as preloaded to avoid blocking
        }
      };

      preload();

      return () => {
        // Cleanup if needed
      };
    }, [imageUrl]);

    return (
      <div className={`background-section ${isImageLoaded ? "loaded" : ""}`}>
        <img
          onLoad={handleImageLoad}
          src={imageUrl}
          alt="weather background"
          loading="lazy"
          decoding="async"
          style={{ opacity: isPreloaded ? 1 : 0 }}
        />
      </div>
    );
  },
);
