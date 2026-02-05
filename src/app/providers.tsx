'use client';

import { NextIntlClientProvider } from 'next-intl';
import { ThemeProvider, CssBaseline, Box, CircularProgress } from '@mui/material';
import { createContext, useContext, useState, useCallback, ReactNode, useEffect, useMemo } from 'react';
import en from '@/locales/en.json';
import es from '@/locales/es.json';
import { DarkTheme } from '@/theme/DarkTheme';
import { LightTheme } from '@/theme/LightTheme';
import { Locale, ThemeMode, LocaleController, ThemeController } from '@/interfaces';

const LocaleControllerContext = createContext<LocaleController>({ locale: 'en', setLocale: () => {} });
const ThemeControllerContext = createContext<ThemeController>({ mode: 'light', toggleTheme: () => {} });

export const useLocaleController = () => useContext(LocaleControllerContext);
export const useThemeController = () => useContext(ThemeControllerContext);

export default function Providers({ children }: { children: ReactNode }) {
  const messagesMap = { en, es };

  const [locale, setLocale] = useState<Locale>('en');
  const [mode, setMode] = useState<ThemeMode>('light');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const savedLocale = localStorage.getItem('NEXT_LOCALE') as Locale;
    const savedTheme = localStorage.getItem('NEXT_THEME') as ThemeMode;

    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (savedLocale) setLocale(savedLocale);
    if (savedTheme) setMode(savedTheme);
    
    setIsMounted(true);
  }, []);

  const handleSetLocale = useCallback((newLocale: Locale) => {
    setLocale(newLocale);
    localStorage.setItem('NEXT_LOCALE', newLocale);
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000; SameSite=Lax`;
  }, []);

  const toggleTheme = useCallback(() => {
    setMode((prev) => {
      const next = prev === 'light' ? 'dark' : 'light';
      localStorage.setItem('NEXT_THEME', next);
      return next;
    });
  }, []);

  const currentTheme = useMemo(() => (mode === 'light' ? LightTheme : DarkTheme), [mode]);

  if (!isMounted) {
    return (
      <ThemeProvider theme={LightTheme}>
        <CssBaseline />
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
          <CircularProgress />
        </Box>
      </ThemeProvider>
    );
  }

  return (
    <NextIntlClientProvider locale={locale} messages={messagesMap[locale]} timeZone="UTC">
      <LocaleControllerContext.Provider value={{ locale, setLocale: handleSetLocale }}>
        <ThemeControllerContext.Provider value={{ mode, toggleTheme }}>
          <ThemeProvider theme={currentTheme}>
            <CssBaseline />
            {children}
          </ThemeProvider>
        </ThemeControllerContext.Provider>
      </LocaleControllerContext.Provider>
    </NextIntlClientProvider>
  );
}