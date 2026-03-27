'use client';

import { useEffect } from 'react';
import { LiquidityOverview } from "@/components/LiquidityOverview";
import { Charts } from "@/components/Charts";
import { TransactionLedger } from "@/components/TransactionLedger";
import { SpendingPrediction } from "@/components/SpendingPrediction";
import { DebtSnowballCalculator } from "@/components/DebtSnowballCalculator";
import { SubscriptionTracker } from "@/components/SubscriptionTracker";
import { OnboardingModal } from "@/components/OnboardingModal";
import { MultiCurrencyToggle } from "@/components/MultiCurrencyToggle";
import { useAuraStore } from '@/lib/store';

export default function Home() {
  const fetchData = useAuraStore((state) => state.fetchData);
  const isLoading = useAuraStore((state) => state.isLoading);
  const error = useAuraStore((state) => state.error);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (error) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <div className="bg-danger/10 border border-danger/20 p-8 rounded-3xl text-center max-w-md animate-in zoom-in duration-500">
           <p className="text-xl font-semibold text-danger mb-4">Sovereign Link Failure</p>
           <p className="text-sm text-on-surface-variant mb-6">{error}</p>
           <button
            onClick={() => fetchData()}
            className="bg-danger text-on-error px-6 py-2 rounded-xl text-xs font-bold uppercase tracking-widest active:scale-95 transition-standard"
           >
            Retry Connection
           </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-16 pb-20 md:pb-0">
      <OnboardingModal />

      {isLoading && (
        <div className="fixed inset-0 z-[200] bg-background/60 backdrop-blur-sm flex items-center justify-center">
           <div className="h-1 w-48 bg-surface-container overflow-hidden rounded-full">
              <div className="h-full bg-primary animate-progress-indeterminate" />
           </div>
        </div>
      )}

      <header className="flex flex-col md:flex-row md:items-end justify-between gap-8 animate-in fade-in duration-1000">
        <LiquidityOverview />
        <div className="flex flex-col items-end gap-4 shrink-0">
          <MultiCurrencyToggle />
          <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-[0.4em]">Sovereign Pulse: Synchronized</p>
        </div>
      </header>

      <SpendingPrediction />

      <section className="space-y-8">
        <div className="flex justify-between items-baseline px-2">
          <h2 className="text-3xl font-light tracking-tighter">Analytical Core</h2>
          <span className="text-[10px] font-bold text-primary uppercase tracking-[0.2em] animate-pulse-subtle">High Fidelity Data</span>
        </div>
        <Charts />
      </section>

      <section className="grid grid-cols-1 xl:grid-cols-12 gap-12 items-start">
        <div className="xl:col-span-7 space-y-12">
          <TransactionLedger />
        </div>
        <div className="xl:col-span-5 space-y-12">
          <SubscriptionTracker />
          <DebtSnowballCalculator />
        </div>
      </section>

      <footer className="pt-20 border-t border-white/5 flex flex-col items-center justify-center gap-4 text-on-surface-variant/20">
         <p className="text-[10px] font-bold uppercase tracking-[0.8em]">AuraFinance Sovereign System v.1.0</p>
         <div className="flex gap-8">
            <div className="h-1 w-20 bg-primary/10 rounded-full" />
            <div className="h-1 w-20 bg-secondary/10 rounded-full" />
            <div className="h-1 w-20 bg-danger/10 rounded-full" />
         </div>
      </footer>
    </div>
  );
}
