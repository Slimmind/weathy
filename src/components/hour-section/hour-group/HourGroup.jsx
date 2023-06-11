import { useEffect, useRef } from 'react';
import HourRow from '../hour-row';
import './hour-group.styles.css';
import { DAY_FORMATTER } from '../../../utils/date-formatter';

export const HourGroup = ({ data, handleScroll }) => {
  const ref = useRef(null);
  const day = DAY_FORMATTER.format(data[0].timestamp);

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
      id={day.toLocaleLowerCase()}
    >
      <li className="hour-section__row--separator">
        {day}
      </li>
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
