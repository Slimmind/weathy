import { SHORT_DAY_FORMATTER } from '../../../utils/date-formatter';
import './scale-x-item.styles.css';

export const ScaleXItem = ({ timestamp }) => {
  const day = SHORT_DAY_FORMATTER.format(timestamp);

  return (
    <li className='scale-x-item'>{day}</li>
  );
}