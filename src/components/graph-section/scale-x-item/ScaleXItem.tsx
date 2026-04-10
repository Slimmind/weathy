import { useDateFormatters } from '../../../hooks/useDateFormatters';
import './scale-x-item.styles.css';

interface ScaleXItemProps {
	timestamp: number;
}

export const ScaleXItem = ({ timestamp }: ScaleXItemProps) => {
	const { shortDayFormatter } = useDateFormatters();
	const day = shortDayFormatter.format(timestamp);

	return <li className='scale-x-item'>{day}</li>;
};
