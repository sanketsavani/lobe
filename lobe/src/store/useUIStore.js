// LOBES: UI state — quick add, task drawer, search modal (no persist)

import { create } from 'zustand'

export const useUIStore = create((set) => ({
  quickAddOpen: false,
  taskDrawerOpen: false,
  taskDrawerTask: null, // null = add form, object = edit
  searchOpen: false,

  openQuickAdd: () => set({ quickAddOpen: true }),
  closeQuickAdd: () => set({ quickAddOpen: false }),
  toggleQuickAdd: () => set((s) => ({ quickAddOpen: !s.quickAddOpen })),

  openTaskDrawer: (task = null) => set({ taskDrawerOpen: true, taskDrawerTask: task }),
  closeTaskDrawer: () => set({ taskDrawerOpen: false, taskDrawerTask: null }),

  openSearch: () => set({ searchOpen: true }),
  closeSearch: () => set({ searchOpen: false }),
  toggleSearch: () => set((s) => ({ searchOpen: !s.searchOpen })),
}))
