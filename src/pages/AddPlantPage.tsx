import { useEffect, useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { usePlants } from '../context/PlantContext'
import { NavigationGuard } from '../components/NavigationGuard'
import { AppLayout, PageHeader } from '../components/Layout'
import { PlantPresetCard } from '../components/PlantPresetCard'
import { PLANT_PRESETS } from '../data/plantPresets'
import type { PlantPreset } from '../types/plant'
import { getTodayDateString } from '../utils/date'
import { hasFormErrors, validateAddPlantForm } from '../utils/validation'

export function AddPlantPage() {
  const navigate = useNavigate()
  const { addPlant } = usePlants()
  const today = getTodayDateString()

  const [selectedPreset, setSelectedPreset] = useState<PlantPreset | null>(null)
  const [nickname, setNickname] = useState('')
  const [lastWateredAt, setLastWateredAt] = useState(today)
  const [errors, setErrors] = useState<ReturnType<typeof validateAddPlantForm>>({})
  const [guardOpen, setGuardOpen] = useState(false)

  const isDirty = nickname.trim().length > 0 || lastWateredAt !== today

  const handleBack = () => {
    if (isDirty) {
      setGuardOpen(true)
      return
    }
    navigate('/')
  }

  useEffect(() => {
    const handlePopState = () => {
      if (isDirty) {
        window.history.pushState(null, '', window.location.href)
        setGuardOpen(true)
      }
    }

    window.history.pushState(null, '', window.location.href)
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [isDirty])

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    const nextErrors = validateAddPlantForm({ selectedPreset, nickname, lastWateredAt })
    setErrors(nextErrors)
    if (hasFormErrors(nextErrors) || !selectedPreset) return

    addPlant(selectedPreset, nickname, lastWateredAt)
    navigate('/')
  }

  return (
    <AppLayout>
      <PageHeader title="식물 등록" onBack={handleBack} />

      <form onSubmit={handleSubmit} className="space-y-6 px-4 py-6">
        <section>
          <h2 className="mb-3 text-sm font-medium text-gray-700">인기 식물 Top5</h2>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {PLANT_PRESETS.map((preset) => (
              <PlantPresetCard
                key={preset.plantTypeId}
                preset={preset}
                selected={selectedPreset?.plantTypeId === preset.plantTypeId}
                onSelect={setSelectedPreset}
              />
            ))}
          </div>
          {errors.preset ? (
            <p className="mt-2 text-sm text-red-600">{errors.preset}</p>
          ) : null}
        </section>

        {selectedPreset ? (
          <section className="rounded-2xl bg-white p-4 text-sm text-gray-600 shadow-sm">
            <p>물주기: {selectedPreset.defaultWateringCycle}일</p>
            <p>물주는 양: {selectedPreset.waterAmount}</p>
            <p>물주는 방식: {selectedPreset.wateringMethod}</p>
          </section>
        ) : null}

        <section>
          <label htmlFor="nickname" className="mb-2 block text-sm font-medium text-gray-700">
            식물 별명
          </label>
          <input
            id="nickname"
            type="text"
            value={nickname}
            onChange={(event) => setNickname(event.target.value)}
            placeholder="예: 거실 몬스테라"
            className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
          />
          {errors.nickname ? (
            <p className="mt-2 text-sm text-red-600">{errors.nickname}</p>
          ) : null}
        </section>

        <section>
          <label
            htmlFor="lastWateredAt"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            마지막 물 준 날짜
          </label>
          <input
            id="lastWateredAt"
            type="date"
            value={lastWateredAt}
            max={today}
            onChange={(event) => setLastWateredAt(event.target.value)}
            className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
          />
          {errors.lastWateredAt ? (
            <p className="mt-2 text-sm text-red-600">{errors.lastWateredAt}</p>
          ) : null}
        </section>

        <button
          type="submit"
          className="w-full rounded-xl bg-emerald-700 px-4 py-3 text-sm font-medium text-white transition hover:bg-emerald-800"
        >
          등록하기
        </button>
      </form>

      <NavigationGuard
        open={guardOpen}
        onCancel={() => setGuardOpen(false)}
        onConfirm={() => navigate('/')}
      />
    </AppLayout>
  )
}
