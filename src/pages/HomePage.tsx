import { Link } from 'react-router-dom'
import { usePlants } from '../context/PlantContext'
import { useToast } from '../context/ToastContext'
import { EmptyState } from '../components/EmptyState'
import { AppLayout } from '../components/Layout'
import { PlantCard } from '../components/PlantCard'
import { getTodayDateString, getWateringStatus } from '../utils/date'

export function HomePage() {
  const { plants, completeWateringForPlant, restorePlant } = usePlants()
  const { showToast } = useToast()
  const today = getTodayDateString()

  const todayCount = plants.filter(
    (plant) => getWateringStatus(plant.nextWateringAt, today) === 'today',
  ).length
  const overdueCount = plants.filter(
    (plant) => getWateringStatus(plant.nextWateringAt, today) === 'overdue',
  ).length

  const handleComplete = (plantId: string) => {
    const previousPlant = completeWateringForPlant(plantId)
    if (!previousPlant) return

    showToast('물주기 완료 기록이 추가되었습니다.', {
      onUndo: () => restorePlant(previousPlant),
    })
  }

  return (
    <AppLayout>
      <header className="border-b border-gray-100 bg-white px-4 py-6">
        <h1 className="text-2xl font-bold text-emerald-900">오늘물줘</h1>
        <p className="mt-1 text-sm text-gray-500">{today}</p>
        {plants.length > 0 ? (
          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="rounded-xl bg-emerald-50 px-4 py-3">
              <p className="text-xs text-emerald-700">오늘 물 줄 식물</p>
              <p className="text-2xl font-bold text-emerald-900">{todayCount}</p>
            </div>
            <div className="rounded-xl bg-red-50 px-4 py-3">
              <p className="text-xs text-red-700">물주기 지연</p>
              <p className="text-2xl font-bold text-red-900">{overdueCount}</p>
            </div>
          </div>
        ) : null}
      </header>

      <main className="px-4 py-6 pb-24">
        {plants.length === 0 ? (
          <EmptyState
            title="등록된 식물이 없습니다."
            description="첫 식물을 등록해보세요!"
          />
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {plants.map((plant) => (
              <PlantCard key={plant.id} plant={plant} onComplete={handleComplete} />
            ))}
          </div>
        )}
      </main>

      <Link
        to="/add"
        className="fixed bottom-6 right-6 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-700 text-2xl text-white shadow-lg transition hover:bg-emerald-800 md:right-[calc(50%-28rem)] lg:right-[calc(50%-32rem)]"
        aria-label="식물 등록"
      >
        +
      </Link>
    </AppLayout>
  )
}
