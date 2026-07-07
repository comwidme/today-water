import { beforeEach, describe, expect, it, vi } from 'vitest'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { STORAGE_KEY } from '../utils/storage'
import { renderApp } from '../test/renderWithProviders'

describe('AddPlantPage', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-07-07T12:00:00'))
  })

  it('shows top5 preset cards', () => {
    renderApp('/add')
    expect(screen.getByText('몬스테라')).toBeInTheDocument()
    expect(screen.getByText('스투키')).toBeInTheDocument()
    expect(screen.getByText('행운목')).toBeInTheDocument()
  })

  it('shows validation errors when submitting empty form', async () => {
    vi.useRealTimers()
    const user = userEvent.setup()
    renderApp('/add')

    await user.click(screen.getByRole('button', { name: '등록하기' }))

    expect(screen.getByText('식물을 선택해주세요.')).toBeInTheDocument()
    expect(screen.getByText('식물 별명을 입력해주세요.')).toBeInTheDocument()
  })

  it('shows preset info after selecting a plant', async () => {
    vi.useRealTimers()
    const user = userEvent.setup()
    renderApp('/add')

    await user.click(screen.getByRole('button', { name: /몬스테라/ }))

    expect(screen.getByText('물주기: 7일')).toBeInTheDocument()
    expect(screen.getByText('물주는 양: 보통')).toBeInTheDocument()
  })

  it('saves plant to localStorage and navigates home', async () => {
    vi.useRealTimers()
    const user = userEvent.setup()
    renderApp('/add')

    await user.click(screen.getByRole('button', { name: /몬스테라/ }))
    await user.type(screen.getByLabelText('식물 별명'), '거실 몬스테라')
    await user.click(screen.getByRole('button', { name: '등록하기' }))

    await waitFor(() => {
      expect(screen.getByText('거실 몬스테라')).toBeInTheDocument()
    })

    const storage = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '{}')
    expect(storage.plants).toHaveLength(1)
    expect(storage.plants[0].nickname).toBe('거실 몬스테라')
  })
})
