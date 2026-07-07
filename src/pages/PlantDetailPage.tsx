import { useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { usePlants } from '../context/PlantContext'
import { useToast } from '../context/ToastContext'
import { EmptyState } from '../components/EmptyState'
import { AppLayout, PageHeader } from '../components/Layout'
import { PlantImage } from '../components/PlantImage'
import { StatusBadge } from '../components/StatusBadge'
import { getWateringStatus } from '../utils/date'
import { formatLogDateTime } from '../utils/format'

export function PlantDetailPage() {
  const { plantId } = useParams()
  const navigate = useNavigate()
  const { getPlantById, completeWateringForPlant, restorePlant, deletePlant } =
    usePlants()
  const { showToast } = useToast()

  const plant = plantId ? getPlantById(plantId) : undefined

  useEffect(() => {
    if (plantId && !plant) {
      showToast('존재하지 않는 식물입니다.')
      navigate('/', { replace: true })
    }
  }, [plant, plantId, navigate, showToast])

  if (!plant) return null

  const status = getWateringStatus(plant.nextWateringAt)

  const handleComplete = () => {
    const previousPlant = completeWateringForPlant(plant.id)
    if (!previousPlant) return

    showToast('물주기 완료 기록이 추가되었습니다.', {
      onUndo: () => restorePlant(previousPlant),
    })
  }

  const handleDelete = () => {
    if (!window.confirm('정말 삭제하시겠습니까?')) return
    deletePlant(plant.id)
    navigate('/')
  }

  const metaItems = [
    { label: '관리 난이도', value: plant.difficulty },
    { label: '물주기 주기', value: `${plant.wateringCycle}일` },
    { label: '물주는 양', value: plant.waterAmount },
    { label: '물주는 방식', value: plant.wateringMethod },
    { label: '빛 조건', value: plant.lightCondition },
  ]

  return (
    <AppLayout>
      <PageHeader title={plant.nickname} backTo="/" />

      <main className="space-y-6 px-4 py-6 pb-8">
        <section className="overflow-hidden rounded-2xl bg-white shadow-sm">
          <PlantImage
            src={plant.imageUrl}
            alt={plant.nickname}
            className="h-48 w-full md:h-64"
          />
          <div className="space-y-2 p-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm text-gray-500">{plant.plantName}</p>
                <h2 className="text-xl font-semibold text-gray-900">{plant.nickname}</h2>
              </div>
              <StatusBadge status={status} />
            </div>
            <p className="text-sm text-gray-600">
              다음 물주기:{' '}
              <span className="font-medium text-gray-900">{plant.nextWateringAt}</span>
            </p>
          </div>
        </section>

        <section className="grid grid-cols-2 gap-3">
          {metaItems.map((item) => (
            <div key={item.label} className="rounded-xl bg-white p-3 shadow-sm">
              <p className="text-xs text-gray-500">{item.label}</p>
              <p className="mt-1 text-sm font-medium text-gray-900">{item.value}</p>
            </div>
          ))}
        </section>

        <section className="rounded-2xl bg-white p-4 shadow-sm">
          <h3 className="font-medium text-gray-900">관리 팁</h3>
          <p className="mt-2 text-sm leading-relaxed text-gray-600">{plant.careTip}</p>
        </section>

        <section className="rounded-2xl border border-red-100 bg-red-50 p-4">
          <h3 className="font-medium text-red-800">⚠ 주의사항</h3>
          <p className="mt-2 text-sm leading-relaxed text-red-700">{plant.caution}</p>
        </section>

        <section>
          <h3 className="mb-3 font-medium text-gray-900">물주기 기록</h3>
          {plant.wateringLogs.length === 0 ? (
            <EmptyState title="아직 물주기 기록이 없습니다." />
          ) : (
            <ul className="space-y-3">
              {plant.wateringLogs.map((log) => (
                <li
                  key={log.id}
                  className="flex items-start gap-3 rounded-xl bg-white p-4 shadow-sm"
                >
                  <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-emerald-500" />
                  <div>
                    <p className="font-medium text-gray-900">{log.wateredAt}</p>
                    <p className="text-sm text-gray-500">
                      {formatLogDateTime(log.createdAt)}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>

        <div className="grid gap-3 sm:grid-cols-3">
          <button
            type="button"
            onClick={handleComplete}
            className="rounded-xl bg-emerald-700 px-4 py-3 text-sm font-medium text-white transition hover:bg-emerald-800"
          >
            물주기 완료
          </button>
          <Link
            to={`/plants/${plant.id}/edit`}
            className="rounded-xl border border-emerald-200 bg-white px-4 py-3 text-center text-sm font-medium text-emerald-700 transition hover:bg-emerald-50"
          >
            정보 수정
          </Link>
          <button
            type="button"
            onClick={handleDelete}
            className="rounded-xl border border-red-200 bg-white px-4 py-3 text-sm font-medium text-red-600 transition hover:bg-red-50"
          >
            식물 삭제
          </button>
        </div>
      </main>
    </AppLayout>
  )
}
