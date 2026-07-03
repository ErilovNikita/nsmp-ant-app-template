# AlertController
Управляет отображением уведомлений.

## Свойства
| Свойство | Тип | Описание |
| --- | --- | --- |
| `visiable` | `Ref<boolean>` | Показывается ли alert |
| `closable` | `Ref<boolean>` | Можно ли закрыть |
| `showIcon` | `Ref<boolean>` | Показывать иконку |
| `type` | `Ref<'success' \| 'info' \| 'warning' \| 'error'>` | Тип alert |
| `message` | `Ref<string \| null>` | Сообщение |

## Методы
| Метод | Описание |
| --- | --- |
| `show()` | Показывает alert |
| `hidden()` | Скрывает alert и очищает сообщение |
| `setMessage(message)` | Устанавливает сообщение и показывает alert |
| `clear()` | Очищает сообщение |
| `setType(type)` | Меняет тип |

## Пример
```ts
import { AlertController } from '../domain/controllers'

const alertController = new AlertController(true, 'info', true)
alertController.setMessage('Операция выполнена успешно')
```
