"use client";

import { create } from "zustand";

type Stores = {
  openDialogProfile: boolean;
  openDialogSecurity: boolean;
};

type Actions = {
  toggleDialogProfile: () => void;
  toggleDialogSecurity: () => void;
};

export const useModalStore = create<Stores & Actions>()((set) => ({
  openDialogProfile: false,
  openDialogSecurity: false,

  toggleDialogProfile: () => {
    set((state) => ({ openDialogProfile: !state.openDialogProfile }));
  },
  toggleDialogSecurity: () => {
    set((state) => ({
      openDialogSecurity: !state.openDialogSecurity,
    }));
  },
}));
