# GitHub service
`src/services/git/github.ts` содержит функцию для получения последнего release tag из GitHub.

## `getLastReleaseTag(owner, repo)`
```ts
const remoteVersion = await getLastReleaseTag('ErilovNikita', 'nsmp-ant-app-template')
```

Функция делает запрос:

```txt
https://api.github.com/repos/{owner}/{repo}/releases
```

Затем:

1. проверяет HTTP-статус ответа;
2. парсит JSON;
3. отбрасывает prerelease-релизы;
4. берет первый обычный release;
5. возвращает его `tag_name`.

## Ошибки
Функция бросает `Error`, если:

- GitHub API вернул неуспешный HTTP-статус;
- список релизов пуст;
- ответ не содержит ожидаемые данные;
- запрос завершился сетевой ошибкой.

Текст ошибки оборачивается в сообщение:

```txt
Не удалось получить последнюю версию: ...
```

## Использование в проекте
В `FullForm.vue` сервис используется для проверки актуальности версии:

```ts
getLastReleaseTag(GitProject.owner, GitProject.repo)
```

`GitProject` задается в `src/domain/config.ts` и содержит владельца репозитория и имя проекта.

## Ограничения
- GitHub API может ограничивать частоту неавторизованных запросов.
- Функция не учитывает prerelease-релизы.
- Ожидается, что первый обычный release в ответе GitHub является последним релизом.
