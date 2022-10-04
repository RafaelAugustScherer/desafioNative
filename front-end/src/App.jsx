import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import AppThemeProvider from './providers/Theme';
import CustomerProvider from './providers/Customer';
import CustomersByCity from './pages/CustomersByCity';

function App() {

  return (
    <AppThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route
              index
              element={
                <CustomerProvider>
                  <Home />
                </CustomerProvider>
              }
            />
            <Route
              path="login"
              element={<Login />}
            />
            <Route
              path="city/:cityName"
              element={
                <CustomerProvider>
                  <CustomersByCity />
                </CustomerProvider>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppThemeProvider>
  );
}

export default App;
