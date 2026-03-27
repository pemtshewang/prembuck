import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Transaction = {
  id: string;
  entity: string;
  category: string;
  date: string;
  amount: number;
  status: 'settled' | 'pending';
};

export type Account = {
  id: string;
  name: string;
  type: 'cash' | 'savings' | 'investment';
  balance: number;
  icon: string;
};

export type CategoryLimit = {
  category: string;
  limit: number;
  current: number;
};

export type LiquidityOverview = {
  totalNetWorth: number;
  cash: number;
  savings: number;
  investments: number;
};

export type Subscription = {
  id: string;
  name: string;
  amount: number;
  renewal: string;
  type: string;
};

export type AnalysisReport = {
  predictedBurn: number;
  savingsVelocity: number;
};

interface AuraState {
  accounts: Account[];
  transactions: Transaction[];
  categoryLimits: CategoryLimit[];
  liquidity: LiquidityOverview;
  subscriptions: Subscription[];
  analysis: AnalysisReport;
  privacyMode: boolean;
  currency: 'USD' | 'EUR' | 'BTN' | 'INR';
  rates: Record<string, number>;
  isLoading: boolean;
  error: string | null;
  togglePrivacyMode: () => void;
  setCurrency: (currency: AuraState['currency']) => void;
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  updateCategoryLimit: (category: string, limit: number) => void;
  fetchData: () => Promise<void>;
}

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';

export const useAuraStore = create<AuraState>()(
  persist(
    (set, get) => ({
      accounts: [
        { id: '1', name: 'Cash', type: 'cash', balance: 142000, icon: 'payments' },
        { id: '2', name: 'Savings', type: 'savings', balance: 450230, icon: 'savings' },
        { id: '3', name: 'Investments', type: 'investment', balance: 691862, icon: 'monitoring' },
      ],
      transactions: [],
      categoryLimits: [],
      liquidity: {
        totalNetWorth: 0,
        cash: 0,
        savings: 0,
        investments: 0
      },
      subscriptions: [],
      analysis: {
        predictedBurn: 0,
        savingsVelocity: 0
      },
      privacyMode: false,
      currency: 'USD',
      rates: { USD: 1, EUR: 0.92, BTN: 83.15, INR: 83.15 },
      isLoading: false,
      error: null,
      togglePrivacyMode: () => set((state) => ({ privacyMode: !state.privacyMode })),
      setCurrency: (currency) => set({ currency }),
      addTransaction: (transaction) => set((state) => ({
        transactions: [{ ...transaction, id: Math.random().toString(36).substring(7) }, ...state.transactions]
      })),
      updateCategoryLimit: (category, limit) => set((state) => ({
        categoryLimits: state.categoryLimits.map((l) => l.category === category ? { ...l, limit } : l)
      })),
      fetchData: async () => {
        set({ isLoading: true, error: null });
        try {
          const [txRes, limitsRes, liqRes, subRes, analysisRes] = await Promise.all([
            fetch(`${API_BASE}/transactions`),
            fetch(`${API_BASE}/category-limits`),
            fetch(`${API_BASE}/liquidity`),
            fetch(`${API_BASE}/subscriptions`),
            fetch(`${API_BASE}/analysis`)
          ]);

          if (!txRes.ok || !limitsRes.ok || !liqRes.ok || !subRes.ok || !analysisRes.ok) {
             throw new Error('Failed to fetch data from API');
          }

          const transactions = await txRes.json();
          const categoryLimits = await limitsRes.json();
          const liquidity = await liqRes.json();
          const subscriptions = await subRes.json();
          const analysis = await analysisRes.json();

          set({
            transactions,
            categoryLimits,
            liquidity,
            subscriptions,
            analysis,
            isLoading: false
          });
        } catch (err: any) {
          set({ error: err.message, isLoading: false });
          console.error('Store fetch error:', err);
        }
      }
    }),
    {
      name: 'aura-finance-storage',
      partialize: (state) => ({
        privacyMode: state.privacyMode,
        currency: state.currency,
        rates: state.rates
      }),
    }
  )
);
