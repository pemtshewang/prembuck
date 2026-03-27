import { LiquidityOverview } from "@/components/LiquidityOverview";
import { Charts } from "@/components/Charts";
import { TransactionLedger } from "@/components/TransactionLedger";
import { SpendingPrediction } from "@/components/SpendingPrediction";
import { DebtSnowballCalculator } from "@/components/DebtSnowballCalculator";
import { SubscriptionTracker } from "@/components/SubscriptionTracker";
import { OnboardingModal } from "@/components/OnboardingModal";
import { MultiCurrencyToggle } from "@/components/MultiCurrencyToggle";

export default function Home() {
  return (
    <div className="space-y-16 pb-20 md:pb-0">
      <OnboardingModal />

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
