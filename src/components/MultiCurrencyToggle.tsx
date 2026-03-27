'use client';

import { useAuraStore } from '@/lib/store';
import { cn } from '@/lib/utils';
import { Globe } from 'lucide-react';

const currencies = ['USD', 'EUR', 'BTN', 'INR'] as const;

export function MultiCurrencyToggle() {
  const currentCurrency = useAuraStore((state) => state.currency);
  const setCurrency = useAuraStore((state) => state.setCurrency);

  return (
    <div className="flex bg-surface-container rounded-full p-1 border border-white/5 shadow-inner">
      {currencies.map((currency) => (
        <button
          key={currency}
          onClick={() => setCurrency(currency)}
          className={cn(
            "px-4 py-1.5 text-[10px] font-bold rounded-full transition-standard uppercase tracking-widest",
            currentCurrency === currency
              ? "bg-primary text-on-primary shadow-lg shadow-primary/20"
              : "text-on-surface-variant hover:text-foreground"
          )}
        >
          {currency}
        </button>
      ))}
    </div>
  );
}
