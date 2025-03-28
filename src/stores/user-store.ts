import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persist, createJSONStorage } from 'zustand/middleware';

interface UserState {
  user: IUser;
  isLoading: boolean;
  error: string | null;
  setUser: (user: IUser) => void;
  clearUser: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

const storage = createJSONStorage(() => AsyncStorage);

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: {} as IUser,
      isLoading: false,
      error: null,
      setUser: (user: IUser) => set({ user }),
      clearUser: () => set({ user: {} as IUser }),
      setLoading: (loading: boolean) => set({ isLoading: loading }),
      setError: (error: string | null) => set({ error }),
    }),
    {
      name: 'user-storage',
      storage,
      merge: (persistedState, currentState) => ({ ...currentState, ...(persistedState as UserState) }),
    }
  )
);
