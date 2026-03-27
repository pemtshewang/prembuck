import { TransactionLedger } from "@/components/TransactionLedger";

export default function TransactionsPage() {
  return (
    <div className="space-y-12">
      <header className="space-y-4 animate-in fade-in duration-700">
        <h1 className="text-4xl font-light tracking-tighter">Sovereign Ledger</h1>
        <p className="text-on-surface-variant text-lg font-light max-w-2xl">
          Complete history of your financial movement and capital flow.
        </p>
      </header>

      <TransactionLedger />

      <section className="bg-surface-container rounded-[2rem] p-10 border border-white/5 shadow-2xl">
        <h3 className="text-xl font-semibold mb-8">Export Data</h3>
        <div className="flex flex-col sm:flex-row gap-4">
           <button className="flex-1 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs font-bold uppercase tracking-widest transition-standard">
              Download CSV
           </button>
           <button className="flex-1 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs font-bold uppercase tracking-widest transition-standard">
              Generate PDF Report
           </button>
        </div>
      </section>
    </div>
  );
}
