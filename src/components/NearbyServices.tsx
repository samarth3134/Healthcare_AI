import { ArrowLeft, MapPin, Phone, Clock, Building2, Ambulance } from 'lucide-react';
import { Screen, AppSettings } from '../App';

interface NearbyServicesProps {
  navigateTo: (screen: Screen) => void;
  settings: AppSettings;
}

const facilities = [
  {
    type: 'hospital',
    name: 'District Hospital',
    nameHi: 'जिला अस्पताल',
    address: 'Main Road, City Center',
    addressHi: 'मुख्य मार्ग, सिटी सेंटर',
    distance: '2.3 km',
    phone: '0123-456789',
    hours: '24/7 Emergency',
    hoursHi: '24/7 आपातकाल',
    services: ['Emergency', 'OPD', 'Laboratory'],
    servicesHi: ['आपातकाल', 'ओपीडी', 'प्रयोगशाला'],
  },
  {
    type: 'phc',
    name: 'Primary Health Center',
    nameHi: 'प्राथमिक स्वास्थ्य केंद्र',
    address: 'Sector 5, Near Market',
    addressHi: 'सेक्टर 5, मार्केट के पास',
    distance: '1.2 km',
    phone: '0123-456790',
    hours: 'Mon-Sat, 9 AM - 5 PM',
    hoursHi: 'सोम-शनि, सुबह 9 - शाम 5',
    services: ['OPD', 'Vaccination', 'Maternity'],
    servicesHi: ['ओपीडी', 'टीकाकरण', 'प्रसूति'],
  },
  {
    type: 'clinic',
    name: 'Community Health Center',
    nameHi: 'सामुदायिक स्वास्थ्य केंद्र',
    address: 'Near Bus Stand',
    addressHi: 'बस स्टैंड के पास',
    distance: '3.5 km',
    phone: '0123-456791',
    hours: 'Mon-Sat, 8 AM - 6 PM',
    hoursHi: 'सोम-शनि, सुबह 8 - शाम 6',
    services: ['OPD', 'Laboratory', 'X-Ray'],
    servicesHi: ['ओपीडी', 'प्रयोगशाला', 'एक्स-रे'],
  },
  {
    type: 'pharmacy',
    name: 'Jan Aushadhi Kendra',
    nameHi: 'जन औषधि केंद्र',
    address: 'Station Road',
    addressHi: 'स्टेशन रोड',
    distance: '0.8 km',
    phone: '0123-456792',
    hours: 'Daily, 8 AM - 10 PM',
    hoursHi: 'रोज़, सुबह 8 - रात 10',
    services: ['Medicines', 'First Aid'],
    servicesHi: ['दवाएं', 'प्राथमिक चिकित्सा'],
  },
];

export function NearbyServices({ navigateTo, settings }: NearbyServicesProps) {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'hospital':
        return Building2;
      case 'phc':
      case 'clinic':
        return Building2;
      case 'pharmacy':
        return Building2;
      default:
        return Building2;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'hospital':
        return 'bg-red-100 text-red-600';
      case 'phc':
        return 'bg-blue-100 text-blue-600';
      case 'clinic':
        return 'bg-emerald-100 text-emerald-600';
      case 'pharmacy':
        return 'bg-purple-100 text-purple-600';
      default:
        return 'bg-slate-100 text-slate-600';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-blue-600 text-white p-6 pb-8 sticky top-0 z-10 shadow-md">
        <button
          onClick={() => navigateTo('home')}
          className="mb-4 p-2 hover:bg-blue-700 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-7 h-7" />
        </button>
        <h1 className="text-white mb-2">
          {settings.language === 'hi' ? 'नजदीकी सेवाएं' : 'Nearby Services'}
        </h1>
        <p className="text-blue-100">
          {settings.language === 'hi' ? 'स्वास्थ्य केंद्र खोजें' : 'Find health centers'}
        </p>
      </div>

      <div className="p-6">
        {/* Location Banner */}
        {settings.locationPermission ? (
          <div className="mb-6 p-4 bg-emerald-50 rounded-xl border border-emerald-200">
            <div className="flex items-center gap-2 text-emerald-900">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">
                {settings.language === 'hi'
                  ? 'आपके वर्तमान स्थान से दूरी दिखा रहे हैं'
                  : 'Showing distance from your current location'}
              </span>
            </div>
          </div>
        ) : (
          <div className="mb-6 p-4 bg-amber-50 rounded-xl border border-amber-200">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-amber-600 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm text-amber-900 mb-2">
                  {settings.language === 'hi'
                    ? 'सटीक दूरी के लिए स्थान की अनुमति दें'
                    : 'Enable location for accurate distance'}
                </p>
                <button className="text-sm text-amber-700 underline">
                  {settings.language === 'hi' ? 'स्थान सक्षम करें' : 'Enable Location'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="mb-6 grid grid-cols-2 gap-3">
          <button
            onClick={() => navigateTo('emergency')}
            className="p-4 bg-red-50 border-2 border-red-200 rounded-xl active:scale-95 transition-all"
          >
            <div className="flex flex-col items-center gap-2">
              <Ambulance className="w-8 h-8 text-red-600" />
              <span className="text-slate-900">
                {settings.language === 'hi' ? 'आपातकाल' : 'Emergency'}
              </span>
            </div>
          </button>
          <button
            onClick={() => navigateTo('vaccination')}
            className="p-4 bg-emerald-50 border-2 border-emerald-200 rounded-xl active:scale-95 transition-all"
          >
            <div className="flex flex-col items-center gap-2">
              <Building2 className="w-8 h-8 text-emerald-600" />
              <span className="text-slate-900">
                {settings.language === 'hi' ? 'टीकाकरण' : 'Vaccination'}
              </span>
            </div>
          </button>
        </div>

        {/* Facilities List */}
        <div className="mb-4">
          <h3 className="text-slate-900 mb-3">
            {settings.language === 'hi' ? 'सभी सुविधाएं' : 'All Facilities'}
          </h3>
        </div>

        <div className="space-y-4">
          {facilities.map((facility, index) => {
            const Icon = getTypeIcon(facility.type);
            const colorClass = getTypeColor(facility.type);
            
            return (
              <div
                key={index}
                className="bg-white border-2 border-slate-200 rounded-2xl p-5"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className={`p-3 rounded-xl border-2 ${colorClass}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-slate-900 mb-1">
                      {settings.language === 'hi' ? facility.nameHi : facility.name}
                    </h3>
                    <p className="text-sm text-slate-600 mb-2">
                      {settings.language === 'hi' ? facility.addressHi : facility.address}
                    </p>
                    <div className="flex items-center gap-3 text-sm text-slate-500">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span>{facility.distance}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{settings.language === 'hi' ? facility.hoursHi : facility.hours}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-50 rounded-xl p-4 mb-4">
                  <p className="text-xs text-slate-500 mb-2">
                    {settings.language === 'hi' ? 'सेवाएं' : 'Services'}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {(settings.language === 'hi' ? facility.servicesHi : facility.services).map((service, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-white text-slate-700 rounded-full text-sm border border-slate-200"
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3">
                  <button className="flex-1 bg-blue-600 text-white py-3 rounded-xl active:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                    <MapPin className="w-4 h-4" />
                    {settings.language === 'hi' ? 'दिशा-निर्देश' : 'Directions'}
                  </button>
                  <button
                    onClick={() => window.location.href = `tel:${facility.phone}`}
                    className="flex-1 bg-emerald-600 text-white py-3 rounded-xl active:bg-emerald-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <Phone className="w-4 h-4" />
                    {settings.language === 'hi' ? 'कॉल करें' : 'Call'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Disclaimer */}
        <div className="mt-6 bg-slate-50 rounded-xl p-4">
          <p className="text-sm text-slate-600">
            {settings.language === 'hi'
              ? '💡 सुझाव: जाने से पहले सुविधा में उपलब्धता की पुष्टि करने के लिए कॉल करें।'
              : '💡 Tip: Call ahead to confirm availability at the facility before visiting.'}
          </p>
        </div>
      </div>
    </div>
  );
}