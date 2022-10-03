import React from 'react';
import PropTypes from 'prop-types';
import { createTheme } from '@mui/material';
import { ThemeProvider } from '@emotion/react';

const AppThemeProvider = ({ children }) => {
  const THEME = createTheme({
    typography: {
      fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
      h3: {
        marginBottom: '40px',
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
