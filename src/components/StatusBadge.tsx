import type { WateringStatus } from '../types/plant'
import { STATUS_LABELS } from '../utils/format'

const STATUS_STYLES: Record<WateringStatus, string> = {
  overdue: 'bg-red-100 text-red-700',
  today: 'bg-emerald-100 text-emerald-700',
  upcoming: 'bg-gray-100 text-gray-600',
}

type StatusBadgeProps = {
  status: WateringStatus
}

export const StatusBadge = ({ status }: StatusBadgeProps) => (
  <span
    className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${STATUS_STYLES[status]}`}
  >
    {STATUS_LABELS[status]}
  </span>
)
