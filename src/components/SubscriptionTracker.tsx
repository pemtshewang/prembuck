'use client';

import {
  Cloud,
  Video,
  ShieldCheck,
  MoreHorizontal,
  CreditCard,
  Bell,
  Zap,
  Trash2
} from 'lucide-react';
import { formatCurrency, cn } from '@/lib/utils';
import { useAuraStore } from '@/lib/store';

const subscriptions = [
  { id: '1', name: 'Prime Digital', cost: 14.99, icon: Video, color: '#ef4444', renewal: '3 days', status: 'Urgent Alert' },
  { id: '2', name: 'Cloud Vault Pro', cost: 120.00, icon: Cloud, color: '#10b981', renewal: 'Annual • Oct 12', status: 'Upcoming' },
  { id: '3', name: 'Private Equity Hub', cost: 850.00, icon: Zap, color: '#f59e0b', renewal: 'Quarterly • Nov 02', status: 'Elite Member' },
];

export function SubscriptionTracker() {
  const currency = useAuraStore((state) => state.currency);
  const rates = useAuraStore((state) => state.rates);
  const totalBurn = subscriptions.reduce((acc, s) => acc + s.cost, 0);

  return (
    <section className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-1000">
      <div className="flex justify-between items-end px-2">
        <div className="space-y-1">
          <h3 className="text-xl font-semibold tracking-tight">Active Subscriptions</h3>
          <p className="text-xs text-on-surface-variant font-medium tracking-widest uppercase">Structural Overhead</p>
        </div>
        <div className="text-right">
          <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-1">Monthly Burn</p>
          <p className="text-3xl font-light text-secondary">{formatCurrency(totalBurn, currency, rates)}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {subscriptions.map((sub) => (
          <div
            key={sub.id}
            className="group bg-surface-container border border-white/5 p-6 rounded-3xl hover:bg-surface-container-high transition-standard relative overflow-hidden flex flex-col justify-between h-48 shadow-lg"
          >
            <div className="flex items-start justify-between relative z-10">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-2xl bg-surface-container-highest flex items-center justify-center text-foreground group-hover:scale-110 transition-standard border border-white/5">
                   <sub.icon className="h-6 w-6" style={{ color: sub.color }} />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground group-hover:text-primary transition-standard">{sub.name}</h4>
                  <p className="text-xs text-on-surface-variant font-light">{sub.renewal}</p>
                </div>
              </div>
              <button className="p-2 opacity-0 group-hover:opacity-100 transition-standard hover:text-danger">
                 <Trash2 className="h-4 w-4" />
              </button>
            </div>

            <div className="flex items-end justify-between relative z-10">
               <p className="text-xl font-bold font-mono tracking-tighter">{formatCurrency(sub.cost, currency, rates)}</p>
               <span className={cn(
                 "px-2.5 py-1 rounded-full text-[8px] font-bold uppercase tracking-[0.1em] border",
                 sub.status === 'Urgent Alert' ? "bg-danger/10 text-danger border-danger/20 animate-pulse" : "bg-white/5 text-on-surface-variant border-white/10"
               )}>
                 {sub.status}
               </span>
            </div>

            <div className="absolute top-0 right-0 h-1 w-full bg-gradient-to-r from-transparent via-white/10 to-transparent scale-x-0 group-hover:scale-x-100 transition-standard duration-700" />
          </div>
        ))}
      </div>

      <div className="p-6 bg-surface-container-low border border-white/5 rounded-[2rem] flex items-center gap-6 shadow-inner relative overflow-hidden">
        <div className="h-14 w-14 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary shrink-0 border border-secondary/20">
           <Bell className="h-7 w-7 animate-bounce" />
        </div>
        <div className="flex-1 space-y-1">
          <p className="text-[10px] font-bold text-secondary uppercase tracking-[0.3em]">Strategic Insight</p>
          <p className="text-sm font-light leading-relaxed max-w-xl">
             You have overlapping SaaS subscriptions. Canceling
             <span className="text-foreground font-semibold"> Prime Digital </span>
             could save you <span className="text-primary font-bold"> $191.88 </span> annually toward your
             <span className="text-foreground font-semibold"> Global Savings goal.</span>
          </p>
        </div>
        <button className="px-6 py-3 bg-secondary text-on-secondary rounded-xl text-[10px] font-bold uppercase tracking-widest hover:brightness-110 transition-standard shrink-0 hidden sm:block">
           Audit All
        </button>
      </div>
    </section>
  );
}
