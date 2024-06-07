import React, { createContext, useState, useEffect, useContext } from 'react';
import lightBackground from '../img/fon.jpg';
import darkBackground from '../img/fon-dark.jpg';
import lightHeader from '../img/fon-header.jpg';
import darkHeader from '../img/fon-header-dark.jpg';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(localStorage.getItem('theme') === 'dark');
  const [backgroundImage, setBackgroundImage] = useState(
    localStorage.getItem('backgroundImage') || lightBackground
  );
  const [headerBack, setHeaderBack] = useState(
    localStorage.getItem('headerBack') || lightHeader
  );

  useEffect(() => {
    localStorage.setItem('theme', isDarkTheme ? 'dark' : 'light');
    setBackgroundImage(isDarkTheme ? darkBackground : lightBackground);
    setHeaderBack(isDarkTheme ? darkHeader : lightHeader);
  }, [isDarkTheme]);

  const toggleTheme = () => {
    setIsDarkTheme((prevTheme) => !prevTheme);
  };

  return (
    <ThemeContext.Provider value={{ isDarkTheme, toggleTheme, backgroundImage, headerBack }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
