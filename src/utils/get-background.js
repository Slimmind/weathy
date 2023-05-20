const BACKGROUND_MAP = new Map();
const completion = 'monochrome image in deep blue colors';

addMapping([0, 1], `sun in the sky ${completion}`);
addMapping([2], `sun with clouds ${completion}`);
addMapping([3], `cloudy weather ${completion}`);
addMapping([45, 48], `smog ${completion}`);
addMapping(
  [51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82],
  `rainy weather`
);
addMapping([71, 73, 75, 77, 85, 86], `snowy weather ${completion}`);
addMapping([95, 96, 99], `storm ${completion}`);
addMapping([100, 101], `moon in sky ${completion}`);
addMapping([200], `moon in clouds ${completion}`);

function addMapping(values, prompt) {
  values.forEach((value) => {
    BACKGROUND_MAP.set(value, prompt);
  });
}

function handleBackgroundCode(code, time) {
  const hour = new Date(time).getHours();
  const isNightTime = hour < 5 || hour > 18;

  if (isNightTime) {
    switch (code) {
      case 0:
        return 100;
      case 1:
        return 101;
      case 2:
        return 200;
      default:
        return code;
    }
  }

  return code;
}

export function getBackground(code, hour) {
  return BACKGROUND_MAP.get(handleBackgroundCode(code, hour));
}
