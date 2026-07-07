import { beforeEach, describe, expect, it, vi } from 'vitest'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { PLANT_PRESETS } from '../data/plantPresets'
import { createUserPlant } from '../utils/plant'
import { STORAGE_KEY, saveAppStorage } from '../utils/storage'
import { renderApp } from '../test/renderWithProviders'

describe('EditPlantPage', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-07-07T12:00:00'))
  })

  it('updates plant info and returns to detail page', async () => {
    vi.useRealTimers()
    const user = userEvent.setup()
    const plant = createUserPlant({
      preset: PLANT_PRESETS[0],
      nickname: '거실 몬스테라',
      lastWateredAt: '2026-07-01',
    })
    saveAppStorage({ version: 1, plants: [plant] })

    renderApp(`/plants/${plant.id}/edit`)

    const nicknameInput = screen.getByLabelText('식물 별명')
    await user.clear(nicknameInput)
    await user.type(nicknameInput, '베란다 몬스테라')
    await user.click(screen.getByRole('button', { name: '저장하기' }))

    await waitFor(() => {
      expect(screen.getAllByText('베란다 몬스테라').length).toBeGreaterThan(0)
    })

    const storage = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '{}')
    expect(storage.plants[0].nickname).toBe('베란다 몬스테라')
  })

  it('shows edit link on detail page', async () => {
    vi.useRealTimers()
    const plant = createUserPlant({
      preset: PLANT_PRESETS[0],
      nickname: '거실 몬스테라',
      lastWateredAt: '2026-07-01',
    })
    saveAppStorage({ version: 1, plants: [plant] })

    renderApp(`/plants/${plant.id}`)

    expect(screen.getByRole('link', { name: '정보 수정' })).toHaveAttribute(
      'href',
      `/plants/${plant.id}/edit`,
    )
  })
})
