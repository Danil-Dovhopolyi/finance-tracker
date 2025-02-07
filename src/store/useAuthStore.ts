import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  User,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
  updateProfile
} from "firebase/auth";
import { auth } from "../firebase";
import { devtools } from "zustand/middleware";

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  signInWithGoogle: () => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  signUp: (name: string, email: string, password: string) => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        loading: true,
        error: null,
        signInWithGoogle: async () => {
          set({ loading: true, error: null });
          try {
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            set({ user: result.user, loading: false });
          } catch (error) {
            set({
              error: error instanceof Error ? error.message : "An error occurred",
              loading: false
            });
          }
        },
        signIn: async (email, password) => {
          set({ loading: true, error: null });
          try {
            const result = await signInWithEmailAndPassword(auth, email, password);
            set({ user: result.user, loading: false });
          } catch (error) {
            set({
              error: error instanceof Error ? error.message : "An error occurred",
              loading: false
            });
          }
        },
        signUp: async (name, email, password) => {
          set({ loading: true, error: null });
          try {
            const result = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(result.user, { displayName: name });
            set({ user: result.user, loading: false });
          } catch (error) {
            set({
              error: error instanceof Error ? error.message : "An error occurred",
              loading: false
            });
          }
        },
        logout: async () => {
          set({ loading: true });
          try {
            await signOut(auth);
            set({ user: null, error: null, loading: false });
          } catch (error) {
            set({
              error: error instanceof Error ? error.message : "An error occurred",
              loading: false
            });
          }
        },
      }),
      {
        name: 'auth-storage',
        partialize: (state) => ({ user: state.user }),
      }
    )
  )
);