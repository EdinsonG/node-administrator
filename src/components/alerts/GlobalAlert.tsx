'use client';

import { useTranslations } from 'next-intl';
import { Alert, AlertTitle, Snackbar } from '@mui/material';
import { alertStore } from '@/store/alertStore';

export default function GlobalAlert() {
  const t = useTranslations();
  const { showPopper, popperObject, closePopper } = alertStore();

  return (
    <Snackbar
      sx={{ maxWidth: 533 }}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={showPopper}
      autoHideDuration={5000}
      onClose={closePopper}
    >
      <Alert 
        variant="filled"
        severity={popperObject?.severity || "error"} 
        sx={{ minWidth: 250, fontSize: 14, color: '#fff' }} 
        onClose={closePopper}
      >
        <AlertTitle sx={{ fontWeight: 700, fontSize: 14 }}>
          {popperObject?.title || t('messages.somethingwentWrong')}
        </AlertTitle>
        {popperObject?.description || t('messages.pleaseTryAgain')}
      </Alert>
    </Snackbar>
  );
}