import type { AppStorage, UserPlant } from '../types/plant'

export const addPlantToStorage = (
  storage: AppStorage,
  plant: UserPlant,
): AppStorage => ({
  ...storage,
  plants: [...storage.plants, plant],
})

export const updatePlantInStorage = (
  storage: AppStorage,
  plant: UserPlant,
): AppStorage => ({
  ...storage,
  plants: storage.plants.map((item) => (item.id === plant.id ? plant : item)),
})

export const removePlantFromStorage = (
  storage: AppStorage,
  plantId: string,
): AppStorage => ({
  ...storage,
  plants: storage.plants.filter((item) => item.id !== plantId),
})

export const findPlantById = (
  storage: AppStorage,
  plantId: string,
): UserPlant | undefined =>
  storage.plants.find((plant) => plant.id === plantId)
