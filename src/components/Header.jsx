import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Sun, Moon, Eye } from 'lucide-react';
import { getSettings, updateTheme, THEMES } from '../utils/settings';

const Header = () => {
  const [currentTheme, setCurrentTheme] = useState('light');

  useEffect(() => {
    const settings = getSettings();
    setCurrentTheme(settings.theme);
  }, []);

  const handleThemeToggle = () => {
    const themes = [THEMES.LIGHT, THEMES.DARK, THEMES.HIGH_CONTRAST];
    const currentIndex = themes.indexOf(currentTheme);
    const nextIndex = (currentIndex + 1) % themes.length;
    const nextTheme = themes[nextIndex];
    
    updateTheme(nextTheme);
    setCurrentTheme(nextTheme);
  };

  const getThemeIcon = () => {
    switch (currentTheme) {
      case THEMES.DARK:
        return <Moon className="h-5 w-5" />;
      case THEMES.HIGH_CONTRAST:
        return <Eye className="h-5 w-5" />;
      default:
        return <Sun className="h-5 w-5" />;
    }
  };

  return (
    <header className="bg-theme-secondary shadow-sm border-b border-theme-border transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <div className="text-2xl font-bold text-accent-color transition-colors duration-300">stack4devs</div>
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={handleThemeToggle}
              className="p-3 rounded-lg transition-all duration-200 hover:bg-theme-tertiary hover:scale-110 focus:outline-none focus:ring-2 focus:ring-accent-color"
              title={`Current theme: ${currentTheme}. Click to switch.`}
              style={{
                backgroundColor: 'var(--bg-secondary)',
                color: 'var(--text-primary)',
                border: '2px solid var(--border-color)'
              }}
            >
              {getThemeIcon()}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 