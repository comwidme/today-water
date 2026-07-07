import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { PlantPreset, UserPlant } from '../types/plant'
import { completeWatering, createUserPlant, updateUserPlant } from '../utils/plant'
import {
  addPlantToStorage,
  removePlantFromStorage,
  updatePlantInStorage,
} from '../utils/storageHelpers'
import { loadAppStorage, saveAppStorage } from '../utils/storage'

type PlantContextValue = {
  plants: UserPlant[]
  addPlant: (
    preset: PlantPreset,
    nickname: string,
    lastWateredAt: string,
  ) => UserPlant
  completeWateringForPlant: (plantId: string) => UserPlant | null
  restorePlant: (previousPlant: UserPlant) => void
  deletePlant: (plantId: string) => void
  updatePlant: (
    plantId: string,
    input: { nickname: string; lastWateredAt: string },
  ) => UserPlant | null
  getPlantById: (plantId: string) => UserPlant | undefined
}

const PlantContext = createContext<PlantContextValue | null>(null)

export const PlantProvider = ({ children }: { children: ReactNode }) => {
  const [plants, setPlants] = useState<UserPlant[]>(() => loadAppStorage().plants)

  const persist = useCallback((nextPlants: UserPlant[]) => {
    setPlants(nextPlants)
    saveAppStorage({ version: 1, plants: nextPlants })
  }, [])

  const addPlant = useCallback(
    (preset: PlantPreset, nickname: string, lastWateredAt: string) => {
      const plant = createUserPlant({ preset, nickname: nickname.trim(), lastWateredAt })
      const storage = addPlantToStorage(loadAppStorage(), plant)
      persist(storage.plants)
      return plant
    },
    [persist],
  )

  const completeWateringForPlant = useCallback(
    (plantId: string) => {
      const storage = loadAppStorage()
      const plant = storage.plants.find((item) => item.id === plantId)
      if (!plant) return null

      const updated = completeWatering(plant)
      persist(updatePlantInStorage(storage, updated).plants)
      return plant
    },
    [persist],
  )

  const restorePlant = useCallback(
    (previousPlant: UserPlant) => {
      const storage = loadAppStorage()
      persist(updatePlantInStorage(storage, previousPlant).plants)
    },
    [persist],
  )

  const deletePlant = useCallback(
    (plantId: string) => {
      const storage = loadAppStorage()
      persist(removePlantFromStorage(storage, plantId).plants)
    },
    [persist],
  )

  const updatePlant = useCallback(
    (plantId: string, input: { nickname: string; lastWateredAt: string }) => {
      const storage = loadAppStorage()
      const plant = storage.plants.find((item) => item.id === plantId)
      if (!plant) return null

      const updated = updateUserPlant(plant, input)
      persist(updatePlantInStorage(storage, updated).plants)
      return updated
    },
    [persist],
  )

  const getPlantById = useCallback(
    (plantId: string) => plants.find((plant) => plant.id === plantId),
    [plants],
  )

  const value = useMemo(
    () => ({
      plants,
      addPlant,
      completeWateringForPlant,
      restorePlant,
      deletePlant,
      updatePlant,
      getPlantById,
    }),
    [plants, addPlant, completeWateringForPlant, restorePlant, deletePlant, updatePlant, getPlantById],
  )

  return <PlantContext.Provider value={value}>{children}</PlantContext.Provider>
}

export const usePlants = (): PlantContextValue => {
  const context = useContext(PlantContext)
  if (!context) {
    throw new Error('usePlants must be used within PlantProvider')
  }
  return context
}
