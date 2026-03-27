'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Wallet,
  Receipt,
  BarChart3,
  Search,
  Plus
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { icon: LayoutDashboard, label: 'Home', href: '/' },
  { icon: Wallet, label: 'Wealth', href: '/wealth' },
  { icon: Search, label: 'Search', href: '/search' },
  { icon: BarChart3, label: 'Insights', href: '/insights' },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <>
      <button className="fixed bottom-28 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary-container shadow-2xl shadow-primary/30 transition-standard active:scale-95 md:hidden">
        <Plus className="h-7 w-7 text-on-primary" strokeWidth={2.5} />
      </button>

      <nav className="fixed bottom-0 left-0 z-50 flex w-full items-center justify-around border-t border-white/10 bg-background/40 px-4 pb-8 pt-4 backdrop-blur-2xl md:hidden">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-1 transition-standard",
                isActive ? "text-primary scale-110" : "text-foreground/40 hover:text-foreground"
              )}
            >
              <item.icon className={cn("h-6 w-6", isActive && "fill-primary/20")} strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-[10px] font-bold uppercase tracking-widest">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}
