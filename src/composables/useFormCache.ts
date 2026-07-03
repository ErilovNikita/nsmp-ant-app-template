import { computed, ref, watch } from 'vue'
import { AlertController } from '../domain/controllers'
import { readCachedData, writeCachedData } from '../services/cache'

const cloneFormData = <T extends object>(value: T): T => (
  JSON.parse(JSON.stringify(value)) as T
)

const hasSavedData = (value: unknown): boolean => {
  if (value == null) return false
  if (Array.isArray(value)) return value.length > 0
  if (typeof value === 'object') return Object.keys(value).length > 0
  return true
}

const useFormCache = <T extends object>(formState: T) => {
  const cachedFormState = readCachedData<Partial<T>>()
  const cachedData = ref<Partial<T> | null>(cachedFormState)
  const formattedCachedData = computed(() => JSON.stringify(cachedData.value, null, 2))
  const restoreCacheAlert = new AlertController(true, 'success', true, 'Внимание! Для данной формы есть сохраненные значения')

  if (hasSavedData(cachedFormState)) {
    restoreCacheAlert.show()
  }

  const restoreCachedData = () => {
    const nextCachedData = readCachedData<Partial<T>>()
    if (!hasSavedData(nextCachedData)) {
      restoreCacheAlert.hidden()
      return
    }

    Object.assign(formState, nextCachedData)
    cachedData.value = nextCachedData
    restoreCacheAlert.hidden()
  }

  watch(
    () => cloneFormData(formState),
    (value) => {
      writeCachedData(value)
      cachedData.value = readCachedData<Partial<T>>()
    },
    { deep: true }
  )

  return {
    cachedData,
    formattedCachedData,
    restoreCacheAlert,
    restoreCachedData,
  }
}

export { useFormCache }
