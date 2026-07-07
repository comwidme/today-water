import { beforeEach, describe, expect, it } from 'vitest'
import {
  DEFAULT_STORAGE,
  STORAGE_KEY,
  loadAppStorage,
  parseAppStorage,
  saveAppStorage,
} from './storage'

describe('storage utils', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('returns default storage when localStorage is empty', () => {
    expect(loadAppStorage()).toEqual(DEFAULT_STORAGE)
  })

  it('parses valid storage JSON', () => {
    const storage = { version: 1 as const, plants: [] }
    expect(parseAppStorage(JSON.stringify(storage))).toEqual(storage)
  })

  it('falls back to default storage on invalid JSON', () => {
    expect(parseAppStorage('{invalid')).toEqual(DEFAULT_STORAGE)
  })

  it('falls back to default storage on version mismatch', () => {
    expect(parseAppStorage(JSON.stringify({ version: 2, plants: [] }))).toEqual(
      DEFAULT_STORAGE,
    )
  })

  it('persists storage to localStorage', () => {
    const storage = { version: 1 as const, plants: [] }
    saveAppStorage(storage)
    expect(localStorage.getItem(STORAGE_KEY)).toBe(JSON.stringify(storage))
  })
})
