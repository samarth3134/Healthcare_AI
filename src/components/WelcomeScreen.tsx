import { Heart } from 'lucide-react';

interface WelcomeScreenProps {
  onNext: () => void;
}

export function WelcomeScreen({ onNext }: WelcomeScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-white">
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="bg-blue-50 rounded-full p-8 mb-6 border-4 border-blue-200">
          <Heart className="w-20 h-20 text-blue-600" strokeWidth={2} />
        </div>
        
        <h1 className="text-blue-900 text-center mb-3">
          Swasthya Mitra
        </h1>
        
        <p className="text-slate-700 text-center max-w-xs mb-2 leading-relaxed">
          Your health guide for everyday care
        </p>
        
        <p className="text-slate-600 text-center max-w-xs text-sm mb-4">
          आपका स्वास्थ्य मार्गदर्शक
        </p>
        
        <div className="flex items-center gap-2 text-emerald-700 bg-emerald-50 px-5 py-3 rounded-full mt-4 border-2 border-emerald-200">
          <div className="w-2 h-2 bg-emerald-600 rounded-full"></div>
          <span>Government Verified</span>
        </div>
        
        <div className="mt-4 text-center text-sm text-slate-500 max-w-xs">
          Free health information for all
        </div>
      </div>

      <button
        onClick={onNext}
        className="w-full bg-blue-600 text-white py-5 rounded-xl active:bg-blue-700 transition-colors shadow-md"
      >
        Get Started
      </button>
    </div>
  );
}