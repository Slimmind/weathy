import { en } from './en';
import { ru } from './ru';

export type Language = 'en' | 'ru';

export type TranslationType = typeof en;

export const translations: Record<Language, TranslationType> = { en, ru };

export const defaultLanguage: Language = 'en';
