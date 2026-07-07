import type { PlantPreset, UserPlant } from '../types/plant'
import { calculateNextWateringDate, getTodayDateString } from './date'
import { createId } from './id'

type CreateUserPlantParams = {
  preset: PlantPreset
  nickname: string
  lastWateredAt: string
}

export const createUserPlant = ({
  preset,
  nickname,
  lastWateredAt,
}: CreateUserPlantParams): UserPlant => {
  const now = new Date().toISOString()

  return {
    id: createId('plant'),
    plantTypeId: preset.plantTypeId,
    plantName: preset.plantName,
    nickname,
    imageUrl: preset.imageUrl,
    wateringCycle: preset.defaultWateringCycle,
    waterAmount: preset.waterAmount,
    wateringMethod: preset.wateringMethod,
    lightCondition: preset.lightCondition,
    difficulty: preset.difficulty,
    careTip: preset.careTip,
    caution: preset.caution,
    lastWateredAt,
    nextWateringAt: calculateNextWateringDate(
      lastWateredAt,
      preset.defaultWateringCycle,
    ),
    createdAt: now,
    updatedAt: now,
    wateringLogs: [],
  }
}

export const completeWatering = (
  plant: UserPlant,
  today = getTodayDateString(),
): UserPlant => {
  const now = new Date().toISOString()

  return {
    ...plant,
    lastWateredAt: today,
    nextWateringAt: calculateNextWateringDate(today, plant.wateringCycle),
    updatedAt: now,
    wateringLogs: [
      {
        id: createId('log'),
        wateredAt: today,
        createdAt: now,
      },
      ...plant.wateringLogs,
    ],
  }
}

type UpdateUserPlantParams = {
  nickname: string
  lastWateredAt: string
}

export const updateUserPlant = (
  plant: UserPlant,
  { nickname, lastWateredAt }: UpdateUserPlantParams,
): UserPlant => ({
  ...plant,
  nickname: nickname.trim(),
  lastWateredAt,
  nextWateringAt: calculateNextWateringDate(lastWateredAt, plant.wateringCycle),
  updatedAt: new Date().toISOString(),
})
