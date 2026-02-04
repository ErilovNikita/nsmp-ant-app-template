<script lang="ts" setup>
import { AttrGroupController, DropdownFieldObjectController, DropdownFieldDictionaryController, AlertController } from '../utils/fileds'
import { IFormState } from '../utils/types'
import { DefaultFormState, AttrNamesMap } from '../utils/config'

import Alert from '../components/naumen/Alert.vue'
import AttrGroup from '../components/naumen/AttrGroup.vue'
import Caption from '../components/naumen/Caption.vue'
import { watch } from 'vue'

const formState: IFormState = DefaultFormState

const employeeDropdownField = new DropdownFieldObjectController(AttrNamesMap.dropdownList, 'employee$employee', true)
const sampleDropdownField = new DropdownFieldDictionaryController(AttrNamesMap.someTextWithLoader, [
    { label: "Первый", value: "1" },
    { label: "Второй", value: "2" }
], true)
const radioField = new DropdownFieldDictionaryController(AttrNamesMap.someTextWithLoader, [
    { label: "Первое", value: "1" },
    { label: "Второе", value: "2" },
    { label: "Третье", value: "3" }
], false)
const fieldDescription = new AlertController(false, "info", true, "Какое-то информационное сообщение").show()
const alertForm = new AlertController(false, "info", true)

const attrGroup = new AttrGroupController(
    "Параметры на форме",
    Object.entries(AttrNamesMap)
        .filter(([key]) => key !== 'rangePicker')
        .map(([key, value]) => [value as string, key as keyof IFormState])
).open()

watch(
    () => formState.someTextWithLoader,
    async (newValue) => { if (newValue == 'empty') formState.someTextWithLoader = null }
)

watch(
    () => formState.dropdownList,
    async (newValue) => { if (newValue == 'empty') formState.dropdownList = null }
)

function finish() {
    alertForm.setType('success')
    alertForm.setMessage('Объект успешно добавлен')
}

function onFinishFailed() {
    alertForm.setType('error')
    alertForm.setMessage('Объект не может быть добавлен по следующим причинам: Проверьте правильность заполненных полей')
}

</script>
<template>
    <div style="display: flex !important;">
        <div style="width: 60% !important;">
            <a-form layout="vertical" :model="formState" autocomplete="off" @finish="finish"
                @finishFailed="onFinishFailed">

                <!-- Сообщение по странице -->
                <Alert :modelValue="alertForm" />


                <!-- Название группы атрибутов -->
                <Caption text="Поля для ввода" />

                <!-- Выпопадающий список с фиксированными значениями -->
                <a-form-item :label="sampleDropdownField.title.value" name="someTextWithLoader"
                    style="margin-bottom: 10px;">
                    <a-select v-model:value="formState.someTextWithLoader" :filter-option="false"
                        :options="sampleDropdownField.options" show-search :virtual="true"
                        notFoundContent="Ничего не найдено" placeholder="[Не указано]"
                        @dropdownVisibleChange="(val: boolean) => sampleDropdownField.dropdownOpen.value = val"
                        @search="sampleDropdownField.handleSearch" />
                </a-form-item>

                <!-- Поле с описанием -->
                <a-form-item :label="AttrNamesMap.someTextWithDescription" name="someTextWithDescription"
                    :rules="[{ required: true, message: `Потому что потому` }]" style="margin-bottom: 10px;">
                    <Alert :modelValue="fieldDescription" />
                    <a-input v-model:value="formState.someTextWithDescription" placeholder="Пиши что хочешь" />
                </a-form-item>

                <!-- Целое число -->
                <a-form-item :label="AttrNamesMap.number" name="number" style="margin-bottom: 10px;">
                    <a-input-number id="inputNumber" v-model:value="formState.number" :min="1" :max="10" />
                </a-form-item>

                <!-- Выпадающий список сотрудников -->
                <a-form-item :label="employeeDropdownField.title.value" name="dropdownList"
                    style="margin-bottom: 10px;">
                    <a-select v-model:value="formState.dropdownList" :filter-option="false"
                        :options="employeeDropdownField.options" show-search :virtual="true"
                        notFoundContent="Ничего не найдено" placeholder="[Не указано]"
                        @dropdownVisibleChange="(val: boolean) => employeeDropdownField.dropdownOpen.value = val"
                        @popupScroll="employeeDropdownField.handleScroll"
                        @search="employeeDropdownField.handleSearch" />
                </a-form-item>

                <!-- Отступ -->
                <p style="margin-bottom: 40px; display: block; content: '';"></p>

                <!-- Название группы атрибутов -->
                <Caption text="Другое" />

                <!-- Чек-бокс обычный -->
                <a-form-item name="simpleCheckbox" style="margin-bottom: 5px;">
                    <a-checkbox v-model:checked="formState.simpleCheckbox">{{ AttrNamesMap.simpleCheckbox }}</a-checkbox>
                </a-form-item>

                <!-- Одно из значений -->
                <a-form-item :label="AttrNamesMap.onceSelect" name="onceSelect" style="margin-bottom: 10px;">
                    <a-radio-group v-model:value="formState.onceSelect">
                        <a-radio-button v-for="option in radioField.options.value" :key="option.value"
                            :value="option.value">
                            {{ option.label }}
                        </a-radio-button>
                    </a-radio-group>
                </a-form-item>

                <!-- Слайдер -->
                <a-form-item :label="AttrNamesMap.slider" name="slider">
                    <a-slider v-model:value="formState.slider" :step="5" label="Одно из значений" />
                </a-form-item>

                <!-- Двойная дата -->
                <a-form-item name="range-picker" :label="AttrNamesMap.rangePicker" style="margin-bottom: 10px;">
                    <a-range-picker v-model:value="formState['rangePicker']" value-format="YYYY-MM-DD"
                        :placeholder="['Дата начала', 'Дата конца']" />
                </a-form-item>

                <!-- Кнопка сохранить форму -->
                <a-form-item style="margin-top: 40px !important;">
                    <a-button type="primary" html-type="submit">Сохранить</a-button>
                </a-form-item>
            </a-form>
        </div>
        <div style="width: 40% !important; margin-left:20px;">
            <AttrGroup :config="attrGroup" :values="formState">
                <template v-slot:end>
                    <a-form-item label="Двойная дата (Начало)" style="margin-bottom: -10px;">
                        <a-typography-text>{{ formState.rangePicker?.[0] }}</a-typography-text>
                    </a-form-item>
                    <a-form-item label="Двойная дата (Конец)" style="margin-bottom: -10px;">
                        <a-typography-text>{{ formState.rangePicker?.[1] }}</a-typography-text>
                    </a-form-item>
                </template>
            </AttrGroup>
        </div>
    </div>
</template>