'use client';

import { useTranslations } from 'next-intl';
import { IconButton, Tooltip, Typography, keyframes } from '@mui/material';
import { useLocaleController } from '@/app/providers';

const pulse = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(31, 204, 214, 0.7); }
  70% { box-shadow: 0 0 0 10px rgba(31, 204, 214, 0); }
  100% { box-shadow: 0 0 0 0 rgba(31, 204, 214, 0); }
`;

export default function FloatingLanguageSwitcher() {
  const t = useTranslations();
  const { locale, setLocale } = useLocaleController();

  const toggleLocale = () => {
    const newLocale = locale === 'en' ? 'es' : 'en';
    setLocale(newLocale); 
  };

  return (
    <Tooltip placement="top" title={t("language.change", { item: locale === 'es' ? t('language.english') : t('language.spanish') })}>
      <IconButton
        onClick={toggleLocale}
        sx={{
          position: 'fixed',
          bottom: 10,
          right: 20,
          zIndex: 1300,
          background: 'linear-gradient(45deg, #5D87FF, #4570EA, #5D87FF)',
          color: 'white',
          width: 45,
          height: 45,
          borderRadius: '50%',
          animation: `${pulse} 2.5s infinite`,
        }}
      >
        <Typography variant="body1">
          {locale === "en" ? "EN" : "ES"}
        </Typography>
      </IconButton>
    </Tooltip>
  );
}
