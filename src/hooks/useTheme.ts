import { useState, useEffect, useCallback } from 'react';

export const THEMES = [
	'sky',
	'purple',
	'lightseagreen',
	'seagreen',
	'crimson',
	'orange',
	'teal',
	'slate',
	'green',
] as const;

export type Theme = (typeof THEMES)[number];

const STORAGE_KEY = 'weathy-theme';

export const useTheme = () => {
	const [theme, setTheme] = useState<Theme>(() => {
		const stored = localStorage.getItem(STORAGE_KEY);
		return (THEMES.includes(stored as Theme) ? stored : 'sky') as Theme;
	});

	useEffect(() => {
		document.documentElement.setAttribute('data-theme', theme);
		localStorage.setItem(STORAGE_KEY, theme);
	}, [theme]);

	const cycleTheme = useCallback(() => {
		setTheme((prev) => {
			const idx = THEMES.indexOf(prev);
			return THEMES[(idx + 1) % THEMES.length];
		});
	}, []);

	return { theme, cycleTheme };
};
