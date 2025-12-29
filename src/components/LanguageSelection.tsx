import { Check } from 'lucide-react';

interface LanguageSelectionProps {
  onNext: () => void;
  onSelectLanguage: (lang: string) => void;
  currentLanguage: string;
}

const languages = [
  { code: 'en', name: 'English', nativeName: 'English', enabled: true },
  { code: 'hi', name: 'Hindi', nativeName: 'हिंदी', enabled: true },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', enabled: false },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', enabled: false },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', enabled: false },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी', enabled: false },
];

export function LanguageSelection({ onNext, onSelectLanguage, currentLanguage }: LanguageSelectionProps) {
  const handleSelect = (code: string, enabled: boolean) => {
    if (enabled) {
      onSelectLanguage(code);
    }
  };

  return (
    <div className="flex flex-col min-h-screen p-6 bg-white">
      <div className="mb-8 mt-4">
        <h2 className="text-slate-900 mb-2">
          Choose Your Language
        </h2>
        <p className="text-slate-600">
          भाषा चुनें
        </p>
      </div>

      <div className="flex-1 space-y-3">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => handleSelect(lang.code, lang.enabled)}
            disabled={!lang.enabled}
            className={`w-full p-5 rounded-xl border-2 transition-all text-left relative ${
              lang.enabled
                ? currentLanguage === lang.code
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-slate-200 bg-white hover:border-blue-300 active:bg-slate-50'
                : 'border-slate-100 bg-slate-50 opacity-60'
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="text-slate-900 mb-1">{lang.nativeName}</div>
                <div className="text-sm text-slate-500">{lang.name}</div>
              </div>
              {lang.enabled ? (
                currentLanguage === lang.code && (
                  <div className="bg-blue-500 rounded-full p-1">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                )
              ) : (
                <span className="text-xs text-slate-400 bg-slate-200 px-2 py-1 rounded">
                  Coming Soon
                </span>
              )}
            </div>
          </button>
        ))}
      </div>

      <div className="mt-6">
        <p className="text-sm text-slate-500 text-center mb-4">
          You can change language later in settings
        </p>
        <button
          onClick={onNext}
          disabled={!currentLanguage}
          className="w-full bg-blue-600 text-white py-4 rounded-xl active:bg-blue-700 transition-colors disabled:bg-slate-300 disabled:cursor-not-allowed shadow-md"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
