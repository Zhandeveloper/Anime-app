import React, { createContext, useState, useEffect, useContext } from 'react';
import lightBackground from '../img/fon.jpg';
import darkBackground from '../img/fon-dark.jpg';
import lightHeader from '../img/fon-header.jpg';
import darkHeader from '../img/fon-header-dark.jpg';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Проверка системных настроек темы
  const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
  
  const [isDarkTheme, setIsDarkTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme === 'dark';
    } else {
      return prefersDarkScheme;
    }
  });

  const [backgroundImage, setBackgroundImage] = useState(() =>
    localStorage.getItem('backgroundImage') || (prefersDarkScheme ? darkBackground : lightBackground)
  );
  const [headerBack, setHeaderBack] = useState(() =>
    localStorage.getItem('headerBack') || (prefersDarkScheme ? darkHeader : lightHeader)
  );

  useEffect(() => {
    localStorage.setItem('theme', isDarkTheme ? 'dark' : 'light');
    setBackgroundImage(isDarkTheme ? darkBackground : lightBackground);
    setHeaderBack(isDarkTheme ? darkHeader : lightHeader);
  }, [isDarkTheme]);

  useEffect(() => {
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = (e) => {
      setIsDarkTheme(e.matches);
    };

    darkModeMediaQuery.addEventListener('change', handleChange);
    return () => {
      darkModeMediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

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
