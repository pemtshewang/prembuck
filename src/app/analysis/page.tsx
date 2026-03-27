import { Charts } from "@/components/Charts";
import { SpendingPrediction } from "@/components/SpendingPrediction";
import { DebtSnowballCalculator } from "@/components/DebtSnowballCalculator";
import { SubscriptionTracker } from "@/components/SubscriptionTracker";

export default function AnalysisPage() {
  return (
    <div className="space-y-16">
      <header className="space-y-4 animate-in fade-in duration-700">
        <h1 className="text-4xl font-light tracking-tighter">Strategic Analysis</h1>
        <p className="text-on-surface-variant text-lg font-light max-w-2xl">
          Advanced insights and predictive engineering for your capital architecture.
        </p>
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
        <div className="xl:col-span-6">
          <SubscriptionTracker />
        </div>
        <div className="xl:col-span-6">
          <DebtSnowballCalculator />
        </div>
      </section>
    </div>
  );
}
