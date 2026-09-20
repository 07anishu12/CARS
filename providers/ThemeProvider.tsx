'use client';

import React, { useState, useEffect } from 'react';
import { Theme } from '../types/theme';
import { ThemeContext } from '../contexts/ThemeContext';

export interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>('dark');
  const [mounted, setMounted] = useState(false);

  // Initialize theme from localStorage or system preference on client mount
  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem('kerb-theme') as Theme;
      if (savedTheme === 'light' || savedTheme === 'dark' || savedTheme === 'luxury') {
        setThemeState(savedTheme);
      } else {
        // Default to dark automotive theme
        setThemeState('dark');
        document.documentElement.setAttribute('data-theme', 'dark');
      }
    } catch (e) {
      console.warn('Failed to load theme from storage:', e);
    }
    setMounted(true);
  }, []);

  // Update theme and persist to localStorage
  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    try {
      localStorage.setItem('kerb-theme', newTheme);
      document.documentElement.setAttribute('data-theme', newTheme);
    } catch (e) {
      console.warn('Failed to persist theme to localStorage:', e);
    }
  };

  // Sync theme attribute once mounted to match the state
  useEffect(() => {
    if (mounted) {
      document.documentElement.setAttribute('data-theme', theme);
    }
  }, [theme, mounted]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
