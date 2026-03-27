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

interface AuraState {
  accounts: Account[];
  transactions: Transaction[];
  categoryLimits: CategoryLimit[];
  privacyMode: boolean;
  currency: 'USD' | 'EUR' | 'BTN' | 'INR';
  togglePrivacyMode: () => void;
  setCurrency: (currency: AuraState['currency']) => void;
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  updateCategoryLimit: (category: string, limit: number) => void;
}

export const useAuraStore = create<AuraState>()(
  persist(
    (set) => ({
      accounts: [
        { id: '1', name: 'Cash', type: 'cash', balance: 142000, icon: 'payments' },
        { id: '2', name: 'Savings', type: 'savings', balance: 450230, icon: 'savings' },
        { id: '3', name: 'Investments', type: 'investment', balance: 691862, icon: 'monitoring' },
      ],
      transactions: [
        { id: '1', entity: 'Apple Store Premium', category: 'Hardware', date: '2023-10-24', amount: -2149.00, status: 'settled' },
        { id: '2', entity: 'Vanguard REIT Div', category: 'Investment', date: '2023-10-22', amount: 1280.42, status: 'settled' },
        { id: '3', entity: 'Lufthansa Group', category: 'Travel', date: '2023-10-20', amount: -842.10, status: 'pending' },
      ],
      categoryLimits: [
        { category: 'Groceries', limit: 850, current: 520 },
        { category: 'Tech & Gear', limit: 400, current: 140 },
        { category: 'Dining', limit: 600, current: 425 },
      ],
      privacyMode: false,
      currency: 'USD',
      togglePrivacyMode: () => set((state) => ({ privacyMode: !state.privacyMode })),
      setCurrency: (currency) => set({ currency }),
      addTransaction: (transaction) => set((state) => ({
        transactions: [{ ...transaction, id: Math.random().toString(36).substring(7) }, ...state.transactions]
      })),
      updateCategoryLimit: (category, limit) => set((state) => ({
        categoryLimits: state.categoryLimits.map((l) => l.category === category ? { ...l, limit } : l)
      })),
    }),
    {
      name: 'aura-finance-storage',
    }
  )
);
