# DropdownFieldDictionaryController
Локальный выпадающий список с фиксированными данными. Поддерживает поиск и фильтрацию.

## Свойства
| Свойство | Тип | Описание |
| --- | --- | --- |
| `title` | `Ref<string>` | Заголовок |
| `options` | `Ref<SelectProps['options']>` | Отображаемые опции |
| `sourceOptions` | `SelectProps['options']` | Исходные данные для фильтрации |
| `selectOptions` | `Ref` | Состояние загрузки, страницы, поиска и пустого значения |
| `dropdownOpen` | `Ref<boolean>` | Открыт ли dropdown |

## Методы
| Метод | Описание |
| --- | --- |
| `handleSearch(value)` | Фильтрует опции по строке |
| `resetOptions()` | Сбрасывает фильтр |

## Пример
```ts
import { DropdownFieldDictionaryController } from '../domain/controllers'

const statusDropdown = new DropdownFieldDictionaryController(
  'Статус',
  [
    { value: 'active', label: 'Активен' },
    { value: 'inactive', label: 'Неактивен' },
  ],
  true
)
```
