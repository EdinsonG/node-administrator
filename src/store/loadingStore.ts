import { create } from 'zustand';
import { LoadingState } from '@/interfaces';

const useLoadingStore = create<LoadingState>((set) => ({
  isLoading: false,
  setLoading: (loading) => set({ isLoading: loading }),
}));

export default useLoadingStore;
