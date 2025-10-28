"use client";

import { create } from "zustand";

type Stores = {
  openDialogProfile: boolean;
};

type Actions = {
  toggleDialogProfile: () => void;
};

export const useModalStore = create<Stores & Actions>()((set) => ({
  openDialogProfile: false,

  toggleDialogProfile: () => {
    set((state) => ({ openDialogProfile: !state.openDialogProfile }));
  },
}));
