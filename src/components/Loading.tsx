'use client';

import { Backdrop, CircularProgress } from '@mui/material';
import useLoadingStore from '@/store/loadingStore';

export default function Loading() {
  const isLoading = useLoadingStore((state) => state.isLoading);

  return (
    <Backdrop open={isLoading} sx={{ zIndex: (theme) => theme.zIndex.modal + 1 }}>
      <CircularProgress />
    </Backdrop>
  );
}
