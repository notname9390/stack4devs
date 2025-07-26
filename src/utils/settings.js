export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
  HIGH_CONTRAST: 'high-contrast'
};

export function getSettings() {
  return JSON.parse(localStorage.getItem('settings') || '{"theme":"light","aiPreference":"manual"}');
}

export function saveSettings(settings) {
  localStorage.setItem('settings', JSON.stringify(settings));
}

export function updateTheme(theme) {
  const settings = getSettings();
  settings.theme = theme;
  saveSettings(settings);
  applyTheme(theme);
}

export function updateAIPreference(preference) {
  const settings = getSettings();
  settings.aiPreference = preference;
  saveSettings(settings);
}

export function applyTheme(theme) {
  const root = document.documentElement;
  
  // Remove all theme classes
  root.classList.remove('theme-light', 'theme-dark', 'theme-high-contrast');
  
  // Add the selected theme class
  root.classList.add(`theme-${theme}`);
  
  // Apply specific theme styles
  if (theme === THEMES.DARK) {
    root.style.setProperty('--bg-primary', '#000000');
    root.style.setProperty('--bg-secondary', '#000000');
    root.style.setProperty('--bg-tertiary', '#000000');
    root.style.setProperty('--text-primary', '#ffffff');
    root.style.setProperty('--text-secondary', '#ffffff');
    root.style.setProperty('--text-muted', '#cccccc');
    root.style.setProperty('--border-color', '#333333');
    root.style.setProperty('--accent-color', '#3b82f6');
    root.style.setProperty('--accent-hover', '#2563eb');
    root.style.setProperty('--card-bg', '#000000');
    root.style.setProperty('--button-primary', '#3b82f6');
    root.style.setProperty('--button-primary-hover', '#2563eb');
    root.style.setProperty('--button-secondary', '#333333');
    root.style.setProperty('--button-secondary-hover', '#444444');
    root.style.setProperty('--header-bg', '#000000');
    root.style.setProperty('--gradient-start', '#000000');
    root.style.setProperty('--gradient-end', '#000000');
  } else if (theme === THEMES.HIGH_CONTRAST) {
    root.style.setProperty('--bg-primary', '#000000');
    root.style.setProperty('--bg-secondary', '#000000');
    root.style.setProperty('--bg-tertiary', '#000000');
    root.style.setProperty('--text-primary', '#ffffff');
    root.style.setProperty('--text-secondary', '#ffffff');
    root.style.setProperty('--text-muted', '#ffffff');
    root.style.setProperty('--border-color', '#ffffff');
    root.style.setProperty('--accent-color', '#ffff00');
    root.style.setProperty('--accent-hover', '#ffff00');
    root.style.setProperty('--card-bg', '#000000');
    root.style.setProperty('--button-primary', '#ffff00');
    root.style.setProperty('--button-primary-hover', '#ffff00');
    root.style.setProperty('--button-secondary', '#ffffff');
    root.style.setProperty('--button-secondary-hover', '#ffffff');
    root.style.setProperty('--header-bg', '#000000');
    root.style.setProperty('--gradient-start', '#000000');
    root.style.setProperty('--gradient-end', '#000000');
  } else {
    // Light theme (default)
    root.style.setProperty('--bg-primary', '#ffffff');
    root.style.setProperty('--bg-secondary', '#f9fafb');
    root.style.setProperty('--bg-tertiary', '#f3f4f6');
    root.style.setProperty('--text-primary', '#111827');
    root.style.setProperty('--text-secondary', '#6b7280');
    root.style.setProperty('--text-muted', '#9ca3af');
    root.style.setProperty('--border-color', '#e5e7eb');
    root.style.setProperty('--accent-color', '#3b82f6');
    root.style.setProperty('--accent-hover', '#2563eb');
    root.style.setProperty('--card-bg', '#ffffff');
    root.style.setProperty('--button-primary', '#3b82f6');
    root.style.setProperty('--button-primary-hover', '#2563eb');
    root.style.setProperty('--button-secondary', '#ffffff');
    root.style.setProperty('--button-secondary-hover', '#f9fafb');
    root.style.setProperty('--header-bg', '#ffffff');
    root.style.setProperty('--gradient-start', '#dbeafe');
    root.style.setProperty('--gradient-end', '#ffffff');
  }
}

// Initialize theme on app load
export function initializeTheme() {
  const settings = getSettings();
  applyTheme(settings.theme);
} 