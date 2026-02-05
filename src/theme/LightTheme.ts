'use client'

import { createTheme } from "@mui/material/styles";
import { Plus_Jakarta_Sans } from "next/font/google";

export const plus = Plus_Jakarta_Sans({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  fallback: ["Helvetica", "Arial", "sans-serif"],
});

export const LightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#5D87FF",
      light: "#ECF2FF",
      dark: "#4570EA",
    },
    secondary: {
      main: "#49BEFF",
      light: "#E8F7FF",
      dark: "#23afdb",
    },
    success: {
      main: "#4CAF50",
      light: "#A5D6A7",
      dark: "#388E3C",
      contrastText: "#ffffff",
    },
    error: {
      main: "#F44336",
      light: "#EF9A9A",
      dark: "#C62828",
      contrastText: "#ffffff",
    },
    warning: {
      main: "#FF9800",
      light: "#FFB74D",
      dark: "#F57C00",
      contrastText: "#ffffff",
    },
    text: {
      primary: "#2A3547",
      secondary: "#5A6A85",
    },
  },
  typography: {
    fontFamily: plus.style.fontFamily,
    h1: { fontWeight: 600, fontSize: "2.25rem", lineHeight: "2.75rem" },
    h2: { fontWeight: 600, fontSize: "1.875rem", lineHeight: "2.25rem" },
    h3: { fontWeight: 600, fontSize: "1.5rem", lineHeight: "1.75rem" },
    h4: { fontWeight: 600, fontSize: "1.3125rem", lineHeight: "1.6rem" },
    h5: { fontWeight: 600, fontSize: "1.125rem", lineHeight: "1.6rem" },
    h6: { fontWeight: 600, fontSize: "1rem", lineHeight: "1.2rem" },
    body1: { fontSize: "0.875rem", fontWeight: 500, lineHeight: "1.334rem" },
    body2: { fontSize: "0.75rem", fontWeight: 400, lineHeight: "1rem" },
    subtitle1: { fontSize: "0.875rem", fontWeight: 400 },
    subtitle2: { fontSize: "0.875rem", fontWeight: 400 },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: "#FFFFFF",
          color: "#121212",
        },
        ".MuiPaper-elevation9, .MuiPopover-root .MuiPaper-elevation": {
          boxShadow:
            "rgb(145 158 171 / 30%) 0px 0px 2px 0px, rgb(145 158 171 / 12%) 0px 12px 24px -4px !important",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "10px",
          backgroundColor: "#FFFFFF",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          borderRadius: "10px",
          '& .MuiOutlinedInput-root': {
            borderRadius: '10px',
            '&:hover fieldset': { borderColor: '#5D87FF' },
            '&.Mui-focused fieldset': { borderColor: '#5D87FF' },
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: '10px',
          padding: '8px 20px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          boxShadow: 'none',
        },
        containedPrimary: {
          color: '#FFF',
          background: 'linear-gradient(45deg, #5D87FF, #4570EA, #5D87FF)',
          '&:hover': { 
            background: 'linear-gradient(45deg, #4570EA, #5D87FF, #4570EA)', 
            boxShadow: 'none' 
          },
          '&.Mui-disabled': {
            background: '#B0BEC5',
          },
        },
        outlinedPrimary: {
          borderColor: '#5D87FF',
          color: '#5D87FF',
          '&:hover': { 
            background: 'linear-gradient(45deg, #49BEFF, #23afdb, #49BEFF)',
            borderColor: '#49BEFF',
            color: '#FFF',
          },
        },
      },
    },
  },
});
