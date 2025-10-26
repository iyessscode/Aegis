"use client";

import { create } from "zustand";

import { AllProviders } from "@/lib/providers";

type LoadingStore = {
  loading: {
    global: boolean;
    provider: AllProviders;
  };
  setLoading: (provider: AllProviders) => void;
  clearLoading: () => void;
};

export const useLoadingStore = create<LoadingStore>((set) => ({
  loading: {
    global: false,
    provider: null,
  },

  setLoading: (provider: AllProviders) => {
    set({ loading: { global: true, provider } });
  },
  clearLoading: () => {
    set({ loading: { global: false, provider: null } });
  },
}));
