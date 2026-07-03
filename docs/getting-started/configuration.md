# Конфигурация
> [!TIP]
> Проект использует env-файлы Vite. 
> Переменные, которые должны быть доступны в браузерном коде, должны начинаться с `VITE_`.

## Базовый пример
В репозитории есть `example.env` с набором переменных:

```env
VITE_ACCESS_KEY=TOKEN
VITE_APP_URL=http://localhost:5173/
VITE_APP_REAL_URL=URL_NSD
VITE_APP_CODE=APP_CODE
VITE_REST_PATH=rest
VITE_USER_UUID=UUID
VITE_SUBJECT_UUID=UUID
VITE_USER_LOGIN=LOGIN
```

Для локальной работы обычно создают `.env.local` на основе `example.env`.

```sh
cp example.env .env.local
```

`*.local` файлы не нужно коммитить: в них должны лежать персональные токены, URL стендов и UUID пользователя.

## Несколько env-файлов
Vite умеет загружать env-файлы по текущему mode. Это позволяет хранить разные настройки для локальной разработки, dev-стенда и production-сборки.

Типовая структура:

```txt
.env                    общие значения по умолчанию
.env.local              личные локальные значения, не коммитится
.env.development        значения для npm run dev
.env.development.local  личные значения для development, не коммитится
.env.production         значения для production-сборки
.env.production.local   личные production overrides, не коммитится
```

При запуске `npm run dev` используется mode `development`, потому что скрипт запускает `vite --mode development`.

При запуске `npm run build` Vite по умолчанию использует mode `production`.

## Приоритет загрузки
Для mode `development` порядок примерно такой:

```txt
.env
.env.local
.env.development
.env.development.local
```

Файлы, загруженные позже, переопределяют значения из предыдущих файлов.

## Переменные проекта
| Переменная | Где используется | Описание |
| --- | --- | --- |
| `VITE_ACCESS_KEY` | `src/main.ts` | Токен доступа для инициализации `@nsmp/js-api`. |
| `VITE_APP_URL` | `src/main.ts` | URL текущего embedded-приложения. Для локальной разработки обычно `http://localhost:5173/`. |
| `VITE_APP_REAL_URL` | `vite.config.ts` | Реальный URL NSMP/NSD-стенда, на который проксируется `/sd/`. |
| `VITE_APP_CODE` | `src/main.ts`, `vite.config.ts` | Код приложения для `InitVariable` и имени zip-архива сборки. |
| `VITE_REST_PATH` | `src/main.ts` | REST path, передаваемый в `InitVariable`. |
| `VITE_SUBJECT_UUID` | `src/main.ts` | UUID субъекта/контекста запуска. |
| `VITE_USER_LOGIN` | `src/main.ts` | Логин пользователя для локальной инициализации. |
| `VITE_USER_UUID` | `src/main.ts` | UUID пользователя для локальной инициализации. |

## Пример разработки
`.env.local`:
```env
VITE_ACCESS_KEY=local-token
VITE_APP_URL=http://localhost:5173/
VITE_APP_REAL_URL=https://dev.example.local
VITE_APP_CODE=nsmp-ant-app-test
VITE_REST_PATH=rest
VITE_USER_UUID=00000000-0000-0000-0000-000000000000
VITE_SUBJECT_UUID=00000000-0000-0000-0000-000000000000
VITE_USER_LOGIN=developer
```

## Пример dev
`.env.development`:
```env
VITE_APP_URL=http://localhost:5173/
VITE_APP_REAL_URL=https://dev-nsmp.example.com
VITE_APP_CODE=nsmp-ant-app-test
VITE_REST_PATH=rest
```

Персональные значения, такие как `VITE_ACCESS_KEY`, `VITE_USER_UUID`, `VITE_SUBJECT_UUID` и `VITE_USER_LOGIN`, лучше держать в `.env.development.local`.

## Пример production-сборки
`.env.production`:
```env
VITE_APP_URL=https://apps.example.com/nsmp-ant-app-test/
VITE_APP_REAL_URL=https://nsmp.example.com
VITE_APP_CODE=nsmp-ant-app-test
VITE_REST_PATH=rest
```

Production-сборка создается командой:

```sh
npm run build
```

Имя zip-архива формируется в `vite.config.ts`:

```txt
${VITE_APP_CODE}-${npm_package_version}.zip
```

Версия берется из `package.json`.

## Прокси `/sd/`
В dev-сервере настроен proxy:

```ts
server: {
  proxy: {
    '/sd/': {
      target: env.VITE_APP_REAL_URL,
      changeOrigin: true,
      secure: false,
      ws: true,
    },
  },
}
```

Это значит, что локальные запросы на `/sd/` будут перенаправлены на `VITE_APP_REAL_URL`.

## Важные правила
- Не храните реальные токены и персональные UUID в коммитах.
- Для секретов и личных настроек используйте `.env.local` или `.env.<mode>.local`.
- Переменные без префикса `VITE_` не будут доступны через `import.meta.env` в клиентском коде.
- После изменения env-файлов перезапустите dev-сервер.
- Если добавляете новую env-переменную, обновите `example.env` и эту страницу.
