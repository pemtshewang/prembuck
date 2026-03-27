import { LiquidityOverview } from "@/components/LiquidityOverview";
import { ReceiptVault } from "@/components/ReceiptVault";

export default function PortfolioPage() {
  return (
    <div className="space-y-12">
      <header className="space-y-4 animate-in fade-in duration-700">
        <h1 className="text-4xl font-light tracking-tighter">Wealth Portfolio</h1>
        <p className="text-on-surface-variant text-lg font-light max-w-2xl">
          A comprehensive overview of your sovereign assets, liabilities, and digital records.
        </p>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-12 items-start">
        <div className="xl:col-span-8 space-y-12">
          <LiquidityOverview />

          <section className="bg-surface-container rounded-[2rem] p-10 border border-white/5 shadow-2xl">
            <h3 className="text-xl font-semibold mb-8">Asset Allocation</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: 'Real Estate', value: '$1,200,000', growth: '+2.4%' },
                { label: 'Digital Assets', value: '$84,000', growth: '+12.1%' },
                { label: 'Private Equity', value: '$450,000', growth: '+0.8%' },
                { label: 'Commodities', value: '$120,000', growth: '-1.2%' },
              ].map((asset) => (
                <div key={asset.label} className="p-6 bg-background rounded-2xl border border-white/5 space-y-2">
                  <p className="text-[10px] uppercase font-bold tracking-widest text-on-surface-variant">{asset.label}</p>
                  <p className="text-xl font-semibold">{asset.value}</p>
                  <p className={`text-[10px] font-bold ${asset.growth.startsWith('+') ? 'text-primary' : 'text-danger'}`}>{asset.growth}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="xl:col-span-4">
          <ReceiptVault />
        </div>
      </div>
    </div>
  );
}
