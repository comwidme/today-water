const isAbsoluteUrl = (path: string): boolean => /^https?:\/\//i.test(path)

export const resolvePublicAssetPath = (path: string): string => {
  if (isAbsoluteUrl(path)) {
    return path
  }

  const normalizedPath = path.startsWith('/') ? path.slice(1) : path
  return `${import.meta.env.BASE_URL}${normalizedPath}`
}
