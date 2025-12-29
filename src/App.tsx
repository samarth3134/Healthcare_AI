import { useState, useEffect } from 'react';
import { WelcomeScreen } from './components/WelcomeScreen';
import { LanguageSelection } from './components/LanguageSelection';
import { AccessibilityOptions } from './components/AccessibilityOptions';
import { PermissionsScreen } from './components/PermissionsScreen';
import { HomeScreen } from './components/HomeScreen';
import { ChatInterface } from './components/ChatInterface';
import { VaccinationFlow } from './components/VaccinationFlow';
import { EmergencyScreen } from './components/EmergencyScreen';
import { NearbyServices } from './components/NearbyServices';
import { SOSButton } from './components/SOSButton';

export type Screen = 
  | 'welcome'
  | 'language'
  | 'accessibility'
  | 'permissions'
  | 'home'
  | 'chat'
  | 'vaccination'
  | 'emergency'
  | 'nearby-services';

export interface AppSettings {
  language: string;
  largeText: boolean;
  voiceAssist: boolean;
  simpleLanguage: boolean;
  locationPermission: boolean;
  notificationPermission: boolean;
}

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('welcome');
  const [settings, setSettings] = useState<AppSettings>({
    language: 'en',
    largeText: false,
    voiceAssist: false,
    simpleLanguage: false,
    locationPermission: false,
    notificationPermission: false,
  });

  const navigateTo = (screen: Screen) => {
    setCurrentScreen(screen);
    window.scrollTo(0, 0);
  };

  const updateSettings = (newSettings: Partial<AppSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  const showSOS = currentScreen !== 'welcome' && currentScreen !== 'language' && 
                  currentScreen !== 'accessibility' && currentScreen !== 'permissions';

  return (
    <div className={`min-h-screen bg-slate-50 ${settings.largeText ? 'text-lg' : ''}`}>
      <div className="max-w-md mx-auto bg-white min-h-screen relative shadow-lg">
        {currentScreen === 'welcome' && (
          <WelcomeScreen onNext={() => navigateTo('language')} />
        )}
        {currentScreen === 'language' && (
          <LanguageSelection 
            onNext={() => navigateTo('accessibility')}
            onSelectLanguage={(lang) => updateSettings({ language: lang })}
            currentLanguage={settings.language}
          />
        )}
        {currentScreen === 'accessibility' && (
          <AccessibilityOptions
            settings={settings}
            onUpdate={updateSettings}
            onNext={() => navigateTo('permissions')}
          />
        )}
        {currentScreen === 'permissions' && (
          <PermissionsScreen
            settings={settings}
            onUpdate={updateSettings}
            onNext={() => navigateTo('home')}
          />
        )}
        {currentScreen === 'home' && (
          <HomeScreen 
            navigateTo={navigateTo}
            settings={settings}
            onUpdateSettings={updateSettings}
          />
        )}
        {currentScreen === 'chat' && (
          <ChatInterface 
            navigateTo={navigateTo}
            settings={settings}
          />
        )}
        {currentScreen === 'vaccination' && (
          <VaccinationFlow 
            navigateTo={navigateTo}
            settings={settings}
          />
        )}
        {currentScreen === 'emergency' && (
          <EmergencyScreen 
            navigateTo={navigateTo}
            settings={settings}
          />
        )}
        {currentScreen === 'nearby-services' && (
          <NearbyServices 
            navigateTo={navigateTo}
            settings={settings}
          />
        )}

        {showSOS && <SOSButton onClick={() => navigateTo('emergency')} />}
      </div>
    </div>
  );
}