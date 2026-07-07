import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { PlantImage } from './PlantImage'

describe('PlantImage', () => {
  it('renders jpg image with provided src', () => {
    render(
      <PlantImage
        src="/images/plants/monstera.jpg"
        alt="몬스테라"
        className="h-20 w-20"
      />,
    )

    expect(screen.getByRole('img', { name: '몬스테라' })).toHaveAttribute(
      'src',
      '/images/plants/monstera.jpg',
    )
  })

  it('prefixes image paths with vite base url for github pages', () => {
    import.meta.env.BASE_URL = '/today-water/'

    render(
      <PlantImage
        src="/images/plants/monstera.jpg"
        alt="몬스테라"
        className="h-20 w-20"
      />,
    )

    expect(screen.getByRole('img', { name: '몬스테라' })).toHaveAttribute(
      'src',
      '/today-water/images/plants/monstera.jpg',
    )

    import.meta.env.BASE_URL = '/'
  })

  it('normalizes legacy svg paths to jpg', () => {
    render(
      <PlantImage
        src="/images/plants/monstera.svg"
        alt="몬스테라"
        className="h-20 w-20"
      />,
    )

    expect(screen.getByRole('img', { name: '몬스테라' })).toHaveAttribute(
      'src',
      '/images/plants/monstera.jpg',
    )
  })
})
