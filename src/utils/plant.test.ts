import { beforeEach, afterEach, describe, expect, it, vi } from 'vitest'
import { PLANT_PRESETS } from '../data/plantPresets'
import { completeWatering, createUserPlant, updateUserPlant } from './plant'

const preset = PLANT_PRESETS[0]
const today = '2026-07-07'

describe('plant utils', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-07-07T12:00:00'))
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('creates a user plant from preset and user input', () => {
    const plant = createUserPlant({
      preset,
      nickname: '거실 몬스테라',
      lastWateredAt: '2026-07-01',
    })

    expect(plant.plantName).toBe('몬스테라')
    expect(plant.imageUrl).toBe('/images/plants/monstera.jpg')
    expect(plant.wateringCycle).toBe(7)
    expect(plant.nickname).toBe('거실 몬스테라')
    expect(plant.lastWateredAt).toBe('2026-07-01')
    expect(plant.nextWateringAt).toBe('2026-07-08')
    expect(plant.wateringLogs).toEqual([])
    expect(plant.createdAt).toBeTruthy()
    expect(plant.updatedAt).toBeTruthy()
  })

  it('completes watering and prepends a log entry', () => {
    const plant = createUserPlant({
      preset,
      nickname: '거실 몬스테라',
      lastWateredAt: '2026-07-01',
    })

    const updated = completeWatering(plant, today)

    expect(updated.lastWateredAt).toBe(today)
    expect(updated.nextWateringAt).toBe('2026-07-14')
    expect(updated.wateringLogs).toHaveLength(1)
    expect(updated.wateringLogs[0].wateredAt).toBe(today)
  })

  it('updates nickname and recalculates next watering date', () => {
    const plant = createUserPlant({
      preset,
      nickname: '거실 몬스테라',
      lastWateredAt: '2026-07-01',
    })

    const updated = updateUserPlant(plant, {
      nickname: '베란다 몬스테라',
      lastWateredAt: '2026-07-05',
    })

    expect(updated.nickname).toBe('베란다 몬스테라')
    expect(updated.lastWateredAt).toBe('2026-07-05')
    expect(updated.nextWateringAt).toBe('2026-07-12')
    expect(updated.wateringLogs).toEqual(plant.wateringLogs)
    expect(updated.id).toBe(plant.id)
  })
})
