import { ReactNode } from 'react';

export interface NodeListProps {
  headers: Array<{ id: string; headerName: string }>;
  children?: ReactNode;
  loading: boolean;
}
