import { afterEach, describe, expect, it } from 'vitest'
import { resolvePublicAssetPath } from './publicAsset'

describe('resolvePublicAssetPath', () => {
  afterEach(() => {
    import.meta.env.BASE_URL = '/'
  })

  it('returns absolute urls unchanged', () => {
    expect(resolvePublicAssetPath('https://example.com/a.jpg')).toBe(
      'https://example.com/a.jpg',
    )
  })

  it('prefixes root-relative paths with base url', () => {
    import.meta.env.BASE_URL = '/today-water/'

    expect(resolvePublicAssetPath('/images/plants/monstera.jpg')).toBe(
      '/today-water/images/plants/monstera.jpg',
    )
  })

  it('keeps local dev paths when base url is root', () => {
    import.meta.env.BASE_URL = '/'

    expect(resolvePublicAssetPath('/images/plants/monstera.jpg')).toBe(
      '/images/plants/monstera.jpg',
    )
  })
})
