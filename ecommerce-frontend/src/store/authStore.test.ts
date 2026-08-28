import { beforeEach, describe, expect, it } from 'vitest'
import { useAuthStore } from './authStore'

describe('auth store', () => {
  beforeEach(() => {
    useAuthStore.getState().logout()
  })

  it('tracks login state and clears it on logout', () => {
    useAuthStore.getState().login(
      { id: 'u-1', email: 'user@example.com', name: 'User' },
      'token'
    )

    expect(useAuthStore.getState().isAuthenticated()).toBe(true)
    expect(useAuthStore.getState().user?.email).toBe('user@example.com')

    useAuthStore.getState().logout()
    expect(useAuthStore.getState().isAuthenticated()).toBe(false)
    expect(useAuthStore.getState().user).toBeNull()
  })
})