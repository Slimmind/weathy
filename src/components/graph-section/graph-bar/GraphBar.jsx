import { getIcon } from '../../../utils/get-icon';
import './graph-bar.styles.css';

export const GraphBar = ({ temp, icon, size }) => {
  const IconComponent = getIcon(icon);
  return (
    <li className='graph-bar' style={{ 'height': size }}>
      <strong className='graph-bar_value'>{temp}&deg;</strong>
      <div className="graph-bar__icon">
        <IconComponent />
      </div>
    </li>
  );
}