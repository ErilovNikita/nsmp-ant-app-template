# TableFieldObjectController
Таблица с асинхронной подгрузкой данных, выбором строк и управлением страницами.

## Свойства
| Свойство | Тип | Описание |
| --- | --- | --- |
| `loading` | `Ref<boolean>` | Загрузка данных |
| `tableData` | `Ref<IObjectListRow[]>` | Данные текущей UI-страницы |
| `allData` | `Ref<IObjectListRow[]>` | Все загруженные данные |
| `selectedRowKeys` | `Ref<(string \| number)[]>` | Выбранные строки |
| `rowSelection` | `any` | Конфигурация Ant Table |
| `metaClass` | `string` | Класс объектов для API |
| `columns` | `ColumnsType<any>` | Колонки таблицы |
| `uiPageSize` | `Ref<number>` | Размер UI-страницы |
| `enableSelection` | `boolean` | Включен ли выбор строк |
| `fetchUrl` | `string` | URL API |

## Методы
| Метод | Описание |
| --- | --- |
| `getTableDataForPage(page)` | Получает данные для UI-страницы |
| `changePageSize(newSize, currentPage)` | Меняет размер страницы |
| `refresh()` | Перезагружает таблицу |
| `getSelectedRows()` | Возвращает выбранные строки |
| `clearSelection()` | Сбрасывает выбор |
| `total` | Геттер количества элементов для пагинации |

## Пример
```ts
import { TableFieldObjectController } from '../domain/controllers'

const tableController = new TableFieldObjectController({
  metaClass: 'employee$employee',
  columns: [
    { title: 'Имя', dataIndex: 'name', width: 300 },
    { title: 'UUID', dataIndex: 'id', width: 300 },
  ],
  pageSize: 100,
  enableSelection: true,
})
```
