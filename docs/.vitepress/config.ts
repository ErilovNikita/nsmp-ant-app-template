import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'NSMP Ant App Template',
  description: 'Документация шаблона встроенного Vue-приложения для NSMP',
  base: '/nsmp-ant-app-template/',
  lang: 'ru-RU',
  cleanUrls: true,
  lastUpdated: true,
  themeConfig: {
    nav: [
      { text: 'Установка', link: '/getting-started/installation' },
      { text: 'Контроллеры', link: '/controllers/' },
      { text: 'Компоненты', link: '/components/' },
      { text: 'Сервисы', link: '/services/' },
    ],
    sidebar: [
      {
        text: 'Быстрый старт',
        items: [
          { text: 'Установка', link: '/getting-started/installation' },
          { text: 'Конфигурация', link: '/getting-started/configuration' },
        ],
      },
      {
        text: 'Контроллеры',
        collapsed: false,
        items: [
          { text: 'Обзор', link: '/controllers/' },
          { text: 'DropdownFieldObjectController', link: '/controllers/dropdown-field-object-controller' },
          { text: 'DropdownFieldDictionaryController', link: '/controllers/dropdown-field-dictionary-controller' },
          { text: 'AlertController', link: '/controllers/alert-controller' },
          { text: 'ModalController', link: '/controllers/modal-controller' },
          { text: 'AttrGroupController', link: '/controllers/attr-group-controller' },
          { text: 'TabGroupController', link: '/controllers/tab-group-controller' },
          { text: 'TableFieldObjectController', link: '/controllers/table-field-object-controller' },
        ],
      },
      {
        text: 'Компоненты',
        collapsed: false,
        items: [
          { text: 'Обзор', link: '/components/' },
          { text: 'Alert', link: '/components/alert' },
          { text: 'AttrGroup', link: '/components/attr-group' },
          { text: 'FullForm', link: '/components/full-form' },
          { text: 'Modal', link: '/components/modal' },
          { text: 'ObjectList', link: '/components/object-list' },
        ],
      },
      {
        text: 'Сервисы',
        collapsed: false,
        items: [
          { text: 'Обзор', link: '/services/' },
          { text: 'Cache', link: '/services/cache' },
          { text: 'Version', link: '/services/version' },
          { text: 'GitHub', link: '/services/github' },
          { text: 'GitLab', link: '/services/gitlab' },
        ],
      },
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/ErilovNikita/nsmp-ant-app-template' },
    ],
    search: {
      provider: 'local',
    },
    outline: {
      label: 'На странице',
      level: [2, 3],
    },
    docFooter: {
      prev: 'Предыдущая',
      next: 'Следующая',
    },
    lastUpdated: {
      text: 'Обновлено',
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'short',
      },
    },
  },
})
