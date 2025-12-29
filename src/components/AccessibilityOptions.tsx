import { Type, Volume2, FileText } from 'lucide-react';
import { AppSettings } from '../App';

interface AccessibilityOptionsProps {
  settings: AppSettings;
  onUpdate: (settings: Partial<AppSettings>) => void;
  onNext: () => void;
}

export function AccessibilityOptions({ settings, onUpdate, onNext }: AccessibilityOptionsProps) {
  const toggleOption = (key: keyof AppSettings) => {
    onUpdate({ [key]: !settings[key] });
  };

  const options = [
    {
      key: 'largeText' as keyof AppSettings,
      icon: Type,
      title: 'Large Text',
      description: 'Increase text size across the app',
      enabled: settings.largeText,
    },
    {
      key: 'voiceAssist' as keyof AppSettings,
      icon: Volume2,
      title: 'Voice Assistance',
      description: 'Read out important information',
      enabled: settings.voiceAssist,
    },
    {
      key: 'simpleLanguage' as keyof AppSettings,
      icon: FileText,
      title: 'Simple Language Mode',
      description: 'Use easier words and shorter sentences',
      enabled: settings.simpleLanguage,
    },
  ];

  return (
    <div className="flex flex-col min-h-screen p-6 bg-white">
      <div className="mb-8 mt-4">
        <h2 className="text-slate-900 mb-2">
          Accessibility Options
        </h2>
        <p className="text-slate-600">
          Customize your experience
        </p>
      </div>

      <div className="flex-1 space-y-4">
        {options.map((option) => {
          const Icon = option.icon;
          return (
            <button
              key={option.key}
              onClick={() => toggleOption(option.key)}
              className={`w-full p-5 rounded-xl border-2 transition-all text-left ${
                option.enabled
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-slate-200 bg-white'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-lg ${
                  option.enabled ? 'bg-blue-100' : 'bg-slate-100'
                }`}>
                  <Icon className={`w-6 h-6 ${
                    option.enabled ? 'text-blue-600' : 'text-slate-600'
                  }`} />
                </div>
                <div className="flex-1">
                  <div className="text-slate-900 mb-1">{option.title}</div>
                  <div className="text-sm text-slate-600">{option.description}</div>
                </div>
                <div className={`w-12 h-7 rounded-full transition-colors relative ${
                  option.enabled ? 'bg-blue-500' : 'bg-slate-300'
                }`}>
                  <div className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-transform ${
                    option.enabled ? 'translate-x-6' : 'translate-x-1'
                  }`} />
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <div className="mt-6">
        <button
          onClick={onNext}
          className="w-full bg-blue-600 text-white py-4 rounded-xl active:bg-blue-700 transition-colors shadow-md"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
