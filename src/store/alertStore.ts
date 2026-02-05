import { create } from 'zustand';
import { AlertState } from '@/interfaces';

export const alertStore = create<AlertState>((set) => ({
  showPopper: false,
  popperObject: null,
  setAlert: (data) => set({ 
    showPopper: true, 
    popperObject: { severity: 'error', ...data }
  }),
  closePopper: () => set({ showPopper: false }),
}));