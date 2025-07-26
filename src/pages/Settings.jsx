import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Sun, Moon, Eye, Bot, User } from 'lucide-react';
import { getSettings, updateTheme, updateAIPreference, THEMES } from '../utils/settings';

const Settings = () => {
  const [settings, setSettings] = useState(getSettings());

  const handleThemeChange = (theme) => {
    updateTheme(theme);
    setSettings(prev => ({ ...prev, theme }));
  };

  const handleAIPreferenceChange = (preference) => {
    updateAIPreference(preference);
    setSettings(prev => ({ ...prev, aiPreference: preference }));
  };

  const themeOptions = [
    { value: THEMES.LIGHT, label: 'Light Mode', icon: Sun, description: 'Clean, bright interface' },
    { value: THEMES.DARK, label: 'Dark Mode', icon: Moon, description: 'Easy on the eyes' },
    { value: THEMES.HIGH_CONTRAST, label: 'High Contrast', icon: Eye, description: 'Maximum readability' }
  ];

  const aiOptions = [
    { value: 'manual', label: 'Do It Myself', icon: User, description: 'I prefer to handle tasks manually' },
    { value: 'ai', label: 'AI Assistance', icon: Bot, description: 'Let AI help automate tasks' },
    { value: 'hybrid', label: 'Hybrid Approach', icon: Bot, description: 'Mix of manual and AI assistance' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
          <p className="text-gray-600">Customize your experience</p>
        </div>

        <div className="space-y-8">
          {/* Theme Settings */}
          <div className="card">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Theme</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {themeOptions.map((option) => {
                const Icon = option.icon;
                const isSelected = settings.theme === option.value;
                return (
                  <button
                    key={option.value}
                    onClick={() => handleThemeChange(option.value)}
                    className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                      isSelected
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center justify-center mb-2">
                      <Icon className={`h-6 w-6 ${isSelected ? 'text-blue-600' : 'text-gray-400'}`} />
                    </div>
                    <div className="text-center">
                      <div className={`font-medium ${isSelected ? 'text-blue-900' : 'text-gray-900'}`}>
                        {option.label}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {option.description}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* AI Preference Settings */}
          <div className="card">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">AI Assistance Preference</h2>
            <p className="text-gray-600 mb-4">
              Choose how you'd like to interact with automated tools and AI features
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {aiOptions.map((option) => {
                const Icon = option.icon;
                const isSelected = settings.aiPreference === option.value;
                return (
                  <button
                    key={option.value}
                    onClick={() => handleAIPreferenceChange(option.value)}
                    className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                      isSelected
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center justify-center mb-2">
                      <Icon className={`h-6 w-6 ${isSelected ? 'text-blue-600' : 'text-gray-400'}`} />
                    </div>
                    <div className="text-center">
                      <div className={`font-medium ${isSelected ? 'text-blue-900' : 'text-gray-900'}`}>
                        {option.label}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {option.description}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Additional Settings */}
          <div className="card">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Additional Settings</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-gray-900">Save search history</div>
                  <div className="text-sm text-gray-500">Remember your recent searches</div>
                </div>
                <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200">
                  <span className="inline-block h-4 w-4 transform rounded-full bg-white transition"></span>
                </button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-gray-900">Email notifications</div>
                  <div className="text-sm text-gray-500">Get updates about new tools</div>
                </div>
                <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200">
                  <span className="inline-block h-4 w-4 transform rounded-full bg-white transition"></span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings; 