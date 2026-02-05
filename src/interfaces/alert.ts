export interface AlertData {
  title?: string;
  description: string;
  severity?: 'error' | 'success' | 'info' | 'warning';
}

export interface AlertState {
  showPopper: boolean;
  popperObject: AlertData | null;
  setAlert: (data: AlertData) => void;
  closePopper: () => void;
}