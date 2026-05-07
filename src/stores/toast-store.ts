/**
 * toast-store — lightweight Zustand store for the global toast system.
 * Usage: import { toast } from "@/stores/toast-store"
 *        toast.success("Saved!") | toast.error("Failed") | toast.info("FYI") | toast.warning("Watch out")
 */
import { create } from "zustand"

export type ToastType = "success" | "error" | "warning" | "info"

export interface ToastItem {
  id: string
  type: ToastType
  title: string
  description?: string
  duration: number
}

interface ToastState {
  toasts: ToastItem[]
  add: (item: Omit<ToastItem, "id">) => void
  remove: (id: string) => void
  clear: () => void
}

export const useToastStore = create<ToastState>((set) => ({
  toasts: [],
  add: (item) => {
    const id = Math.random().toString(36).slice(2)
    set((s) => ({ toasts: [...s.toasts, { id, ...item }] }))
    if (item.duration > 0) {
      setTimeout(() => set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })), item.duration)
    }
  },
  remove: (id) => set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),
  clear: () => set({ toasts: [] }),
}))

/** Imperative helpers — call anywhere without hooks */
const store = () => useToastStore.getState()

export const toast = {
  success: (title: string, description?: string, duration = 4000) =>
    store().add({ type: "success", title, description, duration }),
  error: (title: string, description?: string, duration = 5000) =>
    store().add({ type: "error", title, description, duration }),
  warning: (title: string, description?: string, duration = 4500) =>
    store().add({ type: "warning", title, description, duration }),
  info: (title: string, description?: string, duration = 4000) =>
    store().add({ type: "info", title, description, duration }),
  dismiss: (id: string) => store().remove(id),
  clear: () => store().clear(),
}
