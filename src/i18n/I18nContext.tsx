import {
	createContext,
	useContext,
	useState,
	useCallback,
	ReactNode,
} from 'react';
import { Language, translations, defaultLanguage } from './translations';
import type { TranslationType } from './translations';
import { getStoredData } from '../utils/get-stored-data';
import { storeData } from '../utils/store-data';
import { LocalStorage } from '../utils/constants';

interface I18nContextType {
	language: Language;
	t: (key: string, params?: Record<string, string>) => string;
	switchLanguage: (lang: Language) => void;
}

const I18nContext = createContext<I18nContextType | null>(null);

interface I18nProviderProps {
	children: ReactNode;
}

export const I18nProvider: React.FC<I18nProviderProps> = ({ children }) => {
	const [language, setLanguage] = useState<Language>(
		() => getStoredData(LocalStorage.LANGUAGE) || defaultLanguage,
	);

	const t = useCallback(
		(key: string, params?: Record<string, string>): string => {
			const translation =
				translations[language][key as keyof TranslationType];
			if (!translation) {
				console.warn(`Translation key not found: ${key}`);
				return key;
			}

			if (!params) return translation;

			return Object.keys(params).reduce(
				(str, param) => str.replace(`{${param}}`, params[param]),
				translation,
			);
		},
		[language],
	);

	const switchLanguage = useCallback((lang: Language) => {
		setLanguage(lang);
		storeData(LocalStorage.LANGUAGE, lang);
	}, []);

	return (
		<I18nContext.Provider value={{ language, t, switchLanguage }}>
			{children}
		</I18nContext.Provider>
	);
};

export const useI18n = (): I18nContextType => {
	const context = useContext(I18nContext);
	if (!context) {
		throw new Error('useI18n must be used within an I18nProvider');
	}
	return context;
};
