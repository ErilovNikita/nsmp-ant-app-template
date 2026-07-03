# Alert
`Alert` - тонкая обертка над `a-alert` из Ant Design Vue. Компонент не хранит собственное состояние: все параметры передаются через `AlertController`.

## Props
| Prop | Тип | Описание |
| --- | --- | --- |
| `modelValue` | `AlertController` | Контроллер, который определяет видимость, тип, текст, иконку и возможность закрытия. |

## Как работает
Компонент отображается только если `modelValue.visiable.value === true`. При закрытии стандартной кнопкой Ant Design вызывается `modelValue.hidden()`, поэтому alert скрывается и очищает сообщение через контроллер.

Значения контроллера напрямую прокидываются в `a-alert`:

- `type` управляет цветом и статусом: `success`, `info`, `warning`, `error`;
- `closable` включает или отключает кнопку закрытия;
- `showIcon` включает или отключает статусную иконку;
- `message` выводится в slot `message`.

## Slot `action`
Slot `action` предназначен для действия справа внутри alert. Обычно это короткая кнопка: восстановить данные, повторить запрос, открыть подробности.

```vue
<Alert :modelValue="restoreCacheAlert">
  <template #action>
    <a-button type="link" @click="restoreCachedData">
      Восстановить
    </a-button>
  </template>
</Alert>
```

Если action не нужен, slot можно не передавать.

## Пример
```ts
import { AlertController } from '../domain/controllers'

const alertController = new AlertController(true, 'success', true)
alertController.setMessage('Данные сохранены')
```

```vue
<Alert :modelValue="alertController" />
```

## Рекомендации
- Не меняйте состояние alert напрямую в шаблоне, используйте методы контроллера.
- Для одноразовых сообщений вызывайте `setMessage()`: он сразу покажет alert.
- Для постоянных информационных блоков можно создать контроллер с `closable = false`.
