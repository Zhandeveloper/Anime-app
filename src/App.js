import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Popular from './Components/Popular';
import AnimeItem from './Components/AnimeItem';
import HomePage from './Components/HomePage';
import Gallery from './Components/Gallery';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import ScrollToTop from './context/ScrollToTop';

function AppWrapper() {
  const { isDarkTheme, backgroundImage } = useTheme();

  return (
    <div className={`App ${isDarkTheme ? 'dark-theme' : ''}`} style={{ backgroundImage: `url(${backgroundImage})` }}>
      <ScrollToTop />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/anime/:id' element={<AnimeItem />} />
        <Route path='/character/:id' element={<Gallery />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <AppWrapper />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
