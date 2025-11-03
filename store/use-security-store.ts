"use client";

import { create } from "zustand";

type States = {
  isUpdatePassword: boolean;
  isSetPassword: boolean;
};

type Actions = {
  toggleUpdatePassword: () => void;
  toggleSetPassword: () => void;
};

export const useSecurityStore = create<States & Actions>()((set) => ({
  isUpdatePassword: false,
  isSetPassword: false,

  toggleUpdatePassword: () => {
    set((state) => ({ isUpdatePassword: !state.isUpdatePassword }));
  },
  toggleSetPassword: () => {
    set((state) => ({ isSetPassword: !state.isSetPassword }));
  },
}));
