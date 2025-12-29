import { MessageCircle, Syringe, MapPin, Phone, Globe } from 'lucide-react';
import { Screen, AppSettings } from '../App';

interface HomeScreenProps {
  navigateTo: (screen: Screen) => void;
  settings: AppSettings;
  onUpdateSettings: (settings: Partial<AppSettings>) => void;
}

const translations = {
  en: {
    greeting: 'Welcome to',
    appName: 'Swasthya Mitra',
    tagline: 'Public health guidance & awareness',
    chatNow: 'Start Chat',
    chatDesc: 'Ask about prevention, vaccines, and care',
    quickActions: 'Quick Actions',
    vaccination: 'Vaccination Info',
    vaccinationDesc: 'Free vaccines at government centers',
    nearbyCenter: 'Nearby Health Centers',
    nearbyCenterDesc: 'Find local health facilities',
    emergency: 'Emergency Help',
    emergencyDesc: 'Call 108 / 112',
    govtVerified: 'Government Verified',
    disclaimer:
      'This app provides health guidance and awareness only. It does not diagnose or treat diseases. For serious concerns, consult a nearby health worker or medical professional.',
    language: 'Language',
    alerts: 'Health Alerts',
    dengueAlert: 'Seasonal alert: Prevent dengue by removing standing water',
    vaccinationDrive: 'Information: Free vaccination camp at PHC this Sunday',
  },
  hi: {
    greeting: 'आपका स्वागत है',
    appName: 'स्वास्थ्य मित्र',
    tagline: 'जन स्वास्थ्य मार्गदर्शन और जागरूकता',
    chatNow: 'बात शुरू करें',
    chatDesc: 'बचाव, टीकाकरण और देखभाल के बारे में पूछें',
    quickActions: 'त्वरित कार्य',
    vaccination: 'टीकाकरण जानकारी',
    vaccinationDesc: 'सरकारी केंद्रों पर मुफ्त टीके',
    nearbyCenter: 'निकटतम स्वास्थ्य केंद्र',
    nearbyCenterDesc: 'स्थानीय स्वास्थ्य सुविधाएं खोजें',
    emergency: 'आपातकालीन मदद',
    emergencyDesc: '108 / 112 पर कॉल करें',
    govtVerified: 'सरकारी सत्यापित',
    disclaimer:
      'यह ऐप केवल स्वास्थ्य जानकारी और जागरूकता प्रदान करता है। यह रोगों का निदान या इलाज नहीं करता। गंभीर स्थिति में नजदीकी स्वास्थ्य कार्यकर्ता या डॉक्टर से संपर्क करें।',
    language: 'भाषा',
    alerts: 'स्वास्थ्य अलर्ट',
    dengueAlert: 'मौसमी सूचना: जमा पानी हटाकर डेंगू से बचाव करें',
    vaccinationDrive: 'सूचना: इस रविवार PHC में मुफ्त टीकाकरण शिविर',
  },
};

export function HomeScreen({ navigateTo, settings, onUpdateSettings }: HomeScreenProps) {
  const t = translations[settings.language as keyof typeof translations] || translations.en;

  const toggleLanguage = () => {
    const newLang = settings.language === 'en' ? 'hi' : 'en';
    onUpdateSettings({ language: newLang });
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      {/* Header */}
      <div className="bg-gradient-to-b from-blue-600 to-blue-700 text-white p-6 pb-10">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="bg-white p-3 rounded-full">
              <MessageCircle className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-blue-200">{t.greeting}</p>
              <h1 className="text-white">{t.appName}</h1>
              <p className="text-xs text-blue-100">{t.tagline}</p>
            </div>
          </div>
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-2 bg-blue-500 px-4 py-2 rounded-full hover:bg-blue-800 transition-colors"
          >
            <Globe className="w-5 h-5" />
            <span>{settings.language === 'en' ? 'हिं' : 'EN'}</span>
          </button>
        </div>

        <div className="bg-emerald-500 inline-flex items-center gap-2 px-4 py-2 rounded-full">
          <div className="w-2 h-2 bg-white rounded-full"></div>
          <span className="text-white text-sm">{t.govtVerified}</span>
        </div>
      </div>

      <div className="px-6 -mt-6">
        {/* Main Chat Card */}
        <button
          onClick={() => navigateTo('chat')}
          className="w-full bg-white rounded-3xl shadow-lg p-8 mb-6 hover:shadow-xl active:scale-98 transition-all border-2 border-blue-100"
        >
          <div className="flex items-center gap-5 mb-4">
            <div className="bg-blue-100 p-5 rounded-2xl">
              <MessageCircle className="w-10 h-10 text-blue-600" />
            </div>
            <div className="flex-1 text-left">
              <h2 className="text-slate-900 mb-1">{t.chatNow}</h2>
              <p className="text-slate-600">{t.chatDesc}</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm">
              {settings.language === 'hi' ? 'बुखार और खांसी' : 'Fever & cough'}
            </span>
            <span className="px-4 py-2 bg-emerald-50 text-emerald-700 rounded-full text-sm">
              {settings.language === 'hi' ? 'टीकाकरण' : 'Vaccination'}
            </span>
            <span className="px-4 py-2 bg-purple-50 text-purple-700 rounded-full text-sm">
              {settings.language === 'hi' ? 'बचाव' : 'Prevention'}
            </span>
          </div>
        </button>

        {/* Health Alerts */}
        <div className="mb-6">
          <h3 className="text-slate-900 mb-3">{t.alerts}</h3>
          <div className="space-y-3">
            <div className="bg-amber-50 border-l-4 border-amber-500 rounded-xl p-4">
              <p className="text-amber-900">{t.dengueAlert}</p>
            </div>
            <div className="bg-blue-50 border-l-4 border-blue-500 rounded-xl p-4">
              <p className="text-blue-900">{t.vaccinationDrive}</p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-6">
          <h3 className="text-slate-900 mb-3">{t.quickActions}</h3>
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => navigateTo('vaccination')}
              className="bg-white rounded-2xl p-6 shadow-md border-2 border-slate-100 hover:border-emerald-300 active:scale-95 transition-all text-left"
            >
              <div className="bg-emerald-100 p-4 rounded-xl mb-3 w-fit">
                <Syringe className="w-8 h-8 text-emerald-600" />
              </div>
              <h4 className="text-slate-900 mb-1">{t.vaccination}</h4>
              <p className="text-sm text-slate-600">{t.vaccinationDesc}</p>
            </button>

            <button
              onClick={() => navigateTo('nearby-services')}
              className="bg-white rounded-2xl p-6 shadow-md border-2 border-slate-100 hover:border-blue-300 active:scale-95 transition-all text-left"
            >
              <div className="bg-blue-100 p-4 rounded-xl mb-3 w-fit">
                <MapPin className="w-8 h-8 text-blue-600" />
              </div>
              <h4 className="text-slate-900 mb-1">{t.nearbyCenter}</h4>
              <p className="text-sm text-slate-600">{t.nearbyCenterDesc}</p>
            </button>
          </div>
        </div>

        {/* Emergency */}
        <button
          onClick={() => navigateTo('emergency')}
          className="w-full bg-red-50 border-2 border-red-300 rounded-2xl p-6 shadow-md hover:bg-red-100 active:scale-98 transition-all"
        >
          <div className="flex items-center gap-4">
            <div className="bg-red-500 p-4 rounded-xl">
              <Phone className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1 text-left">
              <h4 className="text-red-900 mb-1">{t.emergency}</h4>
              <p className="text-sm text-red-700">{t.emergencyDesc}</p>
            </div>
          </div>
        </button>

        {/* Disclaimer */}
        <div className="mt-6 bg-white rounded-2xl p-5 border-2 border-slate-200">
          <p className="text-sm text-slate-700 leading-relaxed">{t.disclaimer}</p>
        </div>
      </div>
    </div>
  );
}
