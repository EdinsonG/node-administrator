export type Locale = 'en' | 'es';
export type ThemeMode = 'light' | 'dark';

export interface LocaleController {
  locale: Locale;
  setLocale: (locale: 'en' | 'es') => void;
};

export interface ThemeController {
  mode: ThemeMode;
  toggleTheme: () => void;
};