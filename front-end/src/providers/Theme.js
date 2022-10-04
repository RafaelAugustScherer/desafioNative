import React from 'react';
import PropTypes from 'prop-types';
import { createTheme } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import { green, grey } from '@mui/material/colors';

const AppThemeProvider = ({ children }) => {
  const THEME = createTheme({
    typography: {
      fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
      h3: {
        marginBottom: '40px',
      },
      h4: {
        margin: '20px 0',
      },
      h5: {
        fontWeight: 600,
      },
    },
    palette: {
      primary: {
        main: green[500],
      },
      secondary: {
        main: green[100],
        dark: grey[300],
      },
    },
  });

  return (
    <ThemeProvider theme={THEME}>
      { children }
    </ThemeProvider>
  );
};

AppThemeProvider.propTypes = {
  children: PropTypes.object,
};

export default AppThemeProvider;
