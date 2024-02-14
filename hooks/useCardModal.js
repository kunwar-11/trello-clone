import { create } from "zustand";

export const useCardModal = create((set) => ({
  isOpen: false,
  id: undefined,
  onOpen: (id) => set({ isOpen: true, id }),
  onClose: () => set({ isOpen: false, id: undefined }),
}));
