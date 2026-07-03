# GitLab service
`src/services/git/gitlab.ts` зарезервирован под интеграцию с GitLab. Сейчас файл не содержит рабочей реализации, поэтому проект не зависит от GitLab API.

## Зачем нужен этот раздел
В проекте уже есть сервис GitHub для получения последней версии из release tag. GitLab-сервис нужен для аналогичного сценария в проектах, где релизы и теги хранятся в GitLab.

Ожидаемые задачи будущей реализации:

- получить последний release или tag проекта;
- отфильтровать prerelease/test-сборки, если это требуется;
- вернуть строку версии в том же формате, что и GitHub-сервис;
- выбросить понятную ошибку при недоступности API или некорректном ответе.

## Предлагаемый API
Чтобы сервисы GitHub и GitLab были взаимозаменяемыми, будущую функцию лучше держать близкой к текущему GitHub API:

```ts
const remoteVersion = await getLastReleaseTag(projectIdOrPath)
```

или, если нужны host/group/project:

```ts
const remoteVersion = await getLastReleaseTag({
  host: 'https://gitlab.example.com',
  group: 'frontend',
  project: 'nsmp-ant-app-template',
})
```

## Что учесть при реализации
- GitLab API часто требует token для приватных проектов.
- Project path в GitLab API нужно URL-encode.
- У разных команд может отличаться политика тегов: `v1.2.3`, `1.2.3`, `release-1.2.3`.
- Ошибки нужно приводить к понятному сообщению, чтобы их можно было показать через `AlertController`.
