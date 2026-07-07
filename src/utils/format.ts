const pad = (value: number): string => String(value).padStart(2, '0')

export const formatLogDateTime = (isoString: string): string => {
  const date = new Date(isoString)
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}`
}

export const STATUS_LABELS = {
  overdue: '물주기 지연',
  today: '오늘 물주기',
  upcoming: '예정',
} as const
