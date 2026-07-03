<script lang="ts" setup>
import { watch } from 'vue'

import { AttrGroupController, DropdownFieldObjectController, DropdownFieldDictionaryController, AlertController } from '../domain/controllers'
import { IFormState } from '../types'
import { DefaultFormState, AttrNamesMap, GitProject } from '../domain/config'
import { useFormCache } from '../composables/useFormCache'

import Alert from './naumen/Alert.vue'
import AttrGroup from './naumen/AttrGroup.vue'
import Caption from './naumen/Caption.vue'
import { getLastReleaseTag } from '../services/git/github.ts'
import { compareVersions, getLocalVersion } from '../services/version.ts'

const formState: IFormState = DefaultFormState
const { formattedCachedData, restoreCacheAlert, restoreCachedData } = useFormCache(formState)

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
const versionController = new AlertController(false, 'info', true)

versionController.setMessage('Обновление данных о версии приложения...')
getLastReleaseTag(GitProject.owner, GitProject.repo).then(remoteVersion => {
    switch(compareVersions(getLocalVersion(), remoteVersion)) {
        case 1:
            versionController.setType('warning')
            versionController.setMessage(`Вы используете тестовую версию ${getLocalVersion()}! Свяжитесь с поддержкой для исправления.`)
            break
        case -1:
            versionController.setType('error')
            versionController.setMessage(`Ваша версия ${getLocalVersion()} устарела! Сбросьте кеш браузера, чтобы получить новую версию.`)
            break
        case 0:
            versionController.setType('success')
            versionController.setMessage(`Используется актуальная версия ${getLocalVersion()}`)
            break
    }
}) .catch(e => {
    versionController.setType('error')
    versionController.setMessage((e as Error).message + ". Свяжитесь с поддержкой для исправления.") 
})

const attrGroup = new AttrGroupController(
    "Параметры на форме",
    Object.entries(AttrNamesMap)
        .filter(([key]) => key !== 'rangePicker')
        .map(([key, value]) => [value as string, key as keyof IFormState])
).open()

const cacheAttrGroup = new AttrGroupController("Данные в кеше").open()

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
    <a-row>
        <a-col :span="15" id="selector-left">
            <a-form layout="vertical" :model="formState" autocomplete="off" @finish="finish" @finishFailed="onFinishFailed">

                <!-- Алерт кеша -->
                <Alert :modelValue="restoreCacheAlert">
                    <template #action>
                        <a-button class="restore-cache-button" type="link" @click="restoreCachedData">Восстановить</a-button>
                    </template>
                </Alert>
                
                <!-- Сообщение по странице -->
                <Alert :modelValue="alertForm" />

                <Caption text="Поля для ввода">
                    <!-- Выпападающий список с фиксированными значениями -->
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
                </Caption>

                <!-- Отступ -->
                <p style="margin-bottom: 40px; display: block; content: '';"></p>

                <Caption text="Другое">

                    <!-- Чек-бокс обычный -->
                    <a-form-item name="simpleCheckbox" style="margin-bottom: 5px;">
                        <a-checkbox v-model:checked="formState.simpleCheckbox">{{ AttrNamesMap.simpleCheckbox
                            }}</a-checkbox>
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
                </Caption>

                <!-- Кнопка сохранить форму -->
                <a-form-item style="margin-top: 40px !important;">
                    <a-button type="primary" html-type="submit">Сохранить</a-button>
                </a-form-item>
            </a-form>
        </a-col>

        <a-col :span="9" id="selector-right">
            <Alert :modelValue="versionController" />

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

            <AttrGroup :config="cacheAttrGroup" :values="formState">
                <template v-slot:end>
                    <a-form-item class="cache-data-form-item">
                        <div class="cache-data-label">Данные в кеше</div>
                        <pre class="cache-data-value">{{ formattedCachedData }}</pre>
                    </a-form-item>
                </template>
            </AttrGroup>
        </a-col>
    </a-row>
</template>

<style scoped>
#selector-left {
    padding-right: 20px;
}
#selector-right {
    padding-left: 20px;
}

.cache-data-form-item {
    margin-bottom: 0;
}

.restore-cache-alert {
    margin-bottom: 12px;
}

.cache-data-label {
    margin-bottom: 6px;
    color: rgba(0, 0, 0, 0.88);
    font-size: 13px;
    line-height: 1.4;
}

.cache-data-value {
    max-height: 280px;
    margin: 0;
    padding: 10px 12px;
    overflow: auto;
    white-space: pre-wrap;
    word-break: break-word;
    background: #f6f8fa;
    border: 1px solid #d9d9d9;
    border-radius: 2px;
    color: #323232;
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
    font-size: 12px;
    line-height: 1.5;
}
.restore-cache-button {
    padding: 0;
    margin-top: -3px !important;
    margin-bottom: -3px !important;
    height: auto;
}

</style>
