'use client';

import { useState, useEffect } from 'react';
import {
  Lock,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Plus,
  ShoppingCart,
  Monitor,
  Ticket
} from 'lucide-react';
import { useAuraStore } from '@/lib/store';
import { cn } from '@/lib/utils';

export function OnboardingModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(2);
  const { categoryLimits, updateCategoryLimit } = useAuraStore();

  useEffect(() => {
    const hasOnboarded = localStorage.getItem('aura-onboarded');
    if (!hasOnboarded) {
      setIsOpen(true);
    }
  }, []);

  const handleComplete = () => {
    localStorage.setItem('aura-onboarded', 'true');
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-background/80 backdrop-blur-xl animate-in fade-in duration-500">
      <div className="relative w-full max-w-5xl bg-surface border border-white/5 rounded-[2.5rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col md:flex-row h-full max-h-[800px]">

        {/* Sidebar Progress */}
        <aside className="w-full md:w-80 bg-surface-container p-10 border-r border-white/5 flex flex-col justify-between shrink-0">
          <div className="space-y-12">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 bg-primary rounded-full flex items-center justify-center text-on-primary shadow-lg shadow-primary/20">
                <ShieldCheck className="h-4 w-4" />
              </div>
              <span className="font-bold tracking-widest text-sm uppercase">AuraFinance</span>
            </div>

            <nav className="space-y-8">
              {[
                { n: '01', l: 'Welcome', active: false },
                { n: '02', l: 'Allocations', active: true },
                { n: '03', l: 'Security', active: false },
              ].map((item) => (
                <div key={item.n} className={cn(
                  "flex items-center gap-4 transition-standard",
                  item.active ? "text-primary" : "opacity-30"
                )}>
                  <span className="text-[10px] font-bold tracking-[0.2em]">{item.n}</span>
                  <span className={cn("text-sm", item.active ? "font-bold" : "font-light")}>{item.l}</span>
                </div>
              ))}
            </nav>
          </div>

          <div className="space-y-2">
            <p className="text-[10px] text-on-surface-variant uppercase tracking-[0.2em] font-bold leading-relaxed">
              Sovereign Wealth<br/>Management System
            </p>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 p-8 md:p-16 overflow-y-auto no-scrollbar">
          <header className="mb-12 space-y-4">
             <span className="text-primary text-[10px] font-bold uppercase tracking-[0.4em]">Configuration Step 02</span>
             <h2 className="text-4xl md:text-5xl font-light tracking-tighter leading-tight">
                Define your <br/><span className="text-primary font-semibold">hard limits.</span>
             </h2>
             <p className="text-on-surface-variant text-lg font-light max-w-md">
                Precision is the foundation of growth. Set strict thresholds for your monthly expenditure.
             </p>
          </header>

          <div className="space-y-12">
            {categoryLimits.map((cat) => (
              <div key={cat.category} className="group">
                <div className="flex justify-between items-end mb-4">
                   <label className="text-xs font-bold uppercase tracking-widest text-foreground/70">{cat.category}</label>
                   <span className="text-primary font-mono text-xl font-bold">${cat.limit}</span>
                </div>
                <div className="relative h-1.5 w-full bg-surface-container-highest rounded-full overflow-hidden mb-6 shadow-inner">
                   <div
                    className="absolute top-0 left-0 h-full bg-primary shadow-[0_0_15px_rgba(16,185,129,0.4)] transition-standard duration-1000"
                    style={{ width: `${(cat.current / cat.limit) * 100}%` }}
                   />
                </div>
                <div className="relative">
                  <input
                    type="range"
                    min="100"
                    max="2000"
                    step="50"
                    value={cat.limit}
                    onChange={(e) => updateCategoryLimit(cat.category, Number(e.target.value))}
                    className="w-full h-1 bg-surface-container-highest rounded-full appearance-none cursor-pointer accent-primary"
                  />
                </div>
              </div>
            ))}

            <button className="w-full py-5 rounded-2xl border-2 border-dashed border-white/5 text-on-surface-variant hover:text-primary hover:border-primary/20 hover:bg-primary/5 transition-standard flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-[0.2em]">
               <Plus className="h-4 w-4" />
               Add Category
            </button>
          </div>

          <footer className="mt-20 flex items-center justify-between gap-6">
             <button className="text-on-surface-variant hover:text-foreground transition-standard flex items-center gap-2 text-xs font-bold uppercase tracking-widest">
                <ArrowLeft className="h-4 w-4" />
                Previous
             </button>
             <button
              onClick={handleComplete}
              className="bg-gradient-to-r from-primary to-primary-container px-10 py-5 rounded-2xl text-on-primary font-bold uppercase tracking-[0.2em] text-xs shadow-2xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-standard flex items-center gap-2"
             >
                Initialize Sovereignty
                <ArrowRight className="h-4 w-4" />
             </button>
          </footer>
        </div>
      </div>
    </div>
  );
}
