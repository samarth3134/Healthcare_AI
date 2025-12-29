import { useState, useRef, useEffect } from 'react';
import { Send, Mic, ArrowLeft } from 'lucide-react';
import { Screen, AppSettings } from '../App';

interface Message {
  id: string;
  type: 'user' | 'bot';
  text: string;
  timestamp: Date;
  quickReplies?: QuickReply[];
}

interface QuickReply {
  id: string;
  text: string;
  textHi?: string;
  action?: string;
}

interface ChatInterfaceProps {
  navigateTo: (screen: Screen) => void;
  settings: AppSettings;
  initialTopic?: string;
}

const translations = {
  en: {
    typePlaceholder: 'Type your question...',
    greeting: 'Hello! I am your health guide. How can I help you today?',
    disclaimer:
      'This tool provides health guidance and awareness only. It does not diagnose or treat diseases.',
  },
  hi: {
    typePlaceholder: 'अपना सवाल लिखें...',
    greeting:
      'नमस्ते! मैं आपका स्वास्थ्य मार्गदर्शक हूं। आज मैं आपकी कैसे मदद कर सकता हूं?',
    disclaimer:
      'यह उपकरण केवल स्वास्थ्य जानकारी और मार्गदर्शन प्रदान करता है। यह रोगों का निदान या इलाज नहीं करता।',
  },
};

const quickRepliesData = {
  main: [
    { id: 'dengue', text: 'Prevent dengue', textHi: 'डेंगू से बचाव', action: 'dengue' },
    { id: 'vaccination', text: 'Vaccination for child', textHi: 'बच्चे के लिए टीकाकरण', action: 'vaccination' },
    { id: 'fever', text: 'Fever and cough', textHi: 'बुखार और खांसी', action: 'fever' },
    { id: 'emergency', text: 'Emergency help', textHi: 'आपातकालीन सहायता', action: 'emergency' },
  ],
  dengue: [
    { id: 'dengue_symptoms', text: 'What are symptoms?', textHi: 'लक्षण क्या हैं?', action: 'dengue_symptoms' },
    { id: 'dengue_prevent', text: 'How to prevent?', textHi: 'कैसे बचें?', action: 'dengue_prevent' },
    { id: 'main_menu', text: 'Main menu', textHi: 'मुख्य मेनू', action: 'main' },
  ],
  vaccination: [
    { id: 'child_age', text: '0-2 years', textHi: '0-2 साल', action: 'vac_infant' },
    { id: 'child_age2', text: '2-10 years', textHi: '2-10 साल', action: 'vac_child' },
    { id: 'adult', text: 'For adults', textHi: 'वयस्कों के लिए', action: 'vac_adult' },
    { id: 'main_menu', text: 'Main menu', textHi: 'मुख्य मेनू', action: 'main' },
  ],
  fever: [
    { id: 'fever_mild', text: 'Mild (1-2 days)', textHi: 'हल्का (1-2 दिन)', action: 'fever_mild' },
    { id: 'fever_moderate', text: 'Moderate (3-5 days)', textHi: 'मध्यम (3-5 दिन)', action: 'fever_moderate' },
    { id: 'fever_severe', text: 'Severe symptoms', textHi: 'गंभीर लक्षण', action: 'fever_severe' },
    { id: 'main_menu', text: 'Main menu', textHi: 'मुख्य मेनू', action: 'main' },
  ],
};

const botResponses: Record<string, { en: string; hi: string; replies?: string }> = {
  main: {
    en: 'Hello! I am your health guide. How can I help you today?',
    hi: 'नमस्ते! मैं आपका स्वास्थ्य मार्गदर्शक हूं। आज मैं आपकी कैसे मदद कर सकता हूं?',
    replies: 'main',
  },
  dengue: {
    en:
      'Dengue spreads through mosquito bites and can cause fever and body pain.\n\nPrevention tips:\n• Remove standing water\n• Use mosquito nets\n• Wear full-sleeve clothes\n• Keep surroundings clean',
    hi:
      'डेंगू मच्छरों के काटने से फैलता है और बुखार व शरीर दर्द हो सकता है।\n\nबचाव के तरीके:\n• जमा पानी हटाएं\n• मच्छरदानी का उपयोग करें\n• पूरी बाजू के कपड़े पहनें\n• आसपास सफाई रखें',
    replies: 'dengue',
  },
  dengue_symptoms: {
    en:
      'Common dengue symptoms include:\n• High fever\n• Headache\n• Body and joint pain\n• Nausea\n\nIf you notice these symptoms, please consult a nearby health worker or doctor for guidance.',
    hi:
      'डेंगू के सामान्य लक्षण:\n• तेज बुखार\n• सिरदर्द\n• शरीर और जोड़ों में दर्द\n• उलटी\n\nअगर ये लक्षण दिखें तो नजदीकी स्वास्थ्य कार्यकर्ता या डॉक्टर से सलाह लें।',
    replies: 'dengue',
  },
  dengue_prevent: {
    en:
      'To reduce dengue risk:\n\n1. Remove stagnant water\n2. Use mosquito repellent\n3. Sleep under nets\n4. Wear long clothes\n5. Keep doors and windows protected',
    hi:
      'डेंगू से बचने के लिए:\n\n1. जमा पानी हटाएं\n2. मच्छर भगाने वाली क्रीम लगाएं\n3. मच्छरदानी में सोएं\n4. लंबे कपड़े पहनें\n5. दरवाजे-खिड़कियां सुरक्षित रखें',
    replies: 'dengue',
  },
  vaccination: {
    en:
      'Vaccination helps protect against serious diseases. All routine vaccines are available free at government health centers.\n\nWhich age group would you like to know about?',
    hi:
      'टीकाकरण गंभीर बीमारियों से बचाने में मदद करता है। सभी नियमित टीके सरकारी स्वास्थ्य केंद्रों पर मुफ्त उपलब्ध हैं।\n\nआप किस उम्र के बारे में जानना चाहते हैं?',
    replies: 'vaccination',
  },
  vac_infant: {
    en:
      'Vaccines for babies (0-2 years) include BCG, Polio, DPT, Hepatitis B, and MMR.\n\nThese vaccines help protect against serious infections. Visit your nearest health center for guidance.',
    hi:
      'शिशुओं (0-2 वर्ष) के लिए टीकों में बीसीजी, पोलियो, डीपीटी, हेपेटाइटिस बी और एमएमआर शामिल हैं।\n\nये टीके गंभीर संक्रमण से बचाते हैं। नजदीकी स्वास्थ्य केंद्र से जानकारी लें।',
    replies: 'vaccination',
  },
  vac_child: {
    en:
      'Children aged 2-10 years may need booster vaccines like DPT, Polio, MMR, and Typhoid.\n\nHealth workers can guide you on the correct schedule.',
    hi:
      '2-10 वर्ष के बच्चों को डीपीटी, पोलियो, एमएमआर और टाइफाइड जैसे बूस्टर टीकों की जरूरत हो सकती है।\n\nस्वास्थ्य कार्यकर्ता सही समय की जानकारी दे सकते हैं।',
    replies: 'vaccination',
  },
  vac_adult: {
    en:
      'Adults may need vaccines like Tetanus, Hepatitis B, and Flu depending on age and health.\n\nConsult a health worker for advice.',
    hi:
      'वयस्कों को उम्र और स्वास्थ्य के अनुसार टिटनेस, हेपेटाइटिस बी और फ्लू जैसे टीकों की जरूरत हो सकती है।\n\nसलाह के लिए स्वास्थ्य कार्यकर्ता से संपर्क करें।',
    replies: 'vaccination',
  },
  fever: {
    en:
      'I can help you understand what to do for fever and cough.\n\nHow long have you had these symptoms?',
    hi:
      'मैं बुखार और खांसी के बारे में जानकारी देने में मदद कर सकता हूं।\n\nआपको ये लक्षण कितने समय से हैं?',
    replies: 'fever',
  },
  fever_mild: {
    en:
      'For mild fever:\n\n• Rest at home\n• Drink fluids\n• Monitor temperature\n\nIf symptoms continue, consult a health worker.',
    hi:
      'हल्के बुखार के लिए:\n\n• घर पर आराम करें\n• तरल पदार्थ लें\n• तापमान पर नजर रखें\n\nलक्षण बने रहें तो स्वास्थ्य कार्यकर्ता से सलाह लें।',
    replies: 'fever',
  },
  fever_moderate: {
    en:
      'If fever lasts 3-5 days:\n\n• Visit a health worker\n• Follow medical advice\n\nProlonged fever should not be ignored.',
    hi:
      'अगर बुखार 3-5 दिन तक रहे:\n\n• स्वास्थ्य कार्यकर्ता से मिलें\n• दी गई सलाह का पालन करें\n\nलंबे समय के बुखार को नजरअंदाज न करें।',
    replies: 'fever',
  },
  fever_severe: {
    en:
      'Warning signs that need immediate medical attention:\n\n• Very high fever\n• Difficulty breathing\n• Chest pain\n• Severe weakness',
    hi:
      'ऐसे संकेत जिनमें तुरंत चिकित्सा सहायता की आवश्यकता होती है:\n\n• बहुत तेज बुखार\n• सांस लेने में कठिनाई\n• सीने में दर्द\n• अत्यधिक कमजोरी',
    replies: 'fever',
  },
  emergency: {
    en:
      'For emergencies, call:\n\n• Ambulance: 108\n• Emergency: 112\n• Health Helpline: 104\n\nStay calm and share your location clearly.',
    hi:
      'आपात स्थिति में कॉल करें:\n\n• एम्बुलेंस: 108\n• आपातकाल: 112\n• स्वास्थ्य हेल्पलाइन: 104\n\nशांत रहें और अपना स्थान स्पष्ट बताएं।',
    replies: 'main',
  },
};

export function ChatInterface({ navigateTo, settings, initialTopic }: ChatInterfaceProps) {
  const t = translations[settings.language as keyof typeof translations] || translations.en;
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      text: t.greeting,
      timestamp: new Date(),
      quickReplies: quickRepliesData.main,
    },
  ]);
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleQuickReply = (reply: QuickReply) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      text: settings.language === 'hi' && reply.textHi ? reply.textHi : reply.text,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMessage]);

    if (reply.action === 'emergency') {
      navigateTo('emergency');
      return;
    }

    setTimeout(() => {
      const response = botResponses[reply.action || 'main'];
      setMessages(prev => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          type: 'bot',
          text: settings.language === 'hi' ? response.hi : response.en,
          timestamp: new Date(),
          quickReplies: response.replies
            ? quickRepliesData[response.replies as keyof typeof quickRepliesData]
            : undefined,
        },
      ]);
    }, 400);
  };

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    setMessages(prev => [
      ...prev,
      {
        id: Date.now().toString(),
        type: 'user',
        text: inputText,
        timestamp: new Date(),
      },
    ]);
    setInputText('');

    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          type: 'bot',
          text:
            settings.language === 'hi'
              ? 'कृपया नीचे दिए गए विकल्पों में से चुनें ताकि मैं सही जानकारी दे सकूं।'
              : 'Please choose one of the options below so I can give you accurate health information.',
          timestamp: new Date(),
          quickReplies: quickRepliesData.main,
        },
      ]);
    }, 400);
  };

  return (
    <div className="flex flex-col h-screen bg-slate-100">
      <div className="bg-blue-700 text-white p-4 flex items-center gap-3">
        <button onClick={() => navigateTo('home')}>
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div className="flex-1">
          <h2>Swasthya Mitra</h2>
          <p className="text-xs text-blue-200">
            {settings.language === 'hi' ? 'स्वास्थ्य सहायक' : 'Health Assistant'}
          </p>
        </div>
        <div className="bg-emerald-500 px-2 py-1 rounded text-xs">
          {settings.language === 'hi' ? 'सरकारी' : 'Govt'}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-24">
        {messages.map(message => (
          <div key={message.id}>
            <div className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-[80%] rounded-2xl px-5 py-3 ${
                  message.type === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white border-2 border-slate-200'
                }`}
              >
                <p className="whitespace-pre-line">{message.text}</p>
              </div>
            </div>

            {message.quickReplies && message.type === 'bot' && (
              <div className="flex flex-wrap gap-2 mt-3">
                {message.quickReplies.map(reply => (
                  <button
                    key={reply.id}
                    onClick={() => handleQuickReply(reply)}
                    className="px-4 py-2 bg-white border-2 border-blue-500 text-blue-700 rounded-full"
                  >
                    {settings.language === 'hi' && reply.textHi ? reply.textHi : reply.text}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="bg-amber-50 border-t-2 border-amber-200 px-4 py-2">
        <p className="text-xs text-amber-900 text-center">{t.disclaimer}</p>
      </div>

      <div className="bg-white border-t-2 border-slate-200 p-3 fixed bottom-0 left-0 right-0">
        <div className="max-w-md mx-auto flex items-center gap-2">
          <button
            disabled
            title="Voice support coming soon"
            className="p-3 bg-slate-100 rounded-full opacity-50 cursor-not-allowed"
          >
            <Mic className="w-6 h-6 text-slate-600" />
          </button>
          <input
            value={inputText}
            onChange={e => setInputText(e.target.value)}
            onKeyPress={e => e.key === 'Enter' && handleSendMessage()}
            placeholder={t.typePlaceholder}
            className="flex-1 px-5 py-3 bg-slate-100 rounded-full border-2 border-slate-200"
          />
          <button onClick={handleSendMessage} className="p-3 bg-blue-600 text-white rounded-full">
            <Send className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
}
