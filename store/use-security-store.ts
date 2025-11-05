"use client";

import { create } from "zustand";

type States = {
  isUpdatePassword: boolean;
  isSetPassword: boolean;
  isSetPasskey: boolean;
  isUpdatePasskey: boolean;
};

type Actions = {
  toggleUpdatePassword: () => void;
  toggleSetPassword: () => void;
  toggleUpdatePasskey: () => void;
  toggleSetPasskey: () => void;
};

export const useSecurityStore = create<States & Actions>()((set) => ({
  isUpdatePassword: false,
  isSetPassword: false,
  isUpdatePasskey: false,
  isSetPasskey: false,

  toggleUpdatePassword: () => {
    set((state) => ({ isUpdatePassword: !state.isUpdatePassword }));
  },
  toggleSetPassword: () => {
    set((state) => ({ isSetPassword: !state.isSetPassword }));
  },
  toggleUpdatePasskey: () => {
    set((state) => ({ isUpdatePasskey: !state.isUpdatePasskey }));
  },
  toggleSetPasskey: () => {
    set((state) => ({ isSetPasskey: !state.isSetPasskey }));
  },
}));
