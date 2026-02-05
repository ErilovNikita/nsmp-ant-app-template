import type { UnwrapRef } from 'vue'
import { reactive } from 'vue'

import { IFormState } from './types'

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