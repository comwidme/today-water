import { describe, expect, it } from 'vitest'
import {
  calculateNextWateringDate,
  formatDateString,
  getWateringStatus,
} from './date'

describe('date utils', () => {
  const today = '2026-07-07'

  it('formats dates as YYYY-MM-DD', () => {
    expect(formatDateString(new Date(2026, 6, 7))).toBe('2026-07-07')
  })

  it('calculates next watering date from last watered date and cycle', () => {
    expect(calculateNextWateringDate('2026-07-01', 7)).toBe('2026-07-08')
    expect(calculateNextWateringDate('2026-06-24', 14)).toBe('2026-07-08')
    expect(calculateNextWateringDate('2026-07-28', 7)).toBe('2026-08-04')
    expect(calculateNextWateringDate('2026-12-30', 7)).toBe('2027-01-06')
  })

  it('derives watering status from next watering date', () => {
    expect(getWateringStatus('2026-07-06', today)).toBe('overdue')
    expect(getWateringStatus('2026-07-07', today)).toBe('today')
    expect(getWateringStatus('2026-07-08', today)).toBe('upcoming')
  })
})
