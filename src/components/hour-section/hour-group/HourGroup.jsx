import HourRow from '../hour-row';
import './hour-group.styles.css';

export const HourGroup = ({ data }) => (
  <ul
    className="hour-section__group"
    data-timestamp={data[0].timestamp}
  >
    {
      data.map(hour => (
        <HourRow key={hour.timestamp} data={hour} />
      ))
    }
  </ul>
);
