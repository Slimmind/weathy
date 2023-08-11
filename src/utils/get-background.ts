const BACKGROUND_MAP: Map<number, string[]> = new Map<number, string[]>();

addMapping(
  [0, 1],
  [
    'https://dl.dropboxusercontent.com/s/ap9wivj0okp9qwv/sun.jpg?dl=0',
    'https://dl.dropboxusercontent.com/s/sglx7o97wgxqd9f/sun-2.jpg?dl=0',
  ]
);
addMapping(
  [2],
  [
    'https://dl.dropboxusercontent.com/s/s1hyk5ptxya6dco/cloud-sun.jpg?dl=0',
    'https://dl.dropboxusercontent.com/s/rqrcbx0urqdv78i/cloud-sun-2.jpg?dl=0',
    'https://dl.dropboxusercontent.com/s/vv0hrdy0gnuqohk/cloud-sun-3.jpg?dl=0',
  ]
);
addMapping(
  [3],
  [
    'https://dl.dropboxusercontent.com/s/7p8s0w606y1ljiy/cloud.jpg?dl=0',
    'https://dl.dropboxusercontent.com/s/k4k13m7sz7r3y77/cloud-2.jpg?dl=0',
    'https://dl.dropboxusercontent.com/s/7196yndg4zvijhl/cloud-3.jpg?dl=0',
  ]
);
addMapping(
  [45, 48],
  [
    'https://dl.dropboxusercontent.com/s/rnkjxsrgql5wwwt/fog.jpg?dl=0',
    'https://dl.dropboxusercontent.com/s/z1t80s1ex484s51/fog-2.jpg?dl=0',
    'https://dl.dropboxusercontent.com/s/e706x1oyuxydv4y/fog-3.jpg?dl=0',
  ]
);
addMapping(
  [51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82],
  [
    'https://dl.dropboxusercontent.com/s/7azjoyn8xi5hqdr/rain.jpg?dl=0',
    'https://dl.dropboxusercontent.com/s/256g6qoidp1nowj/rain-2.jpg?dl=0',
    'https://dl.dropboxusercontent.com/s/egb8r9z4ksndiuo/rain-3.jpg?dl=0',
  ]
);
addMapping(
  [71, 73, 75, 77, 85, 86],
  ['https://dl.dropboxusercontent.com/s/u3wh7fluterzj0t/snow.jpg?dl=0']
);
addMapping(
  [95, 96, 99],
  [
    'https://dl.dropboxusercontent.com/s/9mj739bjktvpwch/storm.jpg?dl=0',
    'https://dl.dropboxusercontent.com/s/7poq55v506mcl5l/storm-2.jpg?dl=0',
    'https://dl.dropboxusercontent.com/s/9q97gacotlu3lmf/storm-3.jpg?dl=0',
  ]
);
addMapping(
  [100, 101],
  ['https://dl.dropboxusercontent.com/s/utocs5xdykr0l4a/moon.jpg?dl=0']
);
addMapping(
  [200],
  ['https://dl.dropboxusercontent.com/s/8jwqh94c1ewpnw9/cloud-moon.jpg?dl=0']
);

function addMapping(values: number[], prompt: string[]): void {
  values.forEach((value: number) => {
    BACKGROUND_MAP.set(value, prompt);
  });
}

function handleBackgroundCode(code: number, time: number): number {
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

export function getBackground(code: number, hour: number): string | undefined {
  const images: string[] | undefined = BACKGROUND_MAP.get(
    handleBackgroundCode(code, hour)
  );

  if (images) {
    const randomIndex = Math.floor(Math.random() * images.length);
    return images[randomIndex];
  }
}
