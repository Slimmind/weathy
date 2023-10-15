import React from 'react';
import { DAY_FORMATTER } from '../../../utils/date-formatter';
import { getIcon } from '../../../utils/get-icon';
import './graph-bar.styles.css';

interface GraphBarProps {
  time: number;
  temp: number;
  icon: number;
  size: string;
}

export const GraphBar: React.FC<GraphBarProps> = ({
  time,
  temp,
  icon,
  size,
}) => {
  const IconComponent = getIcon(icon);
  const linkUrl = `#${DAY_FORMATTER.format(time).toLowerCase()}`;
  return (
    <li className="graph-bar" style={{ height: size }}>
      <a href={linkUrl} className="graph-bar__link">
        <strong className="graph-bar_value">{temp}&deg;</strong>
        <div className="graph-bar__icon">
          <IconComponent />
        </div>
      </a>
    </li>
  );
};
