import { Link } from 'react-router-dom'
import type { UserPlant } from '../types/plant'
import { getWateringStatus } from '../utils/date'
import { PlantImage } from './PlantImage'
import { StatusBadge } from './StatusBadge'

type PlantCardProps = {
  plant: UserPlant
  onComplete: (plantId: string) => void
}

export const PlantCard = ({ plant, onComplete }: PlantCardProps) => {
  const status = getWateringStatus(plant.nextWateringAt)

  return (
    <article className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      <Link
        to={`/plants/${plant.id}`}
        className="flex gap-4 p-4 transition hover:bg-gray-50"
      >
        <PlantImage
          src={plant.imageUrl}
          alt={plant.nickname}
          className="h-20 w-20 shrink-0 rounded-xl"
        />
        <div className="min-w-0 flex-1 text-left">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="truncate font-semibold text-gray-900">{plant.nickname}</h3>
              <p className="text-sm text-gray-500">{plant.plantName}</p>
            </div>
            <StatusBadge status={status} />
          </div>
          <p className="mt-2 text-sm text-gray-600">
            다음 물주기: <span className="font-medium">{plant.nextWateringAt}</span>
          </p>
        </div>
      </Link>
      <div className="border-t border-gray-100 px-4 py-3">
        <button
          type="button"
          onClick={() => onComplete(plant.id)}
          className="w-full rounded-xl bg-emerald-700 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-emerald-800"
        >
          물주기 완료
        </button>
      </div>
    </article>
  )
}
