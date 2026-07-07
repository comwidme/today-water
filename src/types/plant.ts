export type WaterAmount = '적게' | '보통' | '충분히'

export type Difficulty = '쉬움' | '보통' | '어려움'

export type WateringStatus = 'overdue' | 'today' | 'upcoming'

export type PlantPreset = {
  plantTypeId: string
  plantName: string
  imageUrl: string
  defaultWateringCycle: number
  waterAmount: WaterAmount
  wateringMethod: string
  lightCondition: string
  difficulty: Difficulty
  careTip: string
  caution: string
}

export type WateringLog = {
  id: string
  wateredAt: string
  createdAt: string
}

export type UserPlant = {
  id: string
  plantTypeId: string
  plantName: string
  nickname: string
  imageUrl: string
  wateringCycle: number
  waterAmount: WaterAmount
  wateringMethod: string
  lightCondition: string
  difficulty: Difficulty
  careTip: string
  caution: string
  lastWateredAt: string
  nextWateringAt: string
  createdAt: string
  updatedAt: string
  wateringLogs: WateringLog[]
}

export type AppStorage = {
  version: 1
  plants: UserPlant[]
}
