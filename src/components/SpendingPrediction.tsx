'use client';

import { Sparkles, TrendingDown, Info, ArrowUpRight } from 'lucide-react';
import { useAuraStore } from '@/lib/store';
import { getSpendingPrediction, formatCurrency, cn } from '@/lib/utils';

export function SpendingPrediction() {
  const transactions = useAuraStore((state) => state.transactions);
  const currency = useAuraStore((state) => state.currency);
  const rates = useAuraStore((state) => state.rates);
  const { predictedTotal, savingsVelocity, optimizationAlert } = getSpendingPrediction(transactions);

  return (
    <div className="bg-surface-container rounded-[2rem] p-10 border border-primary/20 relative overflow-hidden group shadow-2xl">
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mr-20 -mt-20 blur-3xl group-hover:bg-primary/10 transition-standard duration-700" />

      <div className="flex flex-col md:flex-row items-start justify-between relative z-10 gap-10">
        <div className="space-y-8 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 animate-pulse-subtle">
            <Sparkles className="h-3 w-3 text-primary fill-primary" />
            <span className="text-[9px] font-bold text-primary uppercase tracking-[0.2em]">Aura Intelligence</span>
          </div>

          <div className="space-y-4">
            <h3 className="text-3xl md:text-4xl font-light leading-tight tracking-tighter">
              Predicted burn rate for this month is
              <span className="text-primary font-semibold"> {formatCurrency(predictedTotal, currency, rates)}</span>
            </h3>
            <p className="text-on-surface-variant text-base leading-relaxed max-w-lg font-light">
              Based on your reduced lifestyle overhead, we suggest moving
              <span className="text-foreground font-medium"> {formatCurrency(savingsVelocity * 2, currency, rates)} </span>
              to your High-Yield Vault to capture the 4.8% APY boost.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button className="bg-primary text-on-primary px-8 py-4 rounded-xl text-xs font-bold uppercase tracking-widest hover:brightness-110 active:scale-95 transition-standard shadow-xl shadow-primary/20 flex items-center justify-center gap-2 group/btn">
              Optimize Now
              <ArrowUpRight className="h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-standard" />
            </button>
            <button className="bg-white/5 text-foreground px-8 py-4 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-white/10 transition-standard">
              Review Analytics
            </button>
          </div>
        </div>

        <div className="relative h-40 w-40 flex items-center justify-center">
           <div className="absolute inset-0 border-2 border-primary/10 rounded-full animate-ping duration-[3s]" />
           <div className="absolute inset-2 border border-primary/20 rounded-full animate-pulse-subtle" />
           <div className="h-28 w-28 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center backdrop-blur-md">
             <TrendingDown className="h-10 w-10 text-primary" />
           </div>
        </div>
      </div>
    </div>
  );
}
