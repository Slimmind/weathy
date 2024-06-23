const BACKGROUND_MAP: Map<number, string[]> = new Map<number, string[]>();

addMapping(
	[0, 1],
	[
		'/backgrounds/sun/sun.jpg',
		'/backgrounds/sun/sun-2.jpg',
	]
);
addMapping(
	[2],
	[
		'/backgrounds/cloud-sun/cloud-sun.jpg',
		'/backgrounds/cloud-sun/cloud-sun-2.jpg',
		'/backgrounds/cloud-sun/cloud-sun-3.jpg',
	]
);
addMapping(
	[3],
	[
		'/backgrounds/cloud/cloud.jpg',
		'/backgrounds/cloud/cloud-2.jpg',
		'/backgrounds/cloud/cloud-3.jpg',
	]
);
addMapping(
	[45, 48],
	[
		'/backgrounds/fog/fog.jpg',
		'/backgrounds/fog/fog-2.jpg',
		'/backgrounds/fog/fog-3.jpg',
	]
);
addMapping(
	[51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82],
	[
		'/backgrounds/rain/rain.jpg',
		'/backgrounds/rain/rain-2.jpg',
		'/backgrounds/rain/rain-3.jpg',
	]
);
addMapping(
	[71, 73, 75, 77, 85, 86],
	['/backgrounds/snow/snow.jpg']
);
addMapping(
	[95, 96, 99],
	[
		'/backgrounds/storm/storm.jpg',
		'/backgrounds/storm/storm-2.jpg',
		'/backgrounds/storm/storm-3.jpg',
	]
);
addMapping(
	[100, 101],
	['/backgrounds/moon/moon.jpg']
);
addMapping(
	[200],
	['/backgrounds/cloud-moon/cloud-moon.jpg']
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

export function getBackground(code: number, hour: number): string {
	const images: string[] | undefined = BACKGROUND_MAP.get(
		handleBackgroundCode(code, hour)
	);

	if (images) {
		const randomIndex = Math.floor(Math.random() * images.length);
		return images[randomIndex];
	}

	return '';
}
