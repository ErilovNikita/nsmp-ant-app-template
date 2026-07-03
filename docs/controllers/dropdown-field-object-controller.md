# DropdownFieldObjectController
Асинхронный выпадающий список, где данные подгружаются с сервера. Поддерживает поиск, фильтрацию и пагинацию.

## Свойства
| Свойство | Тип | Описание |
| --- | --- | --- |
| `title` | `Ref<string>` | Заголовок выпадающего списка |
| `options` | `Ref<SelectProps['options']>` | Текущий набор опций |
| `selectOptions` | `Ref` | Состояние загрузки, страницы, поиска и пустого значения |
| `dropdownOpen` | `Ref<boolean>` | Открыт ли dropdown |
| `metaClass` | `string` | Класс объектов для запроса |

## Методы
| Метод | Описание |
| --- | --- |
| `loadData()` | Загружает страницу данных |
| `handleScroll(event)` | Подгружает данные при прокрутке |
| `handleSearch(value)` | Выполняет поиск по строке |
| `resetSearchState()` | Сбрасывает поиск и пагинацию |

## Пример
```ts
import { DropdownFieldObjectController } from '../domain/controllers'

const dropdownController = new DropdownFieldObjectController(
  'Сотрудники',
  'employee$employee'
)
```

```vue
<a-select
  v-model:value="selectedValue"
  :options="dropdownController.options.value"
  show-search
  @popupScroll="dropdownController.handleScroll"
  @search="dropdownController.handleSearch"
/>
```
