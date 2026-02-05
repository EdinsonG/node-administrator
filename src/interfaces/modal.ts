import { ReactNode, RefObject } from 'react';
import { ButtonProps, Breakpoint } from '@mui/material';

export interface ModalButtonObject {
  text: string;
  onClick: () => void | Promise<void>;
  variant: ButtonProps['variant'];
  color?: ButtonProps['color'];
  endIcon?: ReactNode;
}

export interface ModalData {
  title: string;
  description: ReactNode;
  actions: ModalButtonObject[];
  maxWidth?: Breakpoint | number;
  componentRef?: RefObject<HTMLDivElement>;
}
export interface UiStore<T = unknown> {
  modalObject: T | null;
  showModal: boolean;
  closeModal: () => void;
  setModal: (value: T) => void;
}

