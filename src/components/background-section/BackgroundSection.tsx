import React, { useState, useMemo, useCallback } from "react";
import { getBackground } from "../../utils/get-background";

import "./background-section.styles.css";

type BackgroundSectionProps = {
  iconCode: number;
};

export const BackgroundSection = React.memo(
  ({ iconCode }: BackgroundSectionProps) => {
    const [isImageLoaded, setIsImageLoaded] = useState<boolean>(false);

    const imageUrl = useMemo(
      () => getBackground(iconCode, Date.now()),
      [iconCode],
    );

    const handleImageLoad = useCallback(() => {
      setIsImageLoaded(true);
    }, []);

    return (
      <div className={`background-section ${isImageLoaded ? "loaded" : ""}`}>
        <img
          onLoad={handleImageLoad}
          src={imageUrl}
          alt="weather background"
          loading="lazy"
        />
      </div>
    );
  },
);
