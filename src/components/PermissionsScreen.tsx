import { MapPin, Bell, Check } from 'lucide-react';
import { AppSettings } from '../App';

interface PermissionsScreenProps {
  settings: AppSettings;
  onUpdate: (settings: Partial<AppSettings>) => void;
  onNext: () => void;
}

export function PermissionsScreen({ settings, onUpdate, onNext }: PermissionsScreenProps) {
  const togglePermission = (key: keyof AppSettings) => {
    onUpdate({ [key]: !settings[key] });
  };

  const permissions = [
    {
      key: 'locationPermission' as keyof AppSettings,
      icon: MapPin,
      title: 'Location Access',
      description: 'Find nearby health centers and hospitals',
      benefit: 'Helps you locate nearest medical facilities',
      enabled: settings.locationPermission,
    },
    {
      key: 'notificationPermission' as keyof AppSettings,
      icon: Bell,
      title: 'Notifications',
      description: 'Health alerts and outbreak warnings',
      benefit: 'Stay informed about important health updates',
      enabled: settings.notificationPermission,
    },
  ];

  return (
    <div className="flex flex-col min-h-screen p-6 bg-white">
      <div className="mb-8 mt-4">
        <h2 className="text-slate-900 mb-2">
          Permissions
        </h2>
        <p className="text-slate-600">
          We need a few permissions to help you better
        </p>
      </div>

      <div className="flex-1 space-y-4">
        {permissions.map((permission) => {
          const Icon = permission.icon;
          return (
            <div
              key={permission.key}
              className={`p-5 rounded-xl border-2 transition-all ${
                permission.enabled
                  ? 'border-emerald-500 bg-emerald-50'
                  : 'border-slate-200 bg-white'
              }`}
            >
              <div className="flex items-start gap-4 mb-4">
                <div className={`p-3 rounded-lg ${
                  permission.enabled ? 'bg-emerald-100' : 'bg-slate-100'
                }`}>
                  <Icon className={`w-6 h-6 ${
                    permission.enabled ? 'text-emerald-600' : 'text-slate-600'
                  }`} />
                </div>
                <div className="flex-1">
                  <div className="text-slate-900 mb-1">{permission.title}</div>
                  <div className="text-sm text-slate-600">{permission.description}</div>
                </div>
              </div>
              
              <div className="flex items-start gap-2 mb-4 bg-white p-3 rounded-lg">
                <Check className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-slate-700">{permission.benefit}</p>
              </div>

              <button
                onClick={() => togglePermission(permission.key)}
                className={`w-full py-3 rounded-lg transition-colors ${
                  permission.enabled
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-200 text-slate-700'
                }`}
              >
                {permission.enabled ? 'Granted' : 'Grant Permission'}
              </button>
            </div>
          );
        })}
      </div>

      <div className="mt-6">
        <p className="text-sm text-slate-500 text-center mb-4">
          You can change these permissions anytime in settings
        </p>
        <button
          onClick={onNext}
          className="w-full bg-blue-600 text-white py-4 rounded-xl active:bg-blue-700 transition-colors shadow-md"
        >
          Continue to App
        </button>
      </div>
    </div>
  );
}
