import { useState } from 'react'
import { PLACEHOLDER_IMAGE_URL } from '../data/plantPresets'
import { resolvePublicAssetPath } from '../utils/publicAsset'

type PlantImageProps = {
  src: string
  alt: string
  className?: string
}

const normalizeImageUrl = (url: string): string => url.replace(/\.svg$/i, '.jpg')

const resolveImageSrc = (url: string): string =>
  resolvePublicAssetPath(normalizeImageUrl(url))

export const PlantImage = ({ src, alt, className = '' }: PlantImageProps) => {
  const [currentSrc, setCurrentSrc] = useState(() => resolveImageSrc(src))
  const [failed, setFailed] = useState(false)

  const handleError = () => {
    const placeholderSrc = resolveImageSrc(PLACEHOLDER_IMAGE_URL)

    if (currentSrc !== placeholderSrc) {
      setCurrentSrc(placeholderSrc)
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
