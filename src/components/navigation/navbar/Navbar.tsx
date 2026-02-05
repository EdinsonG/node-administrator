'use client'

import { useTranslations } from 'next-intl';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import { Box, AppBar, Toolbar, Typography, styled, IconButton } from '@mui/material';
import { NavbarProps } from '@/interfaces';

const AppBarStyled = styled(AppBar)(({ theme }) => ({
  boxShadow: 'none',
  background: theme.palette.background.paper,
  justifyContent: 'center',
  backdropFilter: 'blur(4px)',
  [theme.breakpoints.up('lg')]: {
    minHeight: '70px',
  },
}));

const ToolbarStyled = styled(Toolbar)(({ theme }) => ({
  width: '100%',
  color: theme.palette.text.secondary,
}));

export default function Navbar({ toggleMobileSidebar }: NavbarProps) {
  const t = useTranslations();

  return (
    <AppBarStyled position="sticky" color="default">
      <ToolbarStyled>
        <IconButton 
          color="inherit" 
          aria-label="menu" 
          onClick={toggleMobileSidebar} 
          sx={{ display: { lg: "none", xs: "inline" } }}
        >
          <MenuOutlinedIcon />
        </IconButton>

        <Box sx={{ display: { xs: 'none', sm: 'block' }, mx: 2 }}>
          <Typography variant="h5" color="text.primary">
            { t('generic.sidebarDashboard') }
          </Typography>
          <Typography component="p">
            { t('generic.sidebarDescription') }
          </Typography>
        </Box>
      </ToolbarStyled>
    </AppBarStyled>
  );
};