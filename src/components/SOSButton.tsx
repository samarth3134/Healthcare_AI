import { Phone } from 'lucide-react';

interface SOSButtonProps {
  onClick: () => void;
}

export function SOSButton({ onClick }: SOSButtonProps) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 bg-red-600 text-white p-5 rounded-full shadow-2xl active:scale-95 transition-transform z-50 animate-pulse"
      aria-label="Emergency SOS"
    >
      <Phone className="w-7 h-7" strokeWidth={2.5} />
    </button>
  );
}
