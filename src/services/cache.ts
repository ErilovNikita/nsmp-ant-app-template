import { FormCache } from '../domain/config'
import { IFormCache } from '../types'

const removeCachedData = () => {
  try {
    localStorage.removeItem(FormCache.key)
  } catch {}
}

const isValidCacheEnvelope = <T>(value: unknown): value is IFormCache<T> => {
  if (!value || typeof value !== 'object') return false

  const cache = value as Partial<IFormCache<T>>
  const createdAt = Date.parse(cache.created ?? '')

  return Number.isFinite(createdAt)
    && Date.now() - createdAt <= FormCache.lifetimeMs
    && 'savedAttrValues' in cache
}

const readIFormCache = <T = unknown>(): IFormCache<T> | null => {
  try {
    const rawCache = localStorage.getItem(FormCache.key)
    if (!rawCache) return null

    const cache = JSON.parse(rawCache)

    if (!isValidCacheEnvelope<T>(cache)) {
      removeCachedData()
      return null
    }

    return cache
  } catch {
    removeCachedData()
    return null
  }
}

const readCachedData = <T = unknown>(): T | null => (
  readIFormCache<T>()?.savedAttrValues ?? null
)

const writeCachedData = <T = unknown>(savedAttrValues: T): boolean => {
  const formCache: IFormCache<T> = {
    created: new Date().toISOString(),
    savedAttrValues,
  }

  try {
    localStorage.setItem(FormCache.key, JSON.stringify(formCache))
    return true
  } catch {
    return false
  }
}

export {
  type IFormCache,
  readCachedData,
  readIFormCache,
  removeCachedData,
  writeCachedData,
}
