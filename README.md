# NSMP Ant App Template
> Шаблон встроенного веб-приложения на Vue 3 и Ant Design Vue для NSMP

![GitHub package.json version](https://img.shields.io/github/package-json/v/ErilovNikita/nsmp-ant-app-template?label=Version)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)
![nsmp support](https://img.shields.io/badge/NSMP-%3E%3D4.17.5-blue)

<p align="center">
  <img src="./docs/public/logo.png" alt="NSMP Ant App Template logo" width="512" height="512">
</p>

> [!TIP]
> Шаблон использует форк библиотеки [`@nsmp/js-api`](https://github.com/ErilovNikita/js-api), адаптированный под работу с `Vue`.

## Основные возможности
- Vue 3 Composition API
- UI на Ant Design Vue
- Интеграция с `@nsmp/js-api`
- Готовые контроллеры для форм, таблиц, модалок, алертов и вкладок
- Универсальный localStorage-кэш для данных формы

![Пример](/docs/preview.png)

## Быстрый старт
```sh
git clone https://github.com/ErilovNikita/nsmp-ant-app-test.git
cd nsmp-ant-app-test
npm install
npm link @nsmp/js-api
npm run dev
```

## Документация
Красивая версия документации публикуется через VitePress:
- [Открыть документацию](https://erilovnikita.github.io/nsmp-ant-app-template/)
- [Локальная документация](docs/)

Локальный запуск:
```sh
npm run docs:dev
```
