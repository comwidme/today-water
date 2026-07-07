import type { PlantPreset } from '../types/plant'
import { PlantImage } from './PlantImage'

type PlantPresetCardProps = {
  preset: PlantPreset
  selected: boolean
  onSelect: (preset: PlantPreset) => void
}

export const PlantPresetCard = ({
  preset,
  selected,
  onSelect,
}: PlantPresetCardProps) => (
  <button
    type="button"
    onClick={() => onSelect(preset)}
    className={`min-w-[140px] shrink-0 rounded-2xl border p-3 text-left transition ${
      selected
        ? 'border-emerald-600 bg-emerald-50 ring-2 ring-emerald-600'
        : 'border-gray-200 bg-white hover:border-emerald-300'
    }`}
  >
    <PlantImage
      src={preset.imageUrl}
      alt={preset.plantName}
      className="mb-2 h-24 w-full rounded-xl"
    />
    <p className="font-medium text-gray-900">{preset.plantName}</p>
    <p className="text-xs text-gray-500">{preset.defaultWateringCycle}일 주기</p>
  </button>
)
