import { ICON_MAP } from './iconMap';
import './style.css';
import { getWeather } from './weather';

navigator.geolocation.getCurrentPosition(positionSuccess, positionError);

const currentDate = new Intl.DateTimeFormat('en-GB', {
  dateStyle: 'full',
}).format(new Date());

document.querySelector('[data-current-date]').textContent = currentDate;

function positionSuccess({ coords }) {
  getWeather(
    coords.latitude,
    coords.longitude,
    Intl.DateTimeFormat().resolvedOptions().timeZone
  )
    .then(renderWeather)
    .catch((err) => {
      console.log(err);
      alert('Error getting weather...');
    });
}

function positionError() {
  const lat = 48.92;
  const lng = 24.71;
  getWeather(lat, lng, Intl.DateTimeFormat().resolvedOptions().timeZone)
    .then(renderWeather)
    .catch((err) => {
      console.log(err);
      alert('Error getting weather...');
    });
}

function renderWeather({ current, daily, hourly }) {
  renderCurrentWeather(current);
  renderDailyWeather(daily);
  renderHourlyWeather(hourly);

  document.querySelector('html').classList.remove('blurred');
}

function setValue(selector, value, { parent = document } = {}) {
  parent.querySelector(`[data-${selector}]`).textContent = value;
}

function getIconUrl(iconCode, hour) {
  return `images/${ICON_MAP.get(handleIconCode(iconCode, hour))}.svg`;
}

function handleIconCode(iconCode, hour) {
  const time = hour || new Date().getHours();
  const isNightTime = time < 6 || time > 18;

  if (isNightTime) {
    switch (iconCode) {
      case 0:
        return 100;
      case 1:
        return 101;
      case 2:
        return 200;
      default:
        return iconCode;
    }
  }

  return iconCode;
}

const currentIcon = document.querySelector('[data-current-icon]');
function renderCurrentWeather(current) {
  currentIcon.src = getIconUrl(current.iconCode);
  setValue('current-temp', current.currentTemp);
  setValue('current-high', current.highTemp);
  setValue('current-low', current.lowTemp);
  setValue('current-fl-high', current.highFeelsLike);
  setValue('current-fl-low', current.lowFeelsLike);
  setValue('current-wind', current.windSpeed);
  setValue('current-precip', current.precip);
}

const DAY_FORMATTER = new Intl.DateTimeFormat('en-GB', { weekday: 'long' });
const dailySection = document.querySelector('[data-day-section]');
const dayCardTemplate = document.getElementById('day-card-template');
function renderDailyWeather(daily) {
  dailySection.innerHTML = '';
  daily.forEach((day) => {
    const element = dayCardTemplate.content.cloneNode(true);
    setValue('temp', day.maxTemp, { parent: element });
    setValue('date', DAY_FORMATTER.format(day.timestamp), { parent: element });
    element.querySelector('[data-icon]').src = getIconUrl(day.iconCode);
    dailySection.append(element);
  });
}

const HOUR_FORMATTER = new Intl.DateTimeFormat(undefined, {
  hour: 'numeric',
  minute: 'numeric',
});
const hourlySection = document.querySelector('[data-hour-section]');
const hourRowTemplate = document.getElementById('hour-row-template');
const emptyHourRowTemplate = document.getElementById('empty-hour-row-template');
function renderHourlyWeather(hourly) {
  hourlySection.innerHTML = '';
  let element;
  hourly.forEach((hour) => {
    if (HOUR_FORMATTER.format(hour.timestamp) === '00:00') {
      element = emptyHourRowTemplate.content.cloneNode(true);
      setValue('day', DAY_FORMATTER.format(hour.timestamp), {
        parent: element,
      });
    } else {
      element = hourRowTemplate.content.cloneNode(true);
      setValue('temp', hour.temp, { parent: element });
      setValue('fl-temp', hour.feelsLike, { parent: element });
      setValue('wind', hour.windSpeed, { parent: element });
      setValue('precip', hour.precip, { parent: element });
      setValue('day', DAY_FORMATTER.format(hour.timestamp), {
        parent: element,
      });
      setValue('time', HOUR_FORMATTER.format(hour.timestamp), {
        parent: element,
      });
      element.querySelector('[data-icon]').src = getIconUrl(
        hour.iconCode,
        new Date(hour.timestamp).getHours()
      );
    }

    hourlySection.append(element);
  });
}
