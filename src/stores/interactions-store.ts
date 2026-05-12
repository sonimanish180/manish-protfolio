/**
 * interactions-store — Optimistic UI state for bookmarks and endorsements.
 * Uses Zustand with optimistic updates + rollback on simulated failure.
 */
import { create } from 'zustand'

interface InteractionsState {
  /** Project IDs the user has bookmarked */
  bookmarkedIds: Set<string>
  /** IDs currently in-flight (pending API call) */
  pendingBookmarks: Set<string>
  /** Skill endorsement counts (starts at seeded values) */
  endorsements: Record<string, number>
  /** Skills the user has already endorsed */
  endorsedSkills: Set<string>
  /** Skills currently in-flight */
  pendingEndorsements: Set<string>

  toggleBookmark: (id: string, apiCall: () => Promise<void>) => Promise<void>
  endorseSkill: (skill: string, apiCall: () => Promise<void>) => Promise<void>
}

export const useInteractionsStore = create<InteractionsState>((set, get) => ({
  bookmarkedIds: new Set(),
  pendingBookmarks: new Set(),
  endorsements: {},
  endorsedSkills: new Set(),
  pendingEndorsements: new Set(),

  toggleBookmark: async (id, apiCall) => {
    const { bookmarkedIds } = get()
    const wasBookmarked = bookmarkedIds.has(id)

    // Optimistic: toggle immediately + mark pending
    set((s) => {
      const next = new Set(s.bookmarkedIds)
      if (wasBookmarked) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return {
        bookmarkedIds: next,
        pendingBookmarks: new Set(s.pendingBookmarks).add(id),
      }
    })

    try {
      await apiCall()
    } catch {
      // Rollback to previous state
      set((s) => {
        const rolled = new Set(s.bookmarkedIds)
        if (wasBookmarked) {
          rolled.add(id)
        } else {
          rolled.delete(id)
        }
        return { bookmarkedIds: rolled }
      })
    } finally {
      set((s) => {
        const p = new Set(s.pendingBookmarks)
        p.delete(id)
        return { pendingBookmarks: p }
      })
    }
  },

  endorseSkill: async (skill, apiCall) => {
    const { endorsedSkills } = get()
    if (endorsedSkills.has(skill)) return // already endorsed, no double-tap

    // Optimistic: +1 count + mark as endorsed + mark pending
    set((s) => ({
      endorsements: { ...s.endorsements, [skill]: (s.endorsements[skill] ?? 0) + 1 },
      endorsedSkills: new Set(s.endorsedSkills).add(skill),
      pendingEndorsements: new Set(s.pendingEndorsements).add(skill),
    }))

    try {
      await apiCall()
    } catch {
      // Rollback: -1 count + unmark endorsed
      set((s) => {
        const endorsed = new Set(s.endorsedSkills)
        endorsed.delete(skill)
        return {
          endorsements: {
            ...s.endorsements,
            [skill]: Math.max(0, (s.endorsements[skill] ?? 1) - 1),
          },
          endorsedSkills: endorsed,
        }
      })
    } finally {
      set((s) => {
        const p = new Set(s.pendingEndorsements)
        p.delete(skill)
        return { pendingEndorsements: p }
      })
    }
  },
}))
