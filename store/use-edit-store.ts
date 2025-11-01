"use client";

import { create } from "zustand";

type States = {
  isEditing: boolean;
};

type Actions = {
  toggleEdit: () => void;
  setEditing: (isEditing: boolean) => void;
};

export const useEditStore = create<States & Actions>()((set) => ({
  isEditing: false,

  toggleEdit: () => {
    set((state) => ({ isEditing: !state.isEditing }));
  },
  setEditing: (isEditing) => {
    set({ isEditing });
  },
}));
