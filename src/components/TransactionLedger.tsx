'use client';

import { useState } from 'react';
import {
  Search,
  Filter,
  ChevronRight,
  ShoppingBag,
  TrendingUp,
  Plane,
  MoreHorizontal,
  Plus
} from 'lucide-react';
import { useAuraStore } from '@/lib/store';
import { formatCurrency, cn } from '@/lib/utils';

export function TransactionLedger() {
  const transactions = useAuraStore((state) => state.transactions);
  const privacyMode = useAuraStore((state) => state.privacyMode);
  const currency = useAuraStore((state) => state.currency);
  const rates = useAuraStore((state) => state.rates);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTransactions = transactions.filter(t =>
    t.entity.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="bg-surface rounded-[2rem] border border-white/5 shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-1000">
      <div className="p-8 flex flex-col md:flex-row justify-between items-center border-b border-white/5 gap-6">
        <h3 className="text-xl font-semibold self-start md:self-center">Recent Activity</h3>

        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-on-surface-variant/40" />
            <input
              type="text"
              placeholder="Search Ledger..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-surface-container border-none focus:ring-1 focus:ring-primary/40 rounded-xl px-10 py-3 text-sm placeholder:text-on-surface-variant/20 transition-standard"
            />
          </div>
          <button className="p-3 bg-surface-container rounded-xl border border-white/5 hover:bg-surface-container-high transition-standard group">
            <Filter className="h-4 w-4 text-on-surface-variant group-hover:text-primary transition-standard" />
          </button>
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto no-scrollbar">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-surface-container text-[10px] uppercase tracking-widest text-on-surface-variant font-bold border-b border-white/5">
              <th className="px-8 py-5">Entity</th>
              <th className="px-8 py-5">Category</th>
              <th className="px-8 py-5">Date</th>
              <th className="px-8 py-5">Status</th>
              <th className="px-8 py-5 text-right">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {filteredTransactions.map((transaction) => (
              <tr
                key={transaction.id}
                className="hover:bg-white/[0.02] transition-standard cursor-pointer group"
              >
                <td className="px-8 py-6">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-surface-container-high flex items-center justify-center text-primary group-hover:scale-110 transition-standard">
                       {transaction.amount < 0 ? <ShoppingBag className="h-5 w-5" /> : <TrendingUp className="h-5 w-5" />}
                    </div>
                    <span className="text-sm font-semibold">{transaction.entity}</span>
                  </div>
                </td>
                <td className="px-8 py-6 text-xs text-on-surface-variant font-medium tracking-wide">
                  {transaction.category}
                </td>
                <td className="px-8 py-6 text-xs text-on-surface-variant font-medium tracking-wide">
                  {transaction.date}
                </td>
                <td className="px-8 py-6">
                  <span className={cn(
                    "px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest border",
                    transaction.status === 'settled'
                      ? "bg-primary/10 text-primary border-primary/20"
                      : "bg-secondary/10 text-secondary border-secondary/20"
                  )}>
                    {transaction.status}
                  </span>
                </td>
                <td className={cn(
                   "px-8 py-6 text-sm font-bold text-right privacy-blur",
                   transaction.amount < 0 ? "text-danger" : "text-primary",
                   privacyMode && "active"
                )}>
                  {transaction.amount < 0 ? '-' : '+'}{formatCurrency(Math.abs(transaction.amount), currency, rates)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Expandable Cards */}
      <div className="md:hidden divide-y divide-white/5">
        {filteredTransactions.map((transaction) => (
          <details key={transaction.id} className="group transition-standard">
            <summary className="flex items-center justify-between p-6 list-none cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-surface-container-high flex items-center justify-center text-primary group-open:scale-110 transition-standard">
                   {transaction.amount < 0 ? <ShoppingBag className="h-5 w-5" /> : <TrendingUp className="h-5 w-5" />}
                </div>
                <div>
                  <p className="text-sm font-semibold">{transaction.entity}</p>
                  <p className="text-[10px] text-on-surface-variant uppercase tracking-widest font-bold">{transaction.date}</p>
                </div>
              </div>
              <div className="text-right">
                <p className={cn(
                   "text-sm font-bold privacy-blur",
                   transaction.amount < 0 ? "text-danger" : "text-primary",
                   privacyMode && "active"
                )}>
                  {transaction.amount < 0 ? '-' : '+'}{formatCurrency(Math.abs(transaction.amount), currency, rates)}
                </p>
                <ChevronRight className="h-4 w-4 ml-auto mt-1 transition-standard group-open:rotate-90 text-on-surface-variant/40" />
              </div>
            </summary>
            <div className="px-6 pb-6 pt-2 bg-white/[0.02] animate-in fade-in slide-in-from-top-2 duration-300">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant">Category</p>
                  <p className="text-xs font-medium">{transaction.category}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant">Status</p>
                  <span className={cn(
                    "inline-block px-2 py-0.5 rounded-full text-[8px] font-bold uppercase tracking-widest border",
                    transaction.status === 'settled'
                      ? "bg-primary/10 text-primary border-primary/20"
                      : "bg-secondary/10 text-secondary border-secondary/20"
                  )}>
                    {transaction.status}
                  </span>
                </div>
                <div className="col-span-2 space-y-2 pt-4 border-t border-white/5">
                  <div className="flex justify-between items-center text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">
                    <span>Budget Integrity</span>
                    <span>82% Used</span>
                  </div>
                  <div className="w-full h-1 bg-surface-container-highest rounded-full overflow-hidden">
                    <div className="h-full bg-primary" style={{ width: '82%' }} />
                  </div>
                </div>
              </div>
            </div>
          </details>
        ))}
      </div>

      <div className="p-6 bg-surface-container/30 border-t border-white/5 flex justify-center">
        <button className="text-xs font-bold uppercase tracking-[0.2em] text-primary hover:text-primary/70 transition-standard">
          View All Transactions
        </button>
      </div>

      <button className="fixed bottom-12 right-12 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-on-primary shadow-2xl shadow-primary/40 hover:scale-110 active:scale-95 transition-standard group hidden md:flex">
        <Plus className="h-8 w-8" strokeWidth={3} />
        <span className="absolute right-20 scale-0 origin-right opacity-0 bg-surface-container px-4 py-2 rounded-xl border border-white/10 text-[10px] font-bold uppercase tracking-widest text-foreground group-hover:scale-100 group-hover:opacity-100 transition-standard">
          Quick Add
        </span>
      </button>
    </section>
  );
}
