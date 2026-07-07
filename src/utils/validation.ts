import type { PlantPreset } from '../types/plant'
import { getTodayDateString } from './date'

export type AddPlantFormInput = {
  selectedPreset: PlantPreset | null
  nickname: string
  lastWateredAt: string
}

export type AddPlantFormField = 'preset' | 'nickname' | 'lastWateredAt'

export type AddPlantFormErrors = Partial<Record<AddPlantFormField, string>>

export const validateAddPlantForm = (
  input: AddPlantFormInput,
  today = getTodayDateString(),
): AddPlantFormErrors => {
  const errors: AddPlantFormErrors = {}

  if (!input.selectedPreset) {
    errors.preset = '식물을 선택해주세요.'
  }

  if (!input.nickname.trim()) {
    errors.nickname = '식물 별명을 입력해주세요.'
  }

  if (!input.lastWateredAt) {
    errors.lastWateredAt = '마지막 물 준 날짜를 입력해주세요.'
  } else if (input.lastWateredAt > today) {
    errors.lastWateredAt = '마지막 물 준 날짜는 오늘 이후일 수 없어요.'
  }

  return errors
}

export const hasFormErrors = (errors: AddPlantFormErrors): boolean =>
  Object.keys(errors).length > 0

export type EditPlantFormInput = {
  nickname: string
  lastWateredAt: string
}

export type EditPlantFormField = 'nickname' | 'lastWateredAt'

export type EditPlantFormErrors = Partial<Record<EditPlantFormField, string>>

export const validateEditPlantForm = (
  input: EditPlantFormInput,
  today = getTodayDateString(),
): EditPlantFormErrors => {
  const errors: EditPlantFormErrors = {}

  if (!input.nickname.trim()) {
    errors.nickname = '식물 별명을 입력해주세요.'
  }

  if (!input.lastWateredAt) {
    errors.lastWateredAt = '마지막 물 준 날짜를 입력해주세요.'
  } else if (input.lastWateredAt > today) {
    errors.lastWateredAt = '마지막 물 준 날짜는 오늘 이후일 수 없어요.'
  }

  return errors
}

export const hasEditFormErrors = (errors: EditPlantFormErrors): boolean =>
  Object.keys(errors).length > 0
