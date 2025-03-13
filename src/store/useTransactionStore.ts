import {
    collection,
    addDoc,
    getDocs,
    getDoc,
    doc,
    query,
    where,
} from 'firebase/firestore';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { db } from '../firebase';
import { useAuthStore } from './useAuthStore';

interface Transaction {
    id?: string;
    title: string;
    amount: number;
    category: string;
    date: string;
    description?: string;
    userId: string;
}

interface TransactionsState {
    transactions: Transaction[];
    fetchTransactions: () => Promise<void>;
    addTransaction: (transaction: Omit<Transaction, 'userId'>) => Promise<void>;
    getTransactionById: (id: string) => Promise<Transaction | null>;
}

export const useTransactionsStore = create<TransactionsState>()(
    persist(
        (set) => ({
            transactions: [],

            fetchTransactions: async () => {
                const user = useAuthStore.getState().user;
                if (!user) return;

                const q = query(
                    collection(db, 'transactions'),
                    where('userId', '==', user.uid)
                );

                const snapshot = await getDocs(q);
                const transactions = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                })) as Transaction[];

                set({ transactions });
            },

            addTransaction: async (transaction) => {
                const user = useAuthStore.getState().user;
                if (!user) return;

                const newTransaction = { ...transaction, userId: user.uid };
                const docRef = await addDoc(
                    collection(db, 'transactions'),
                    newTransaction
                );

                set((state) => ({
                    transactions: [
                        ...state.transactions,
                        { ...newTransaction, id: docRef.id },
                    ],
                }));
            },

            getTransactionById: async (id) => {
                try {
                    const docRef = doc(db, 'transactions', id);
                    const docSnap = await getDoc(docRef);

                    if (docSnap.exists()) {
                        return {
                            id: docSnap.id,
                            ...docSnap.data(),
                        } as Transaction;
                    } else {
                        console.warn('Transaction not found');
                        return null;
                    }
                } catch (error) {
                    console.error('Error fetching transaction:', error);
                    return null;
                }
            },
        }),
        { name: 'transactions-storage' }
    )
);
