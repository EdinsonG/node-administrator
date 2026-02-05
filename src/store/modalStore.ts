import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { ModalData, UiStore } from '@/interfaces';

const modalStore = create<UiStore<ModalData>>()(
  devtools(
    (set) => ({
      modalObject: null,
      showModal: false,
      closeModal: () => set({ showModal: false }, false, 'closeModal'),
      setModal: (value: ModalData) => set({ showModal: true, modalObject: value }, false, 'setModal'),
    }),
    { name: 'modalStore' }
  )
);


export default modalStore;
