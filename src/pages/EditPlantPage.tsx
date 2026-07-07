import { useEffect, useState, type FormEvent } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { usePlants } from '../context/PlantContext'
import { useToast } from '../context/ToastContext'
import { NavigationGuard } from '../components/NavigationGuard'
import { AppLayout, PageHeader } from '../components/Layout'
import { PlantImage } from '../components/PlantImage'
import type { UserPlant } from '../types/plant'
import { getTodayDateString } from '../utils/date'
import {
  hasEditFormErrors,
  validateEditPlantForm,
} from '../utils/validation'

type EditPlantFormProps = {
  plant: UserPlant
  plantId: string
}

const EditPlantForm = ({ plant, plantId }: EditPlantFormProps) => {
  const navigate = useNavigate()
  const { updatePlant } = usePlants()
  const { showToast } = useToast()
  const today = getTodayDateString()

  const [nickname, setNickname] = useState(plant.nickname)
  const [lastWateredAt, setLastWateredAt] = useState(plant.lastWateredAt)
  const [errors, setErrors] = useState<ReturnType<typeof validateEditPlantForm>>({})
  const [guardOpen, setGuardOpen] = useState(false)

  const isDirty =
    nickname.trim() !== plant.nickname || lastWateredAt !== plant.lastWateredAt

  const handleBack = () => {
    if (isDirty) {
      setGuardOpen(true)
      return
    }
    navigate(`/plants/${plantId}`)
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
    const nextErrors = validateEditPlantForm({ nickname, lastWateredAt })
    setErrors(nextErrors)
    if (hasEditFormErrors(nextErrors)) return

    updatePlant(plantId, { nickname, lastWateredAt })
    showToast('식물 정보가 수정되었습니다.')
    navigate(`/plants/${plantId}`)
  }

  return (
    <AppLayout>
      <PageHeader title="식물 정보 수정" onBack={handleBack} />

      <form onSubmit={handleSubmit} className="space-y-6 px-4 py-6">
        <section className="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-sm">
          <PlantImage
            src={plant.imageUrl}
            alt={plant.plantName}
            className="h-20 w-20 shrink-0 rounded-xl"
          />
          <div>
            <p className="text-sm text-gray-500">식물 종류</p>
            <p className="font-semibold text-gray-900">{plant.plantName}</p>
            <p className="mt-1 text-xs text-gray-500">
              물주기 {plant.wateringCycle}일 · {plant.waterAmount}
            </p>
          </div>
        </section>

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
          <p className="mt-2 text-xs text-gray-500">
            저장 시 다음 물주기 날짜가 자동으로 다시 계산됩니다.
          </p>
        </section>

        <button
          type="submit"
          className="w-full rounded-xl bg-emerald-700 px-4 py-3 text-sm font-medium text-white transition hover:bg-emerald-800"
        >
          저장하기
        </button>
      </form>

      <NavigationGuard
        open={guardOpen}
        onCancel={() => setGuardOpen(false)}
        onConfirm={() => navigate(`/plants/${plantId}`)}
      />
    </AppLayout>
  )
}

export function EditPlantPage() {
  const { plantId } = useParams()
  const navigate = useNavigate()
  const { getPlantById } = usePlants()
  const { showToast } = useToast()

  const plant = plantId ? getPlantById(plantId) : undefined

  useEffect(() => {
    if (plantId && !plant) {
      showToast('존재하지 않는 식물입니다.')
      navigate('/', { replace: true })
    }
  }, [plant, plantId, navigate, showToast])

  if (!plant || !plantId) return null

  return <EditPlantForm key={plant.id} plant={plant} plantId={plantId} />
}
