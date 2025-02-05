import React from 'react';
import { useTheme } from '../ThemeContext';

const ThemeToggle = () => {
    const { isDarkMode, toggleTheme } = useTheme();

    return (
        <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
            title={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
        >
            <span className={isDarkMode ? 'enter' : 'exit'}>🌞</span>
            <span className={isDarkMode ? 'exit' : 'enter'}>🌙</span>
        </button>
    );
};

export default ThemeToggle;
