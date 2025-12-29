import { useState } from 'react';
import { ArrowLeft, Baby, User, Users, MapPin, Phone, Info } from 'lucide-react';
import { Screen, AppSettings } from '../App';

interface VaccinationFlowProps {
  navigateTo: (screen: Screen) => void;
  settings: AppSettings;
}

type AgeGroup = 'child' | 'adult' | 'elderly' | null;

const educationalContent = {
  child: {
    en: {
      title: 'Why Vaccination is Important for Children',
      intro:
        'Vaccines help protect children from serious diseases. They are safe, free, and recommended by public health authorities.',
      benefits: [
        'Helps protect from many serious diseases',
        'Supports healthy immune system development',
        'Reduces spread of illness in the community',
        'Available FREE at government health centers',
      ],
      vaccines: [
        {
          name: 'BCG',
          age: 'At birth',
          why: 'Helps protect against tuberculosis (TB)',
        },
        {
          name: 'Polio drops',
          age: 'Birth, 6, 10, 14 weeks',
          why: 'Helps prevent polio, which can cause paralysis',
        },
        {
          name: 'DPT',
          age: '6, 10, 14 weeks',
          why: 'Protects against diphtheria, pertussis, and tetanus',
        },
        {
          name: 'Hepatitis B',
          age: 'Birth, 6, 10, 14 weeks',
          why: 'Helps protect the liver from infection',
        },
        {
          name: 'MMR',
          age: '9-12 months',
          why: 'Helps protect against measles, mumps, and rubella',
        },
      ],
    },
    hi: {
      title: 'बच्चों के लिए टीकाकरण क्यों जरूरी है',
      intro:
        'टीके बच्चों को गंभीर बीमारियों से बचाने में मदद करते हैं। ये सुरक्षित हैं और सरकारी स्वास्थ्य कार्यक्रमों द्वारा सुझाए जाते हैं।',
      benefits: [
        'कई गंभीर बीमारियों से सुरक्षा',
        'शरीर की रोग-प्रतिरोधक क्षमता को मजबूत करता है',
        'समुदाय में बीमारी फैलने से रोकता है',
        'सरकारी स्वास्थ्य केंद्रों पर मुफ्त उपलब्ध',
      ],
      vaccines: [
        {
          name: 'बीसीजी',
          age: 'जन्म के समय',
          why: 'टीबी (तपेदिक) से बचाव में मदद करता है',
        },
        {
          name: 'पोलियो की बूंदें',
          age: 'जन्म, 6, 10, 14 सप्ताह',
          why: 'पोलियो से बचाव में मदद करता है',
        },
        {
          name: 'डीपीटी',
          age: '6, 10, 14 सप्ताह',
          why: 'डिप्थीरिया, काली खांसी और टिटनेस से बचाव',
        },
        {
          name: 'हेपेटाइटिस बी',
          age: 'जन्म, 6, 10, 14 सप्ताह',
          why: 'लिवर को संक्रमण से बचाने में मदद करता है',
        },
        {
          name: 'एमएमआर',
          age: '9-12 महीने',
          why: 'खसरा, गलसुआ और रुबेला से बचाव',
        },
      ],
    },
  },
  adult: {
    en: {
      title: 'Vaccines for Adults',
      intro:
        'Some vaccines are recommended for adults to maintain protection and reduce health risks.',
      vaccines: [
        {
          name: 'Tetanus (TT)',
          age: 'Every 10 years',
          why: 'Helps protect against infections from wounds',
        },
        {
          name: 'Hepatitis B',
          age: 'If not taken earlier',
          why: 'Helps protect the liver from infection',
        },
      ],
    },
    hi: {
      title: 'वयस्कों के लिए टीके',
      intro:
        'कुछ टीके वयस्कों के लिए भी सुझाए जाते हैं ताकि स्वास्थ्य सुरक्षा बनी रहे।',
      vaccines: [
        {
          name: 'टिटनेस (TT)',
          age: 'हर 10 साल',
          why: 'घाव से होने वाले संक्रमण से बचाव',
        },
        {
          name: 'हेपेटाइटिस बी',
          age: 'अगर पहले नहीं लिया',
          why: 'लिवर को संक्रमण से बचाव',
        },
      ],
    },
  },
  elderly: {
    en: {
      title: 'Vaccines for Senior Citizens (60+ years)',
      intro:
        'Older adults may need additional vaccines as immunity can reduce with age.',
      vaccines: [
        {
          name: 'Flu vaccine',
          age: 'Every year',
          why: 'Helps reduce risk of seasonal flu',
        },
        {
          name: 'Pneumonia vaccine',
          age: 'Once after 60',
          why: 'Helps protect lungs from serious infection',
        },
      ],
    },
    hi: {
      title: 'बुजुर्गों के लिए टीके (60+ वर्ष)',
      intro:
        'उम्र बढ़ने के साथ शरीर की प्रतिरोधक क्षमता कम हो सकती है, इसलिए कुछ टीके जरूरी हो सकते हैं।',
      vaccines: [
        {
          name: 'फ्लू का टीका',
          age: 'हर साल',
          why: 'मौसमी फ्लू से बचाव',
        },
        {
          name: 'निमोनिया का टीका',
          age: '60 के बाद एक बार',
          why: 'फेफड़ों को गंभीर संक्रमण से बचाव',
        },
      ],
    },
  },
};

const centers = [
  {
    name: 'Primary Health Center',
    nameHi: 'प्राथमिक स्वास्थ्य केंद्र',
    address: 'Main Road, near Bus Stand',
    addressHi: 'मुख्य मार्ग, बस स्टैंड के पास',
    phone: '0123-456789',
  },
  {
    name: 'Community Health Center',
    nameHi: 'सामुदायिक स्वास्थ्य केंद्र',
    address: 'Near District Hospital',
    addressHi: 'जिला अस्पताल के पास',
    phone: '0123-456790',
  },
];

export function VaccinationFlow({ navigateTo, settings }: VaccinationFlowProps) {
  const [step, setStep] = useState<'select' | 'learn' | 'centers'>('select');
  const [selectedGroup, setSelectedGroup] = useState<AgeGroup>(null);

  const content =
    selectedGroup &&
    educationalContent[selectedGroup][settings.language as 'en' | 'hi'];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-emerald-600 text-white p-6 pb-8 sticky top-0 z-10">
        <button
          onClick={() => {
            if (step === 'select') navigateTo('home');
            else setStep(step === 'centers' ? 'learn' : 'select');
          }}
          className="mb-4"
        >
          <ArrowLeft />
        </button>
        <h1>
          {settings.language === 'hi'
            ? 'टीकाकरण जानकारी'
            : 'Vaccination Information'}
        </h1>
        <p className="text-emerald-100">
          {settings.language === 'hi'
            ? 'जन स्वास्थ्य मार्गदर्शन'
            : 'Public health guidance'}
        </p>
      </div>

      {/* STEP 1 */}
      {step === 'select' && (
        <div className="p-6 space-y-4">
          <button
            onClick={() => {
              setSelectedGroup('child');
              setStep('learn');
            }}
            className="w-full bg-white p-6 rounded-xl shadow"
          >
            <Baby /> {settings.language === 'hi' ? 'बच्चे' : 'Children'}
          </button>

          <button
            onClick={() => {
              setSelectedGroup('adult');
              setStep('learn');
            }}
            className="w-full bg-white p-6 rounded-xl shadow"
          >
            <User /> {settings.language === 'hi' ? 'वयस्क' : 'Adults'}
          </button>

          <button
            onClick={() => {
              setSelectedGroup('elderly');
              setStep('learn');
            }}
            className="w-full bg-white p-6 rounded-xl shadow"
          >
            <Users /> {settings.language === 'hi' ? 'बुजुर्ग' : 'Elderly'}
          </button>
        </div>
      )}

      {/* STEP 2 */}
      {step === 'learn' && content && (
        <div className="p-6 space-y-4">
          <h2 className="text-xl font-semibold">{content.title}</h2>
          <p>{content.intro}</p>

          {content.benefits && (
            <ul className="list-disc pl-6">
              {content.benefits.map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>
          )}

          {content.vaccines.map((v, i) => (
            <div key={i} className="bg-white p-4 rounded-xl shadow">
              <h3>{v.name}</h3>
              <p className="text-sm">{v.why}</p>
              <p className="text-xs text-slate-500">{v.age}</p>
            </div>
          ))}

          <button
            onClick={() => setStep('centers')}
            className="w-full bg-emerald-600 text-white p-4 rounded-xl"
          >
            <MapPin />{' '}
            {settings.language === 'hi'
              ? 'नजदीकी केंद्र देखें'
              : 'Find Centers'}
          </button>
        </div>
      )}

      {/* STEP 3 */}
      {step === 'centers' && (
        <div className="p-6 space-y-4">
          {centers.map((c, i) => (
            <div key={i} className="bg-white p-4 rounded-xl shadow">
              <h3>{settings.language === 'hi' ? c.nameHi : c.name}</h3>
              <p className="text-sm">
                {settings.language === 'hi' ? c.addressHi : c.address}
              </p>
              <button
                onClick={() => (window.location.href = `tel:${c.phone}`)}
                className="text-blue-600 mt-2"
              >
                <Phone /> {settings.language === 'hi' ? 'कॉल करें' : 'Call'}
              </button>
            </div>
          ))}

          <button
            onClick={() => navigateTo('home')}
            className="w-full bg-slate-200 p-4 rounded-xl"
          >
            {settings.language === 'hi'
              ? 'होम पर जाएं'
              : 'Back to Home'}
          </button>
        </div>
      )}
    </div>
  );
}
