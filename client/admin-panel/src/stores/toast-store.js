import { create } from 'zustand';

let id = 0;

export const useToastStore = create((set) => ({
  toasts: [],

  add: (message, type = 'success') => {
    const toastId = ++id;
    set((s) => ({ toasts: [...s.toasts, { id: toastId, message, type }] }));
    setTimeout(() => {
      set((s) => ({ toasts: s.toasts.filter((t) => t.id !== toastId) }));
    }, 3500);
  },

  remove: (toastId) => {
    set((s) => ({ toasts: s.toasts.filter((t) => t.id !== toastId) }));
  },
}));
