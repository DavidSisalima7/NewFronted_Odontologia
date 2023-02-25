
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';
import React from 'react';
interface ThemeProp {
  children: JSX.Element;
}

export enum themePalette {
  BG = '#ffff',
  LIME = '#0e7286',
  FONT_GLOBAL = "'JetBrains Mono', monospace"
}
const theme = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: themePalette.BG
    },
    primary: {
      main: themePalette.LIME
    }
  },
  typography: {
    fontFamily: themePalette.FONT_GLOBAL
  },
  components: {
    MuiButton: {
      defaultProps: {
        style: {
          textTransform: 'none',
          boxShadow: 'none',
          borderRadius: '0.5em'
        }
      }
    }
  }
});

export const ThemeConfig: React.FC<ThemeProp> = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> {children}
    </ThemeProvider>
  );
};
