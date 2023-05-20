import ProgressBar from '../progress-bar';
import { getLocalDate } from '../../utils/get-local-date';
import './header-styles.css';

export const Header = ({ location, isUpdating, dateToShow }) => {
  const getFullDate = (timestamp) => getLocalDate(timestamp, 'full');

  return (
    <header className="main-header" id="main-header ">
      {isUpdating && (
        <ProgressBar />
      )}
      {location && (
        <span className="main-header__city">{location}</span>
      )}
      <span className="main-header__date">{getFullDate(dateToShow)}</span>
    </header>
  );
}
