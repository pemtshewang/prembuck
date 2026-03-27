'use client';

import { useState } from 'react';
import {
  Upload,
  FileText,
  CheckCircle2,
  History,
  Image as ImageIcon,
  PlusCircle,
  X
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Receipt {
  id: string;
  name: string;
  date: string;
  size: string;
  status: 'processing' | 'verified';
  image: string;
}

const recentReceipts: Receipt[] = [
  {
    id: '1',
    name: "L'Artisan Coffee",
    date: 'Today, 09:12',
    size: '1.2 MB',
    status: 'processing',
    image: 'https://images.unsplash.com/photo-1554224155-1696413565d3?w=100&h=140&fit=crop'
  },
  {
    id: '2',
    name: 'The Gilded Fork',
    date: 'Yesterday, 21:05',
    size: '2.4 MB',
    status: 'verified',
    image: 'https://images.unsplash.com/photo-1554224155-63510f849c3b?w=100&h=140&fit=crop'
  },
];

export function ReceiptVault() {
  const [isDragging, setIsDragging] = useState(false);

  return (
    <aside className="w-full xl:w-96 bg-surface-container/50 backdrop-blur-xl border border-white/5 rounded-[2.5rem] flex flex-col p-8 overflow-hidden shadow-2xl animate-in fade-in slide-in-from-right-8 duration-1000">
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
            <FileText className="h-4 w-4" />
          </div>
          <h3 className="text-xl font-semibold tracking-tight">Receipt Vault</h3>
        </div>
        <button className="p-2 hover:bg-white/5 rounded-full transition-standard text-on-surface-variant">
           <PlusCircle className="h-5 w-5" />
        </button>
      </div>

      <div className="flex-1 flex flex-col gap-8">
        <div
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          className={cn(
            "h-48 border-2 border-dashed rounded-3xl flex flex-col items-center justify-center p-8 text-center transition-standard group cursor-pointer relative overflow-hidden",
            isDragging ? "border-primary bg-primary/5" : "border-white/10 hover:border-primary/40 bg-white/[0.02]"
          )}
        >
          <div className="relative z-10 space-y-3">
            <div className="h-12 w-12 bg-surface-container-high rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-standard">
              <Upload className="h-6 w-6 text-on-surface-variant group-hover:text-primary transition-standard" />
            </div>
            <div>
              <p className="text-sm font-semibold">Drop receipts here</p>
              <p className="text-[10px] text-on-surface-variant uppercase mt-1 font-bold tracking-widest">PDF, JPG, or PNG</p>
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-standard" />
        </div>

        <div className="flex-1 space-y-6">
          <div className="flex justify-between items-center px-1">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant">Recent Uploads</p>
            <span className="text-[10px] font-bold text-primary">4 New</span>
          </div>

          <div className="space-y-4">
            {recentReceipts.map((receipt) => (
              <div
                key={receipt.id}
                className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.06] transition-standard cursor-pointer group"
              >
                <div className="h-16 w-12 rounded-lg overflow-hidden shrink-0 border border-white/10 relative">
                  <img
                    src={receipt.image}
                    alt="Receipt"
                    className="h-full w-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-standard"
                  />
                  {receipt.status === 'verified' && (
                    <div className="absolute inset-0 flex items-center justify-center bg-primary/20 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-standard">
                      <CheckCircle2 className="h-5 w-5 text-white shadow-lg" />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0 space-y-1">
                  <p className="text-sm font-semibold truncate group-hover:text-primary transition-standard">{receipt.name}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-on-surface-variant font-medium">{receipt.date}</span>
                    <span className="h-1 w-1 bg-white/10 rounded-full" />
                    <span className="text-[10px] text-on-surface-variant font-medium">{receipt.size}</span>
                  </div>
                </div>
                {receipt.status === 'processing' ? (
                  <div className="h-2 w-2 rounded-full bg-secondary animate-pulse" />
                ) : (
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                )}
              </div>
            ))}
          </div>
        </div>

        <button className="w-full py-5 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-white/10 transition-standard group">
          <History className="h-4 w-4 text-on-surface-variant group-hover:text-primary transition-standard" />
          View Full Archive
        </button>
      </div>
    </aside>
  );
}
