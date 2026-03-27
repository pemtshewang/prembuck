'use client';

import { Search, Command, History, ArrowUpRight } from 'lucide-react';
import { useState } from 'react';

export default function SearchPage() {
  const [query, setQuery] = useState('');

  const suggestions = [
    'Recent Apple Store transactions',
    'Monthly burn rate analysis',
    'Subscription audit results',
    'Debt payoff timeline',
    'High-yield vault interest rate',
  ];

  return (
    <div className="space-y-12 max-w-4xl mx-auto">
      <header className="space-y-8 animate-in fade-in duration-700">
        <div className="space-y-4">
          <h1 className="text-4xl font-light tracking-tighter text-center">Global Search</h1>
          <p className="text-on-surface-variant text-lg font-light text-center">
            Query your entire sovereign financial environment.
          </p>
        </div>

        <div className="relative group">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-6 w-6 text-on-surface-variant/40 group-focus-within:text-primary transition-standard" />
          <input
            type="text"
            placeholder="Query transactions, insights, or files..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-surface-container border-none focus:ring-2 focus:ring-primary/40 rounded-[2rem] px-16 py-8 text-2xl font-light placeholder:text-on-surface-variant/10 transition-standard shadow-2xl"
          />
          <div className="absolute right-6 top-1/2 -translate-y-1/2 flex items-center gap-2 px-3 py-1.5 bg-background rounded-xl border border-white/5 text-on-surface-variant/40">
             <Command className="h-4 w-4" />
             <span className="text-[10px] font-bold">K</span>
          </div>
        </div>
      </header>

      <section className="space-y-6">
        <div className="flex items-center gap-3 px-4">
           <History className="h-4 w-4 text-on-surface-variant/40" />
           <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant">Recommended Queries</p>
        </div>

        <div className="grid grid-cols-1 gap-2">
           {suggestions.map((s) => (
             <button
              key={s}
              className="flex items-center justify-between p-6 bg-white/[0.02] hover:bg-white/[0.05] border border-white/5 rounded-2xl transition-standard group text-left"
             >
               <span className="text-lg font-light text-foreground/70 group-hover:text-foreground">{s}</span>
               <ArrowUpRight className="h-5 w-5 text-on-surface-variant opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-standard" />
             </button>
           ))}
        </div>
      </section>
    </div>
  );
}
