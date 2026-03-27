'use client';

import { useState } from 'react';
import {
  Calculator,
  TrendingDown,
  Calendar,
  ArrowRight,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { calculateDebtPayoff, formatCurrency, cn } from '@/lib/utils';
import { useAuraStore } from '@/lib/store';

export function DebtSnowballCalculator() {
  const currency = useAuraStore((state) => state.currency);
  const rates = useAuraStore((state) => state.rates);
  const [principal, setPrincipal] = useState(42500);
  const [interest, setInterest] = useState(4.5);
  const [minPayment, setMinPayment] = useState(850);
  const [snowball, setSnowball] = useState(500);

  const { months, totalInterest } = calculateDebtPayoff(principal, interest, minPayment, snowball);

  const payoffDate = new Date();
  payoffDate.setMonth(payoffDate.getMonth() + months);

  return (
    <section className="bg-surface rounded-[2.5rem] p-10 border border-white/5 shadow-2xl overflow-hidden relative">
      <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-8">
        <div className="flex items-center gap-4 self-start">
          <div className="h-12 w-12 bg-secondary/10 flex items-center justify-center rounded-2xl text-secondary">
            <Zap className="h-6 w-6 fill-secondary" />
          </div>
          <div>
            <h3 className="text-2xl font-semibold tracking-tight">Debt Snowball Strategy</h3>
            <p className="text-xs text-on-surface-variant font-medium tracking-widest uppercase">Elite Wealth Engineering</p>
          </div>
        </div>

        <div className="flex gap-4 w-full md:w-auto">
          <div className="bg-surface-container p-4 rounded-2xl border-l-4 border-primary flex-1 md:min-w-[160px]">
             <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-1">Payoff Window</p>
             <p className="text-2xl font-semibold text-primary">{months} Months</p>
          </div>
          <div className="bg-surface-container p-4 rounded-2xl border-l-4 border-secondary flex-1 md:min-w-[160px]">
             <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-1">Total Liability</p>
             <p className="text-2xl font-semibold text-secondary">{formatCurrency(principal + totalInterest, currency, rates)}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <div className="space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="space-y-3">
              <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant ml-1">Principal Balance</label>
              <div className="relative group">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/20 font-light">$</span>
                <input
                  type="number"
                  value={principal}
                  onChange={(e) => setPrincipal(Number(e.target.value))}
                  className="w-full bg-surface-container border-none focus:ring-1 focus:ring-secondary/40 text-xl font-semibold pl-8 pr-4 py-4 rounded-xl transition-standard"
                />
              </div>
            </div>
            <div className="space-y-3">
              <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant ml-1">Annual Interest</label>
              <div className="relative group">
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-foreground/20 font-light">%</span>
                <input
                  type="number"
                  value={interest}
                  onChange={(e) => setInterest(Number(e.target.value))}
                  className="w-full bg-surface-container border-none focus:ring-1 focus:ring-secondary/40 text-xl font-semibold px-4 py-4 rounded-xl transition-standard"
                />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex justify-between items-center px-1">
               <span className="text-sm font-semibold">Additional Snowball Kick</span>
               <span className="text-sm font-bold text-primary">+{formatCurrency(snowball, currency, rates)}/mo</span>
            </div>
            <input
              type="range"
              min="0"
              max="2000"
              step="50"
              value={snowball}
              onChange={(e) => setSnowball(Number(e.target.value))}
              className="w-full h-1.5 bg-surface-container-highest rounded-full appearance-none cursor-pointer accent-primary"
            />
            <div className="p-4 bg-primary/5 border border-primary/20 rounded-xl flex items-start gap-3">
               <ShieldCheck className="h-5 w-5 text-primary mt-0.5" />
               <p className="text-xs leading-relaxed font-light">
                 By adding <span className="text-primary font-bold">{formatCurrency(snowball, currency, rates)}</span> to your monthly plan, you save
                 <span className="text-foreground font-bold font-mono"> {formatCurrency(totalInterest * 0.4, currency, rates)} </span>
                 in interest and reach zero debt 14 months earlier.
               </p>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="bg-surface-container/50 border border-white/5 rounded-3xl p-8 shadow-inner overflow-hidden">
             <div className="flex justify-between items-end mb-10">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant">Liquidation Timeline</p>
                <div className="px-3 py-1 bg-secondary text-on-secondary text-[10px] font-bold rounded-full uppercase tracking-tighter shadow-lg shadow-secondary/20">
                   Target: Zero
                </div>
             </div>

             <div className="h-48 flex items-end justify-between gap-1.5 px-2 relative mb-8">
               {[90, 82, 70, 60, 48, 35, 20, 5].map((h, i) => (
                 <div key={i} className="flex-1 bg-primary/10 rounded-t-lg group cursor-pointer relative transition-standard hover:bg-primary/20">
                   <div
                    className="absolute bottom-0 w-full bg-primary rounded-t-lg transition-standard duration-1000 ease-out shadow-[0_-5px_15px_rgba(16,185,129,0.2)]"
                    style={{ height: `${h}%` }}
                   />
                 </div>
               ))}
               <div className="absolute bottom-0 left-0 w-full h-px bg-white/10" />
             </div>

             <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-on-surface-variant px-2">
                <span>Oct 2023</span>
                <span>Debt Free: {payoffDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
             </div>
          </div>

          <button className="w-full bg-gradient-to-r from-secondary to-secondary-container text-on-secondary px-8 py-5 rounded-2xl text-xs font-bold uppercase tracking-[0.2em] shadow-xl shadow-secondary/20 mt-8 transition-standard active:scale-95 hover:brightness-110 flex items-center justify-center gap-2 group">
             Execute Snowball Plan
             <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-standard" />
          </button>
        </div>
      </div>
    </section>
  );
}
