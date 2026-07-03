# Cache service
`src/services/cache.ts` предоставляет универсальные функции для работы с localStorage-кэшем. Сервис не знает структуру конкретной формы и хранит данные как generic-значение `T`.

## Формат кэша
Данные сохраняются в оболочке `IFormCache<T>`:

```ts
interface IFormCache<T = unknown> {
  created: string
  savedAttrValues: T
}
```

| Поле | Описание |
| --- | --- |
| `created` | ISO-дата записи кэша. Используется для проверки lifetime. |
| `savedAttrValues` | Полезная нагрузка. Для формы это снимок значений полей. |

Ключ localStorage берется из `FormCache.key` в `src/domain/config.ts`.

## API
### `readCachedData<T>()`
Возвращает только полезные данные из `savedAttrValues` или `null`, если кэша нет, он устарел или поврежден.

```ts
const cachedForm = readCachedData<Partial<IFormState>>()
```

### `writeCachedData<T>(savedAttrValues)`
Сохраняет данные в localStorage, добавляя текущую дату `created`.

```ts
writeCachedData(formState)
```

Возвращает `true`, если запись прошла успешно, и `false`, если localStorage недоступен или запись не удалась.

### `readIFormCache<T>()`
Возвращает полную оболочку `IFormCache<T>` вместе с датой создания. Используется, когда нужно знать не только данные, но и метаданные кэша.

### `removeCachedData()`
Удаляет запись по `FormCache.key`. Ошибки localStorage игнорируются.

## Lifetime
Срок жизни задается в `FormCache.lifetimeMs`.

```ts
export const FormCache = reactive({
  key: `FormContentPresenter#${__APP_NAME__}#records`,
  lifetimeMs: 30 * 60 * 1000,
})
```

Сейчас кэш живет 30 минут. Если дата `created` некорректна или запись старше lifetime, сервис удалит кэш и вернет `null`.

## Проверка валидности
Сервис проверяет только общую оболочку:

- значение должно быть объектом;
- `created` должен быть валидной датой;
- запись не должна быть старше `FormCache.lifetimeMs`;
- поле `savedAttrValues` должно присутствовать.

Структура `savedAttrValues` намеренно не проверяется. Это делает сервис универсальным для разных форм и сценариев.

## Обработка ошибок
Все операции localStorage завернуты в `try/catch`.

Если чтение или JSON parsing завершается ошибкой, сервис удаляет поврежденный кэш и возвращает `null`. Если запись невозможна, `writeCachedData()` возвращает `false`.

Такой подход не блокирует работу формы, если браузер запретил localStorage или сохраненные данные оказались повреждены.
