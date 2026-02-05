'use client';

import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { IconButton, Tooltip, keyframes } from '@mui/material';
import { useThemeController } from '@/app/providers';

const pulse = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(93,135,255,0.7); }
  70% { box-shadow: 0 0 0 10px rgba(93,135,255,0); }
  100% { box-shadow: 0 0 0 0 rgba(93,135,255,0); }
`;

export default function FloatingThemeSwitcher() {
  const { mode, toggleTheme } = useThemeController();

  return (
    <Tooltip placement="top" title={mode === 'light' ? 'Cambiar a oscuro' : 'Cambiar a claro'}>
      <IconButton
        onClick={toggleTheme}
        sx={{
          position: 'fixed',
          bottom: 70,
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
        {mode === 'light' ? <LightModeIcon /> : <DarkModeIcon />}
      </IconButton>
    </Tooltip>
  );
}
