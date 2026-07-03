# ObjectList
`ObjectList` отображает таблицу Ant Design Vue, связанную с `TableFieldObjectController`. Компонент сам запускает первичную загрузку данных при монтировании.

## Props
| Prop | Тип | Описание |
| --- | --- | --- |
| `title` | `string \| null` | Заголовок над таблицей. |
| `showTitle` | `boolean` | Показывать ли заголовок. |
| `controller` | `TableFieldObjectController` | Контроллер данных, колонок, загрузки, пагинации и выбора строк. |

## Первичная загрузка
При `onMounted` компонент вызывает:

```ts
props.controller.refresh()
```

`refresh()` сбрасывает внутреннее состояние таблицы, загружает первую страницу API и подготавливает данные для первой UI-страницы.

## Slot `start`
Slot `start` выводится перед таблицей. Он предназначен для панели действий: добавить, редактировать, удалить, экспортировать.

```vue
<ObjectList :controller="usersListController">
  <template #start>
    <a-space>
      <a-button type="primary" @click="openCreateModal">Добавить</a-button>
      <a-button :disabled="!usersListController.selectedRowKeys.value.length">
        Удалить
      </a-button>
    </a-space>
  </template>
</ObjectList>
```

## Таблица
Компонент прокидывает в `a-table`:

- `columns` из `controller.columns`;
- `data-source` из `controller.tableData.value`;
- `loading` из `controller.loading.value`;
- `row-selection` из `controller.rowSelection`;
- pagination с обработчиками `getTableDataForPage()` и `changePageSize()`.

## Выбор строк
Выбор строк включается в контроллере:

```ts
const usersListController = new TableFieldObjectController({
  metaClass: 'employee$employee',
  columns,
  enableSelection: true,
})
```

Если `enableSelection` выключен, `rowSelection` не создается и таблица работает без checkbox-выбора.

## Ограничения
- Компонент не принимает `columns` отдельным prop: колонки должны быть в контроллере.
- Компонент не эмитит события выбора строк. Текущее состояние нужно читать из `controller.selectedRowKeys`.
- Текущая pagination-конфигурация использует `current: 1`; контроллер отвечает за загрузку данных, но номер активной страницы не хранится в самом компоненте.
