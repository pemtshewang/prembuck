'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';
import { useAuraStore } from '@/lib/store';
import { cn } from '@/lib/utils';

const cashFlowData = [
  { name: 'Mon', in: 4000, out: 2400 },
  { name: 'Tue', in: 3000, out: 1398 },
  { name: 'Wed', in: 2000, out: 9800 },
  { name: 'Thu', in: 2780, out: 3908 },
  { name: 'Fri', in: 1890, out: 4800 },
  { name: 'Sat', in: 2390, out: 3800 },
  { name: 'Sun', in: 3490, out: 4300 },
];

const categoryData = [
  { name: 'Business', value: 45, color: '#10b981' },
  { name: 'Lifestyle', value: 28, color: '#f59e0b' },
  { name: 'Fixed', value: 27, color: '#353436' },
];

export function Charts() {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
      <div className="lg:col-span-2 p-8 bg-surface-container rounded-3xl border border-white/5 shadow-2xl">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h3 className="text-xl font-semibold text-foreground">Cash Flow</h3>
            <p className="text-xs text-on-surface-variant font-medium tracking-wide uppercase">Income vs Expenses</p>
          </div>
          <div className="flex gap-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary"></span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">In</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-surface-container-highest"></span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Out</span>
            </div>
          </div>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={cashFlowData}>
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#bbcabf', fontSize: 10, fontWeight: 600 }}
              />
              <Tooltip
                cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                contentStyle={{
                  backgroundColor: '#161618',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '12px',
                  boxShadow: '0 10px 40px rgba(0,0,0,0.5)'
                }}
              />
              <Bar dataKey="in" fill="#10b981" radius={[4, 4, 0, 0]} />
              <Bar dataKey="out" fill="#353436" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="p-8 bg-surface-container rounded-3xl border border-white/5 shadow-2xl flex flex-col items-center">
        <h3 className="text-xl font-semibold mb-2 self-start">Category Heatmap</h3>
        <p className="text-xs text-on-surface-variant mb-8 self-start font-medium tracking-wide uppercase">Asset Distribution</p>

        <div className="h-64 w-full relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={categoryData}
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                ))}
              </Pie>
              <Tooltip
                 contentStyle={{
                  backgroundColor: '#161618',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '12px'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Equity</span>
            <span className="text-2xl font-semibold">68%</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-8 w-full">
          {categoryData.map((item) => (
            <div key={item.name} className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">{item.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
