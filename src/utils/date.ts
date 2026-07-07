import type { WateringStatus } from '../types/plant'

const pad = (value: number): string => String(value).padStart(2, '0')

export const formatDateString = (date: Date): string =>
  `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`

export const getTodayDateString = (): string => formatDateString(new Date())

export const calculateNextWateringDate = (
  lastWateredAt: string,
  wateringCycle: number,
): string => {
  const [year, month, day] = lastWateredAt.split('-').map(Number)
  const nextDate = new Date(year, month - 1, day)
  nextDate.setDate(nextDate.getDate() + wateringCycle)
  return formatDateString(nextDate)
}

export const getWateringStatus = (
  nextWateringAt: string,
  today = getTodayDateString(),
): WateringStatus => {
  if (nextWateringAt < today) return 'overdue'
  if (nextWateringAt === today) return 'today'
  return 'upcoming'
}
