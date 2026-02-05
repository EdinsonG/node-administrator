'use client';

import React, { useState } from 'react';
import { Container, Box } from '@mui/material';
import { Sidebar, Navbar } from '@/components';

export default function RootLayout({ children }: { children: React.ReactNode; }) {
  const [isSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  return (
    <Box display="flex" minHeight="100vh" width="100%">
      <Sidebar isSidebarOpen={isSidebarOpen} isMobileSidebarOpen={isMobileSidebarOpen} onSidebarClose={() => setMobileSidebarOpen(false)} />
      <Box display="flex" flexGrow={1} pb="60px" flexDirection="column" zIndex={1} bgcolor="transparent">
        <Navbar toggleMobileSidebar={() => setMobileSidebarOpen(true)} />
        <Container sx={{ paddingTop: "20px", maxWidth: "1200px" }} >
          <Box sx={{ minHeight: "calc(100vh - 170px)" }}>{children}</Box>
        </Container>
      </Box>
    </Box>
  );
}
