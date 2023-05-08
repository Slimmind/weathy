import { useEffect, useRef } from 'react';
import HourRow from '../hour-row';
import './hour-group.styles.css';

export const HourGroup = ({ data, handleScroll }) => {
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      const [entry] = entries;

      if (entry.isIntersecting) {
        handleScroll(data[0].timestamp);
      }
    });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [ref]);
  return (
    <ul
      ref={ref}
      className="hour-section__group"
      data-timestamp={data[0].timestamp}
    >
      {
        data.map(hour => (
          <HourRow
            key={hour.timestamp}
            data={hour}
            handleScroll={handleScroll}
          />
        ))
      }
    </ul>
  );
}
