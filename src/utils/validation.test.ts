import { describe, expect, it } from 'vitest'
import { PLANT_PRESETS } from '../data/plantPresets'
import { hasEditFormErrors, hasFormErrors, validateAddPlantForm, validateEditPlantForm } from './validation'

const preset = PLANT_PRESETS[0]
const today = '2026-07-07'

describe('validateAddPlantForm', () => {
  it('returns preset error when no plant is selected', () => {
    const errors = validateAddPlantForm(
      { selectedPreset: null, nickname: '별명', lastWateredAt: today },
      today,
    )
    expect(errors.preset).toBe('식물을 선택해주세요.')
  })

  it('returns nickname error when nickname is blank', () => {
    const errors = validateAddPlantForm(
      { selectedPreset: preset, nickname: '   ', lastWateredAt: today },
      today,
    )
    expect(errors.nickname).toBe('식물 별명을 입력해주세요.')
  })

  it('returns date error when last watered date is missing', () => {
    const errors = validateAddPlantForm(
      { selectedPreset: preset, nickname: '별명', lastWateredAt: '' },
      today,
    )
    expect(errors.lastWateredAt).toBe('마지막 물 준 날짜를 입력해주세요.')
  })

  it('returns date error when last watered date is in the future', () => {
    const errors = validateAddPlantForm(
      { selectedPreset: preset, nickname: '별명', lastWateredAt: '2026-07-08' },
      today,
    )
    expect(errors.lastWateredAt).toBe('마지막 물 준 날짜는 오늘 이후일 수 없어요.')
  })

  it('returns no errors for valid input', () => {
    const errors = validateAddPlantForm(
      { selectedPreset: preset, nickname: '거실 몬스테라', lastWateredAt: today },
      today,
    )
    expect(hasFormErrors(errors)).toBe(false)
  })
})

describe('validateEditPlantForm', () => {
  it('returns nickname error when nickname is blank', () => {
    const errors = validateEditPlantForm(
      { nickname: '  ', lastWateredAt: today },
      today,
    )
    expect(errors.nickname).toBe('식물 별명을 입력해주세요.')
  })

  it('returns no errors for valid input', () => {
    const errors = validateEditPlantForm(
      { nickname: '베란다 몬스테라', lastWateredAt: today },
      today,
    )
    expect(hasEditFormErrors(errors)).toBe(false)
  })
})
