'use client';

import { useAuraStore } from '@/lib/store';
import { formatCurrency, cn } from '@/lib/utils';
import {
  TrendingUp,
  Wallet,
  PiggyBank,
  BarChart3,
  ChevronRight,
  Monitor
} from 'lucide-react';

export function LiquidityOverview() {
  const accounts = useAuraStore((state) => state.accounts);
  const privacyMode = useAuraStore((state) => state.privacyMode);
  const currency = useAuraStore((state) => state.currency);
  const rates = useAuraStore((state) => state.rates);

  const totalNetWorth = accounts.reduce((acc, account) => acc + account.balance, 0);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <section className="space-y-2">
        <p className="text-on-surface-variant font-medium tracking-[0.2em] uppercase text-[10px]">
          Total Liquidity
        </p>
        <div className="flex items-baseline gap-4">
          <h2 className={cn(
            "text-5xl md:text-7xl font-light tracking-tighter text-foreground privacy-blur",
            privacyMode && "active"
          )}>
            {formatCurrency(totalNetWorth, currency, rates)}
          </h2>
          <div className="flex items-center gap-1.5 text-primary text-sm font-semibold">
            <TrendingUp className="h-4 w-4" />
            <span>+4.2%</span>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {accounts.map((account) => (
          <div
            key={account.id}
            className="group bg-surface-container border border-white/5 p-6 rounded-2xl hover:border-primary/20 transition-standard relative overflow-hidden"
          >
            <div className="flex items-center justify-between relative z-10">
              <div className="space-y-4">
                <div className="h-10 w-10 rounded-xl bg-surface-container-high flex items-center justify-center text-primary group-hover:scale-110 transition-standard">
                   <Wallet className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold tracking-widest text-on-surface-variant">
                    {account.name}
                  </p>
                  <p className={cn(
                    "text-2xl font-semibold privacy-blur",
                    privacyMode && "active"
                  )}>
                    {formatCurrency(account.balance, currency, rates)}
                  </p>
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-on-surface-variant opacity-0 group-hover:opacity-100 transition-standard translate-x-4 group-hover:translate-x-0" />
            </div>
            <div className="absolute top-0 right-0 h-full w-24 bg-gradient-to-l from-primary/5 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-standard" />
          </div>
        ))}
      </section>
    </div>
  );
}
