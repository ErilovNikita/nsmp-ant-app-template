import type { UnwrapRef } from 'vue'
import { reactive } from 'vue'

import { IFormState } from '../types'

export const FormCache = reactive({
  key: `FormContentPresenter#${__APP_NAME__}#records`,
  lifetimeMs: 30 * 60 * 1000, // 30 минут
})

export const GitProject: UnwrapRef<any> = reactive({
  owner: "ErilovNikita",
  repo: "nsmp-ant-app-template"
})

export const DefaultFormState: UnwrapRef<IFormState> = reactive({
    someTextWithLoader: null,
    someTextWithDescription: '',
    number: 5,
    dropdownList: null,
    simpleCheckbox: false,
    onceSelect: '1',
    slider: 0,
    rangePicker: ['', ''],
})

export const AttrNamesMap: Record<keyof IFormState, string> = {
    someTextWithLoader: 'Выпападающий список',
    someTextWithDescription: 'Поле с описанием',
    number: 'Целое число',
    dropdownList: 'Сотрудники',
    simpleCheckbox: 'Тупо чекбокс',
    onceSelect: 'Одно из значений',
    slider: 'Слайдер',
    rangePicker: 'Двойная дата',
}
