# Modal
`Modal` - обертка над `a-modal`, управляемая через `ModalController`.

## Props
| Prop | Тип | Описание |
| --- | --- | --- |
| `controller` | `ModalController` | Контроллер заголовка и видимости модального окна. |

## Slots
| Slot | Описание |
| --- | --- |
| `alert` | Верхняя зона модалки. Подходит для предупреждений и сообщений об ошибках. |
| `form` | Основное содержимое модального окна. |
| `footer` | Нижняя панель действий. Полностью заменяет стандартный footer Ant Design. |

## Поведение footer
Компонент всегда передает собственный `#footer` в `a-modal`, а внутрь ставит slot `footer`. Это значит, что стандартные кнопки Ant Design не появятся автоматически. Все действия нужно явно задавать в месте использования.

```vue
<Modal :controller="modalController">
  <template #form>
    <p>Текст подтверждения</p>
  </template>

  <template #footer>
    <a-button type="primary" @click="save">Сохранить</a-button>
    <a-button type="text" @click="modalController.hidden()">Отмена</a-button>
  </template>
</Modal>
```

## Управление
```ts
import { ModalController } from '../domain/controllers'

const modalController = new ModalController('Подтверждение действия')

const openModal = () => modalController.show()
const closeModal = () => modalController.hidden()
```

`v-model:open` связан с `controller.visiable.value`, поэтому закрытие модалки из UI синхронизируется с контроллером.

## Рекомендации
- Заголовок задавайте через `new ModalController(title)`.
- Не храните бизнес-логику внутри `Modal`; передавайте готовые обработчики в кнопки footer.
- Для сообщений внутри модалки используйте slot `alert` и компонент `Alert`.
