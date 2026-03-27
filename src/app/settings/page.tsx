'use client';

import { Shield, User, Bell, Globe, Lock, CreditCard } from 'lucide-react';

export default function SettingsPage() {
  const sections = [
    { icon: User, label: 'Profile Settings', desc: 'Manage your personal identity and public data.' },
    { icon: Shield, label: 'Security & Privacy', desc: 'Biometric locks, 2FA, and encryption keys.' },
    { icon: Bell, label: 'Notifications', desc: 'Configure alerts for spending limits and goals.' },
    { icon: Globe, label: 'Localization', desc: 'Base currency, timezones, and regional formats.' },
    { icon: CreditCard, label: 'Subscription Plan', desc: 'Manage your Aura Elite or Royal membership.' },
    { icon: Lock, label: 'Data Sovereignty', desc: 'Export or delete your entire financial history.' },
  ];

  return (
    <div className="space-y-12 max-w-4xl mx-auto">
      <header className="space-y-4 animate-in fade-in duration-700">
        <h1 className="text-4xl font-light tracking-tighter">System Settings</h1>
        <p className="text-on-surface-variant text-lg font-light">
          Configure your sovereign wealth management environment.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-4">
        {sections.map((section) => (
          <button
            key={section.label}
            className="flex items-center gap-6 p-8 bg-surface-container border border-white/5 rounded-3xl hover:bg-surface-container-high transition-standard text-left group"
          >
            <div className="h-12 w-12 rounded-2xl bg-background flex items-center justify-center text-primary group-hover:scale-110 transition-standard">
               <section.icon className="h-6 w-6" />
            </div>
            <div className="flex-1 space-y-1">
              <h3 className="text-lg font-semibold">{section.label}</h3>
              <p className="text-sm text-on-surface-variant font-light">{section.desc}</p>
            </div>
          </button>
        ))}
      </div>

      <div className="pt-12 border-t border-white/5 flex justify-center text-on-surface-variant/20">
         <p className="text-[10px] font-bold uppercase tracking-[0.8em]">AuraFinance Version 1.0.4 - Build 992</p>
      </div>
    </div>
  );
}
