# NSMP Ant App Template

Шаблон встроенного веб-приложения на Vue 3 с использованием Ant Design Vue. Проект предоставляет готовые компоненты и контроллеры для построения интерфейсов с таблицами, выпадающими списками, формами и другими UI-элементами, с полной поддержкой асинхронной загрузки данных через API.

![Пример](/docs/preview.png)

> [!TIP]
> Данный шаблон использует форк библиотки [`@nsmp/js-api`](https://github.com/ErilovNikita/js-api), адаптированный под работу с `Vue`

## Особенности
- Шаблон на [Vue 3 Composition API](https://vuejs.org/guide/extras/composition-api-faq).
- UI построен на [Ant Design Vue](https://antdv.com/).
- Полная интеграция [`@nsmp/js-api`](https://github.com/ErilovNikita/js-api).



## Установка
```sh
# Клонирование репозитория
git clone https://github.com/ErilovNikita/nsmp-ant-app-test.git
cd nsmp-ant-app-test

# Установка зависимостей
npm install

# Установка кастомной библиотеки
npm link @nsmp/js-api  

# Запуск dev-сервера
npm run dev
```



## Контроллеры

### DropdownFieldObjectController
**Назначение:**
Асинхронный выпадающий список, где данные подгружаются с сервера. Поддерживает поиск, фильтрацию и пагинацию.

**Основные свойства:**
|Свойство|Тип|Описание|
|--|--|--|
|title|`Ref<string>`|Заголовок выпадающего списка|
|options|`Ref<SelectProps['options']>`|Текущий набор опций для отображения|
|selectOptions|`Ref`|Состояние: `loading`, `page`, `hasMore`, `allowEmptyValue`, `isSearchMode`|
|dropdownOpen|`Ref<boolean>`|Открыт ли дропдаун|
|metaClass|`string`|Класс объектов для запроса|
|searchToken|`number`|Внутренний токен для контроля параллельных поисков|

**Методы:**
|Метод|Описание|
|--|--|
|`loadData()`|Асинхронная загрузка страницы данных|
|`handleScroll(event)`|Обработка скролла для подгрузки новых данных|
|`handleSearch(value: string)`|Поиск по строке, сброс и фильтрация списка|
|`resetSearchState()`|Сброс состояния поиска и пагинации|


### DropdownFieldDictionaryController

**Назначение:**  
Локальный выпадающий список с фиксированными данными. Поддерживает поиск и фильтрацию.

**Свойства:**
| Свойство | Тип | Описание |
|----------|-----|---------|
| `title` | `Ref<string>` | Заголовок |
| `options` | `Ref<SelectProps['options']>` | Отображаемые опции |
| `sourceOptions` | `SelectProps['options']` | Исходные данные для фильтрации |
| `selectOptions` | `Ref` | Состояние: `loading`, `page`, `hasMore`, `allowEmptyValue`, `isSearchMode` |
| `dropdownOpen` | `Ref<boolean>` | Открыт ли дропдаун |

**Методы:**
| Метод | Описание |
|-------|----------|
| `handleSearch(value: string)` | Фильтрация опций по строке |
| `resetOptions()` | Сброс фильтра, восстановление полного списка |

### AlertController

**Назначение:**  
Управление уведомлениями (алертами).

**Свойства:**

| Свойство | Тип | Описание |
|----------|-----|---------|
| `visiable` | `Ref<boolean>` | Показывается ли алерт |
| `closable` | `Ref<boolean>` | Можно ли закрыть |
| `showIcon` | `Ref<boolean>` | Показывать иконку |
| `type` | `Ref<'success'\|'info'\|'warning'\|'error'>` | Тип алерта |
| `message` | `Ref<string\|null>` | Сообщение алерта |

**Методы:**

| Метод | Описание |
|-------|----------|
| `show()` | Показывает алерт |
| `hidden()` | Скрывает алерт и очищает сообщение |
| `setMessage(message: string)` | Устанавливает сообщение и показывает алерт |
| `clear()` | Очищает сообщение |
| `setType(type)` | Изменяет тип алерта |

### ModalController

**Назначение:**  
Управление модальными окнами.

**Свойства:**

| Свойство | Тип | Описание |
|----------|-----|---------|
| `title` | `Ref<string>` | Заголовок модального окна |
| `visiable` | `Ref<boolean>` | Показывается ли окно |

**Методы:**

| Метод | Описание |
|-------|----------|
| `show()` | Показывает модальное окно |
| `hidden()` | Скрывает модальное окно |

### AttrGroupController

**Назначение:**  
Управление группами атрибутов (вкладки, секции формы).

**Свойства:**

| Свойство | Тип | Описание |
|----------|-----|---------|
| `title` | `Ref<string>` | Заголовок группы |
| `show` | `Ref<boolean>` | Группа открыта/закрыта |
| `activeKey` | `Ref<number\|null>` | Активный элемент |
| `items` | `Ref<Array<[string,string]>>` | Элементы группы |

**Методы:**

| Метод | Описание |
|-------|----------|
| `open()` | Открывает группу и устанавливает активный элемент |
| `close()` | Закрывает группу и сбрасывает активный элемент |

### TabGroupController

**Назначение:**  
Управление набором вкладок.

**Свойства:**

| Свойство | Тип | Описание |
|----------|-----|---------|
| `defaultTab` | `Ref<number>` | Вкладка по умолчанию |
| `activeTab` | `Ref<number>` | Текущая активная вкладка |

**Методы:**

| Метод | Описание |
|-------|----------|
| `set(number: number)` | Устанавливает активную вкладку |
| `home()` | Возвращает на вкладку по умолчанию |


### TableFieldObjectController

**Назначение:**  
Таблица с асинхронной подгрузкой данных, выбором строк, поиском и управлением UI страницами.

**Свойства:**

| Свойство | Тип | Описание |
|----------|-----|---------|
| `loading` | `Ref<boolean>` | Загрузка данных |
| `tableData` | `Ref<IObjectListRow[]>` | Данные текущей UI страницы |
| `allData` | `Ref<IObjectListRow[]>` | Все загруженные данные с API |
| `selectedRowKeys` | `Ref<(string\|number)[]>` | Выбранные строки |
| `rowSelection` | `any` | Конфигурация для Ant Table |
| `metaClass` | `string` | Класс объектов для API |
| `columns` | `ColumnsType<any>` | Колонки таблицы |
| `uiPageSize` | `Ref<number>` | Количество элементов на UI странице |
| `enableSelection` | `boolean` | Поддержка выбора строк |
| `fetchUrl` | `string` | URL API |
| `apiPage` | `number` | Текущая страница API |
| `apiPageSize` | `number` | Элементов на одной API странице |
| `hasMoreApi` | `boolean` | Есть ли ещё данные на API |
| `requestToken` | `number` | Токен для защиты от гонки запросов |

**Методы:**

| Метод | Описание |
|-------|----------|
| `loadApiPage()` | Загрузка следующей страницы API |
| `getTableDataForPage(page: number)` | Получение данных для UI страницы |
| `changePageSize(newSize, currentPage)` | Изменяет количество элементов на UI странице |
| `refresh()` | Полная перезагрузка таблицы |
| `getSelectedRows()` | Получение выбранных строк |
| `clearSelection()` | Сброс выбора |
| `total` | Геттер общего количества элементов для пагинации |


## Компоненты

### Таблица с выборкой и загрузкой данных
```TypeScript
import { TableFieldObjectController } from '@/utils/fileds'
import ObjectList from './components/naumen/ObjectList.vue'

const tableController = new TableFieldObjectController({
    metaClass: 'employee$employee',
    columns: [
        { title: 'Имя', dataIndex: 'name', width: 300 },
        { title: 'UUID', dataIndex: 'id', width: 300 }
    ],
    pageSize: 100,
    enableSelection: true
})
```
```vue
<ObjectList
    :title="'Список пользователей'"
    :showTitle="true"
    :controller="tableController"
    :columns="columns"
    :enableSelection="true"
/>
```

### Выпадающий список с асинхронной загрузкой
```TypeScript
import { DropdownFieldObjectController } from './utils/fileds'

const dropdownController = new DropdownFieldObjectController(
    'Сотрудники', 
    'employee$employee'
)
```
```vue
<a-select
    v-model:value="selectedValue"
    :options="dropdownController.options.value"
    @scroll="dropdownController.handleScroll"
    @search="dropdownController.handleSearch"
    show-search
/>
```


### Локальный выпадающий список с фильтрацией
```TypeScript
import { DropdownFieldDictionaryController } from '@/utils/fileds'

const statusOptions = [
    { value: 'active', label: 'Активен' },
    { value: 'inactive', label: 'Неактивен' }
]

const statusDropdown = new DropdownFieldDictionaryController(
    'Статус', 
    statusOptions, 
    true
)
```
```vue
<a-select
    v-model:value="selectedStatus"
    :options="statusDropdown.options.value"
    :loading="statusDropdown.selectOptions.value.loading"
    @search="statusDropdown.handleSearch"
/>
```

### Алерт уведомления
```TypeScript
import { AlertController } from '@/utils/fileds'
import Alert from '../components/naumen/Alert.vue'

const alertController = new AlertController(true, 'info', true)
alert.setMessage('Операция выполнена успешно').show()
```
```vue
<Alert :modelValue="alertController" />
```

### Модальное окно
```TypeScript
import { ModalController } from '@/utils/fileds'
import Modal from './components/naumen/Modal.vue'

const modalController = new ModalController('Подтверждение действия')
```
```vue
<Modal :controller="modalController">
    <template #form>
        <p>Текст</p>
    </template>
    
    <template #footer>
        <a-button type="primary" @click="modalController.hidden()">Сохранить</a-button>
        <a-button type="text" @click="modalController.hidden()">Отмена</a-button>
    </template>
</Modal>
```

### Группа атрибутов
```TypeScript
import type { UnwrapRef } from 'vue'
import { reactive } from 'vue'

import { AttrGroupController } from '@/utils/fileds'

const formState: UnwrapRef<IFormState> = reactive({
    age: 5,
    name: 'Nikita Erilov'
})
const formGroupController = new AttrGroupController('Основные данные', [
    ['Имя', 'name'],
    ['Возраст', 'age']
])
```
```vue
<AttrGroup :config="formGroupController" :values="formState"/>
```

### Группа вкладок
```TypeScript
import { TabGroupController } from '@/utils/fileds'

const tabs = new TabGroupController(1)
```
```vue
<a-tabs v-model:activeKey="tabs.activeTab.value">
    <a-tab-pane key="1" tab="Первая вкладка">Содержимое 1</a-tab-pane>
    <a-tab-pane key="2" tab="Вторая вкладка">Содержимое 2</a-tab-pane>
</a-tabs>
```