import { ElementType } from "react";

export interface SidebarProps {
  isMobileSidebarOpen: boolean;
  onSidebarClose: (event: React.MouseEvent<HTMLElement>) => void;
  isSidebarOpen: boolean;
}

export interface NavbarProps {
  toggleMobileSidebar:  (event: React.MouseEvent<HTMLElement>) => void;
  sx?: React.CSSProperties;
}

export interface MenuItemType {
  id?: string;
  title?: string;
  icon?: ElementType;
  href?: string;
  subheader?: string;
  navlabel?: boolean;
  children?: MenuItemType[];
}