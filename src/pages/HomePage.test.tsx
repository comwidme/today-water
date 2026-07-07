import { beforeEach, describe, expect, it, vi } from 'vitest'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { PLANT_PRESETS } from '../data/plantPresets'
import { createUserPlant } from '../utils/plant'
import { STORAGE_KEY, saveAppStorage } from '../utils/storage'
import { renderWithProviders } from '../test/renderWithProviders'
import { HomePage } from './HomePage'

describe('HomePage', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-07-07T12:00:00'))
  })

  it('shows empty state when no plants are registered', () => {
    renderWithProviders(<HomePage />)
    expect(screen.getByText('등록된 식물이 없습니다.')).toBeInTheDocument()
  })

  it('shows plant cards and status badges', () => {
    const plant = createUserPlant({
      preset: PLANT_PRESETS[0],
      nickname: '거실 몬스테라',
      lastWateredAt: '2026-06-30',
    })
    saveAppStorage({ version: 1, plants: [plant] })

    renderWithProviders(<HomePage />)

    expect(screen.getByText('거실 몬스테라')).toBeInTheDocument()
    expect(screen.getByText('오늘 물주기')).toBeInTheDocument()
  })

  it('updates plant after completing watering', async () => {
    vi.useRealTimers()
    const user = userEvent.setup()
    const plant = createUserPlant({
      preset: PLANT_PRESETS[0],
      nickname: '거실 몬스테라',
      lastWateredAt: '2026-06-20',
    })
    saveAppStorage({ version: 1, plants: [plant] })

    renderWithProviders(<HomePage />)

    expect(screen.getAllByText('물주기 지연').length).toBeGreaterThan(0)
    await user.click(screen.getByRole('button', { name: '물주기 완료' }))
    expect(screen.getByText('예정')).toBeInTheDocument()
    expect(JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '{}').plants[0].wateringLogs).toHaveLength(1)
  })
})
