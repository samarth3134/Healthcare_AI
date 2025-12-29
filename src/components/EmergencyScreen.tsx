import { useState } from 'react';
import { Phone, ArrowLeft, Wifi, WifiOff, MapPin } from 'lucide-react';
import { Screen, AppSettings } from '../App';

interface EmergencyScreenProps {
  navigateTo: (screen: Screen) => void;
  settings: AppSettings;
}

const emergencyNumbers = [
  { name: 'Ambulance', nameHi: 'एम्बुलेंस', number: '108', icon: '🚑' },
  { name: 'Emergency', nameHi: 'आपातकाल', number: '112', icon: '🚨' },
  { name: 'Health Helpline', nameHi: 'स्वास्थ्य हेल्पलाइन', number: '104', icon: '☎️' },
];

export function EmergencyScreen({ navigateTo, settings }: EmergencyScreenProps) {
  const [isOnline] = useState(navigator.onLine);

  const handleCall = (number: string) => {
    window.location.href = `tel:${number}`;
  };

  return (
    <div className="min-h-screen bg-red-50">
      {/* Header */}
      <div className="bg-red-600 text-white p-6 pb-8 sticky top-0 shadow-md">
        <button
          onClick={() => navigateTo('home')}
          className="mb-4 p-2 hover:bg-red-700 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-7 h-7" />
        </button>
        <h1 className="text-white mb-2">
          {settings.language === 'hi' ? '🚨 आपातकालीन सहायता' : '🚨 Emergency Help'}
        </h1>
        <p className="text-red-100">
          {settings.language === 'hi' ? 'तुरंत कॉल करें' : 'Call immediately'}
        </p>
      </div>

      <div className="p-6">
        {/* Connection Status */}
        <div
          className={`mb-6 p-5 rounded-2xl flex items-center gap-4 ${
            isOnline
              ? 'bg-emerald-100 border-2 border-emerald-300'
              : 'bg-amber-100 border-2 border-amber-300'
          }`}
        >
          {isOnline ? (
            <>
              <Wifi className="w-7 h-7 text-emerald-600 flex-shrink-0" />
              <span className="text-emerald-900">
                {settings.language === 'hi' ? 'इंटरनेट उपलब्ध' : 'Internet Available'}
              </span>
            </>
          ) : (
            <>
              <WifiOff className="w-7 h-7 text-amber-600 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-amber-900 mb-1">
                  {settings.language === 'hi' ? 'ऑफलाइन मोड' : 'Offline Mode'}
                </p>
                <p className="text-sm text-amber-700">
                  {settings.language === 'hi'
                    ? 'आप फोन नंबर देख सकते हैं और कॉल कर सकते हैं'
                    : 'You can view numbers and make calls'}
                </p>
              </div>
            </>
          )}
        </div>

        {/* Important Warning */}
        <div className="bg-red-100 border-l-4 border-red-600 rounded-2xl p-6 mb-6">
          <h3 className="text-red-900 mb-3">
            {settings.language === 'hi' ? '⚠️ कब कॉल करें?' : '⚠️ When to Call?'}
          </h3>
          <ul className="space-y-2 text-red-800 leading-relaxed">
            <li className="flex items-start gap-2">
              <span className="text-red-600">•</span>
              <span>
                {settings.language === 'hi' ? 'सांस लेने में बहुत तकलीफ' : 'Severe breathing difficulty'}
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-600">•</span>
              <span>{settings.language === 'hi' ? 'सीने में तेज दर्द' : 'Severe chest pain'}</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-600">•</span>
              <span>
                {settings.language === 'hi' ? 'बेहोशी या गिरना' : 'Unconsciousness or collapse'}
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-600">•</span>
              <span>{settings.language === 'hi' ? 'बहुत ज्यादा खून बहना' : 'Heavy bleeding'}</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-600">•</span>
              <span>{settings.language === 'hi' ? 'गंभीर दुर्घटना' : 'Serious accident'}</span>
            </li>
          </ul>
        </div>

        {/* Emergency Numbers */}
        <h3 className="text-slate-900 mb-4">
          {settings.language === 'hi' ? 'तुरंत कॉल करें' : 'Call Now'}
        </h3>
        <div className="space-y-4 mb-6">
          {emergencyNumbers.map((emergency) => (
            <button
              key={emergency.number}
              onClick={() => handleCall(emergency.number)}
              className="w-full bg-white rounded-2xl p-7 shadow-lg border-4 border-red-300 hover:border-red-500 active:scale-98 transition-all"
            >
              <div className="flex items-center gap-5">
                <div className="text-5xl">{emergency.icon}</div>
                <div className="flex-1 text-left">
                  <h4 className="text-slate-900 mb-2">
                    {settings.language === 'hi' ? emergency.nameHi : emergency.name}
                  </h4>
                  <div className="text-red-600 mb-2">{emergency.number}</div>
                </div>
                <Phone className="w-8 h-8 text-red-600" />
              </div>
            </button>
          ))}
        </div>

        {/* Tips */}
        <div className="bg-blue-50 rounded-2xl p-6 mb-6 border-2 border-blue-200">
          <h3 className="text-blue-900 mb-3">
            {settings.language === 'hi' ? '📌 कॉल करते समय बताएं' : '📌 When calling, tell them'}
          </h3>
          <ul className="space-y-2 text-blue-800 leading-relaxed">
            <li className="flex items-start gap-2">
              <span className="text-blue-600">1.</span>
              <span>{settings.language === 'hi' ? 'आपका स्थान' : 'Your location'}</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600">2.</span>
              <span>{settings.language === 'hi' ? 'क्या हुआ है' : 'What happened'}</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600">3.</span>
              <span>
                {settings.language === 'hi' ? 'मरीज की हालत' : 'Patient condition'}
              </span>
            </li>
          </ul>
        </div>

        {/* Nearest Hospital (if online) */}
        {isOnline && settings.locationPermission && (
          <div className="bg-white rounded-2xl p-6 shadow-md border-2 border-slate-200">
            <div className="flex items-center gap-3 mb-4">
              <MapPin className="w-6 h-6 text-blue-600" />
              <h3 className="text-slate-900">
                {settings.language === 'hi' ? 'नजदीकी अस्पताल' : 'Nearest Hospital'}
              </h3>
            </div>
            <div className="bg-slate-50 rounded-xl p-5">
              <p className="text-slate-900 mb-2">District Hospital</p>
              <p className="text-slate-600 text-sm mb-3">Main Road, City Center</p>
              <div className="flex items-center gap-2 text-blue-600 mb-3">
                <MapPin className="w-4 h-4" />
                <span>2.3 km away</span>
              </div>
              <button className="w-full bg-blue-600 text-white py-4 rounded-xl active:bg-blue-700 transition-colors">
                {settings.language === 'hi' ? 'दिशा-निर्देश प्राप्त करें' : 'Get Directions'}
              </button>
            </div>
          </div>
        )}

        {/* Offline Tips */}
        {!isOnline && (
          <div className="bg-amber-50 rounded-2xl p-6 border-2 border-amber-300">
            <h3 className="text-amber-900 mb-3">
              {settings.language === 'hi' ? '💡 ऑफलाइन में क्या करें' : '💡 What to do offline'}
            </h3>
            <ul className="space-y-2 text-amber-800 leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="text-amber-600">•</span>
                <span>
                  {settings.language === 'hi'
                    ? 'ऊपर दिए गए नंबरों पर कॉल करें'
                    : 'Call the numbers shown above'}
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600">•</span>
                <span>
                  {settings.language === 'hi'
                    ? 'पड़ोसी या परिवार को बुलाएं'
                    : 'Call neighbors or family'}
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600">•</span>
                <span>
                  {settings.language === 'hi'
                    ? 'नजदीकी अस्पताल जाएं'
                    : 'Go to nearest hospital'}
                </span>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
