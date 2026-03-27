'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Wallet,
  Receipt,
  BarChart3,
  Settings,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuraStore } from '@/lib/store';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/' },
  { icon: Wallet, label: 'Portfolio', href: '/portfolio' },
  { icon: Receipt, label: 'Transactions', href: '/transactions' },
  { icon: BarChart3, label: 'Analysis', href: '/analysis' },
  { icon: Settings, label: 'Settings', href: '/settings' },
];

export function Sidebar() {
  const pathname = usePathname();
  const privacyMode = useAuraStore((state) => state.privacyMode);
  const togglePrivacyMode = useAuraStore((state) => state.togglePrivacyMode);

  return (
    <aside className="fixed left-0 top-0 hidden h-screen w-64 flex-col border-r border-white/5 bg-background shadow-2xl md:flex">
      <div className="p-8">
        <h1 className="text-xl font-semibold tracking-tighter text-foreground">AuraFinance</h1>
        <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-primary">Sovereign Ledger</p>
      </div>

      <nav className="mt-4 flex-1 space-y-2 px-4">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-4 px-4 py-3 transition-standard hover:bg-surface-container rounded-lg group",
                isActive ? "text-primary font-semibold border-r-2 border-primary bg-gradient-to-r from-primary/10 to-transparent" : "text-foreground/50 hover:text-foreground"
              )}
            >
              <item.icon className="h-5 w-5" />
              <span className="text-sm">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-6 mt-auto">
        <button
          onClick={togglePrivacyMode}
          className={cn(
            "flex w-full items-center justify-between p-3 rounded-xl border border-white/5 bg-surface-container hover:bg-surface-container-high transition-standard group",
            privacyMode && "border-primary/30"
          )}
        >
          <div className="flex items-center gap-3">
            <ShieldCheck className={cn("h-4 w-4", privacyMode ? "text-primary" : "text-foreground/40")} />
            <span className="text-xs font-semibold text-foreground/70">Privacy Mode</span>
          </div>
          <div className={cn(
            "h-4 w-8 rounded-full transition-standard flex items-center px-1",
            privacyMode ? "bg-primary" : "bg-foreground/20"
          )}>
            <div className={cn(
              "h-2 w-2 rounded-full bg-white transition-standard",
              privacyMode ? "translate-x-4" : "translate-x-0"
            )} />
          </div>
        </button>

        <div className="mt-6 flex items-center gap-3 px-2">
          <div className="h-10 w-10 overflow-hidden rounded-full bg-surface-container-highest border border-white/10">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop"
              alt="Profile"
              className="h-full w-full object-cover grayscale"
            />
          </div>
          <div>
            <p className="text-xs font-semibold">Alex Mercer</p>
            <p className="text-[10px] text-foreground/40 uppercase tracking-wider">Elite Tier</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
