import React from 'react';
import {
	SunIcon,
	CloudSunIcon,
	CloudIcon,
	SmogIcon,
	RainIcon,
	SnowIcon,
	CloudBoltIcon,
	MoonIcon,
	CloudMoonIcon,
} from '../icons';

const ICON_MAP: Map<
	number,
	React.FunctionComponent<React.SVGProps<SVGSVGElement>>
> = new Map<number, React.FunctionComponent<React.SVGProps<SVGSVGElement>>>();

function addMapping(
	values: number[],
	icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
): void {
	values.forEach((value: number) => {
		ICON_MAP.set(value, icon);
	});
}

addMapping([0, 1], SunIcon);
addMapping([2], CloudSunIcon);
addMapping([3], CloudIcon);
addMapping([45, 48], SmogIcon);
addMapping([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82], RainIcon);
addMapping([71, 73, 75, 77, 85, 86], SnowIcon);
addMapping([95, 96, 99], CloudBoltIcon);
addMapping([100, 101], MoonIcon);
addMapping([200], CloudMoonIcon);

function handleIconCode(iconCode: number, time?: number): number {
	let isNightTime = false;

	if (time) {
		const hour = new Date(time).getHours();
		isNightTime = hour < 5 || hour > 18;
	}

	if (isNightTime) {
		switch (iconCode) {
			case 0:
				return 100;
			case 1:
				return 101;
			case 2:
			case 3:
				return 200;
			default:
				return iconCode;
		}
	}

	return iconCode;
}

export function getIcon(
	iconCode: number,
	hour?: number
): React.FunctionComponent<React.SVGProps<SVGSVGElement>> | undefined {
	return ICON_MAP.get(handleIconCode(iconCode, hour));
}
