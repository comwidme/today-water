import { useState } from 'react'
import { PLACEHOLDER_IMAGE_URL } from '../data/plantPresets'

type PlantImageProps = {
  src: string
  alt: string
  className?: string
}

const normalizeImageUrl = (url: string): string => url.replace(/\.svg$/i, '.jpg')

export const PlantImage = ({ src, alt, className = '' }: PlantImageProps) => {
  const [currentSrc, setCurrentSrc] = useState(() => normalizeImageUrl(src))
  const [failed, setFailed] = useState(false)

  const handleError = () => {
    if (currentSrc !== PLACEHOLDER_IMAGE_URL) {
      setCurrentSrc(PLACEHOLDER_IMAGE_URL)
      return
    }

    setFailed(true)
  }

  if (failed) {
    return (
      <div
        className={`flex items-center justify-center bg-emerald-50 text-3xl ${className}`}
        aria-label={alt}
      >
        🌿
      </div>
    )
  }

  return (
    <img
      src={currentSrc}
      alt={alt}
      className={`object-cover ${className}`}
      onError={handleError}
    />
  )
}
