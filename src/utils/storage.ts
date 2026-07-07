import type { AppStorage } from '../types/plant'

export const STORAGE_KEY = 'today-water-plants'

export const DEFAULT_STORAGE: AppStorage = {
  version: 1,
  plants: [],
}

export const parseAppStorage = (raw: string | null): AppStorage => {
  if (!raw) return DEFAULT_STORAGE

  try {
    const parsed = JSON.parse(raw) as AppStorage
    if (parsed.version !== 1 || !Array.isArray(parsed.plants)) {
      return DEFAULT_STORAGE
    }
    return parsed
  } catch {
    return DEFAULT_STORAGE
  }
}

export const loadAppStorage = (): AppStorage =>
  parseAppStorage(localStorage.getItem(STORAGE_KEY))

export const saveAppStorage = (storage: AppStorage): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(storage))
}

export const clearAppStorage = (): void => {
  localStorage.removeItem(STORAGE_KEY)
}
