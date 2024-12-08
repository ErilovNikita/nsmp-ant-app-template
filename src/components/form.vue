<script lang="ts" setup>
    import { ref } from 'vue'
    import { reactive } from 'vue'
    import type { UnwrapRef } from 'vue'
    import { SelectProps } from 'ant-design-vue'
    import { IJsApi } from '@nsmp/js-api/src/lib/JsApi'
    import { inject } from 'vue'

    import AttrGroup from './AttrGroup.vue'
    import PlusIcon from '../assets/icons/plus.svg'
    import EditIcon from '../assets/icons/edit.svg'
    import FilterIcon from '../assets/icons/filter.svg'
    import DeleteIcon from '../assets/icons/delete.svg'
    const jsApi = inject('jsApi') as IJsApi

    // Интерфейс для формы
    interface FormState {
        someTextWithLoader: string
        someTextWithDescription: string
        number: number
        dropdownList: string | null,
        simpleCheckbox: boolean
        onceSelect: 'one' | 'two' | 'three'
        slider: number
        rangePicker: [string, string]
    }

    // Значения формы
    const formState:UnwrapRef<FormState> = reactive({
        someTextWithLoader: '',
        someTextWithDescription: '',
        number: 5,
        dropdownList: null,
        simpleCheckbox: false,
        onceSelect: 'one',
        slider: 0,
        rangePicker: ['', ''],
    })

    // Переменная для основной панели вкладок
    const activeTab = ref('1')

    // Параметры для выпадающего списока
    const metaClassObjectsSelect = "catalog$testData"
    const options = ref<SelectProps['options']>([])
    const selectOptions = ref<any>({
        loading: false,
        hasMore: true,
        searching: false,
        page: 1
    })

    // Функция для загрузки данных в выпадающий список
    const loadData = async () => {
        if (selectOptions.value.loading || !selectOptions.value.hasMore || selectOptions.value.searching) return
        selectOptions.value.loading = true
        const url = `/exec?func=modules.restModule.getObjectsByPages&params=request,response,user&metaClass=${metaClassObjectsSelect}&page=${selectOptions.value.page}`

        jsApi.restCallAsJson(url, {}).then(response => {
            const responseData = response as any
            const data = responseData.results as SelectProps['options']
            if ( data ) {
                options.value = [...(options.value ?? []), ...(data ?? [])]
                selectOptions.value.page += 1
                selectOptions.value.loading = false
                return void 0
            }
        }).catch(error => {
            console.error(error)
        })
    }

    // Обработчик поиска в выпадающий список
    const handleSearch = async (value: string) => {
        if ( value ) {
            if (selectOptions.value.loading) return
            selectOptions.value.loading = true
            selectOptions.value.searching = true

            const url = `/exec?func=modules.restModule.getObjectsByPages&params=request,response,user&metaClass=${metaClassObjectsSelect}&term=${value}`
                jsApi.restCallAsJson(url, {}).then(response => {
                    const responseData = response as any
                    const data = responseData.results as SelectProps['options']
                if ( data ) {
                    options.value = [...(data ?? [])]
                    selectOptions.value.loading = false
                    return void 0
                }
            }).catch(error => {
                console.error(error)
            })
        } else {
            selectOptions.value.page = 1
            selectOptions.value.searching = false
            if (selectOptions.value.loading || !selectOptions.value.hasMore) return
            selectOptions.value.loading = true

            const url = `/exec?func=modules.restModule.getObjectsByPages&params=request,response,user&metaClass=${metaClassObjectsSelect}&page=${selectOptions.value.page}`
            jsApi.restCallAsJson(url, {}).then(response => {
                const responseData = response as any
                const data = responseData.results as SelectProps['options']
                if ( data ) {
                    options.value = [...data]
                    selectOptions.value.page += 1
                    selectOptions.value.loading = false
                    return void 0
                }
            }).catch(error => {
                console.error(error)
            })
        }
    }

    // Обработчик прокрутки в выпадающий список
    const handleScroll = (event: Event) => {
      const target = event.target as HTMLElement
      if (target.scrollTop + target.offsetHeight >= target.scrollHeight - 10) {
        loadData()
      }
    }

    // Первичная загрузка данных в выпадающий список
    loadData()

    function finish() {
        showPageMessage(
            `<span style="display: block;">Объект успешно добавлен</span>`,
            'success'
        )
    }

    function onFinishFailed() {
        showPageMessage(
            `<span style="display: block;">Объект не может быть добавлен по следующим причинам:</span>
            <span style="display: block;">Проверьте правильность заполненных полей</span>`,
            'error'
        )
    }

    // Метод для отображения сообщения вверху страницы
    function showPageMessage(message:string, type:string = 'success') {
        pageMessage.value.message = message
        pageMessage.value.type = type
        pageMessage.value.show = true
    }
    // Перемнные для сообщения
    const pageMessage = ref<any>({})
    pageMessage.value = {
        show: false,
        type: 'success',
        message: ``
    }
    const pageMessageHandleClose = () => { pageMessage.value.show = false }


    // Параметры модального окна
    const formModalRef = ref<any>(null)
    const modalOptions = ref<any>({
        isModalVisible: false,
        confirmLoading: false,
        message: {
            show: false,
            text: null
        }
    })

    // Метод для показа модального окна
    const showModal = () => { modalOptions.value.isModalVisible = true }

    // Метод для отображения сообщения модального окна
    function showModalMessage(message:string) {
        modalOptions.value.message.text = message
        modalOptions.value.message.show = true
    }

    // Метод для скрытия сообщения модального окна
    const modalMessageHandleClose = () => { modalOptions.value.message.show = false }

    // Метод при нажании на ОК на модальном окне
    const handleOk = () => {
        modalOptions.value.confirmLoading = true
        setTimeout(() => {
            formModalRef.value?.validate().then(() => {
                // Если валидация успешна
                modalOptions.value.isModalVisible = false
                modalOptions.value.message.show = false
            })
            .catch(() => {
                // Если валидация неуспешна
                showModalMessage('Ошибка! Проверьте правильность заполения всех полей')
            })
            modalOptions.value.confirmLoading = false
        }, 2000)
    }

    const onFinishModal = (values: any) => {
        console.log('Success:', values);
    };

    const onFinishFailedModal = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

</script>
<template>
    <a-modal 
        v-model:open="modalOptions.isModalVisible" 
        title="Форма добавления"
        :confirm-loading="modalOptions.confirmLoading" 
    >
        <!-- Сообщение по странице -->
        <a-alert closable v-if="modalOptions.message.show" type="error" :after-close="modalMessageHandleClose">
            <template #description>
                <div v-html="modalOptions.message.text"></div>
            </template>
        </a-alert>
        <a-form 
            ref="formModalRef"
            layout="vertical" 
            :model="formState"
            @finish="onFinishModal"
            @finishFailed="onFinishFailedModal"
        >
            <!-- Поле с описанием -->
            <a-form-item 
                label="Поле с описанием" 
                name="someTextWithDescription"
                style="margin-bottom: 10px;"
            >
                <a-alert message="Описание какое-то бла-бла-бла-бла-бла-бла-бла-бла-бла-бла-бла-бла-бла-бла" type="info" show-icon />
                <a-input 
                    v-model:value="formState.someTextWithDescription" 
                    placeholder="Пиши что хочешь" 
                />
            </a-form-item>

            <!-- Целое число -->
            <a-form-item
                label=" Целое число"
                name="number"
                style="margin-bottom: 10px;"
            >
                <a-input-number id="inputNumber" v-model:value="formState.number" :min="1" :max="10" />
            </a-form-item>

            <!-- Выпадающий список -->
            <a-form-item label="Выпадающий список" name="dropdownList" style="margin-bottom: 10px;" :rules="[{ required: true, message: `Вроде то же самое поле, а уже обязательное, да - так тоже можно` }]">
                <a-select 
                    v-model:value="formState.dropdownList" 
                    :filter-option="false" 
                    :options="options" 
                    show-search 
                    :virtual="true"
                    :loading="selectOptions.loading"
                    notFoundContent="Ничего не найдено"
                    placeholder="[Не указано]"
                    @popupScroll="handleScroll"
                    @search="handleSearch"
                ></a-select>
            </a-form-item>
        </a-form>
        <template #footer>
            <a-button key="ok" type="primary" @click="handleOk" :loading="modalOptions.confirmLoading" style="min-width: 80px !important;">
                <span v-if="!modalOptions.confirmLoading">OK</span>
            </a-button>
            <a-button key="cancel" type="text" @click="modalOptions.isModalVisible = false" style="min-width: 80px !important;">Отмена</a-button>
        </template>
    </a-modal>

    <a-tabs type="card" v-model:activeKey="activeTab">
        <a-tab-pane key="1" tab="Пример формы">
            <div style="display: flex !important;">
                <div style="width: 60% !important;">
                    <a-form 
                        layout="vertical" 
                        :model="formState" 
                        autocomplete="off"
                        @finish="finish"
                        @finishFailed="onFinishFailed"
                    >

                        <!-- Сообщение по странице -->
                        <a-alert closable v-if="pageMessage.show" :type="pageMessage.type" :after-close="pageMessageHandleClose">
                            <template #description>
                                <div v-html="pageMessage.message"></div>
                            </template>
                        </a-alert>

                        <!-- Название группы атрибутов -->
                        <a-typography-title :level="4">Поля для ввода</a-typography-title>

                        <!-- Забавное поле с загрузкой -->
                        <a-form-item
                            label="Забавное поле с загрузкой" 
                            name="someTextWithLoader"
                            has-feedback
                            validate-status="validating"
                            style="margin-bottom: 10px;"
                        >
                            <a-input 
                                v-model:value="formState.someTextWithLoader" 
                                placeholder="Пиши что хочешь"
                            />
                        </a-form-item>

                        <!-- Поле с описанием -->
                        <a-form-item 
                            label="Поле с описанием" 
                            name="someTextWithDescription"
                            :rules="[{ required: true, message: `Потому что потому` }]"
                            style="margin-bottom: 10px;"
                        >
                            <a-alert message="Описание какое-то бла-бла-бла-бла-бла-бла-бла-бла-бла-бла-бла-бла-бла-бла" type="info" show-icon />
                            <a-input 
                                v-model:value="formState.someTextWithDescription" 
                                placeholder="Пиши что хочешь" 
                            />
                        </a-form-item>

                        <!-- Целое число -->
                        <a-form-item
                            label=" Целое число"
                            name="number"
                            style="margin-bottom: 10px;"
                        >
                            <a-input-number id="inputNumber" v-model:value="formState.number" :min="1" :max="10" />
                        </a-form-item>

                        <!-- Выпадающий список -->
                        <a-form-item label="Выпадающий список" name="dropdownList" style="margin-bottom: 10px;">
                            <a-select 
                                v-model:value="formState.dropdownList" 
                                :filter-option="false" 
                                :options="options" 
                                show-search 
                                :virtual="true"
                                :loading="selectOptions.loading"
                                notFoundContent="Ничего не найдено"
                                placeholder="[Не указано]"
                                @popupScroll="handleScroll"
                                @search="handleSearch"
                            ></a-select>
                        </a-form-item>

                        <p style="margin-bottom: 40px; display: block; content: '';"></p>

                        <!-- Название группы атрибутов -->
                        <a-typography-title :level="4">Другое</a-typography-title>

                        <!-- Чек-бокс обычный -->
                        <a-form-item 
                            name="simpleCheckbox" 
                            style="margin-bottom: 5px;"
                        >
                            <a-checkbox v-model:checked="formState.simpleCheckbox">Тупо чекбокс</a-checkbox>
                        </a-form-item>

                        <!-- Одно из значений -->
                        <a-form-item label="Одно из значений" name="onceSelect" style="margin-bottom: 10px;">
                            <a-radio-group v-model:value="formState.onceSelect">
                                <a-radio-button value="one">Первое</a-radio-button>
                                <a-radio-button value="two">Второе</a-radio-button>
                                <a-radio-button value="three">Третье</a-radio-button>
                            </a-radio-group>
                        </a-form-item>

                        <!-- Слайдер -->
                        <a-form-item name="slider" label="Слайдер">
                            <a-slider 
                                v-model:value="formState.slider" 
                                :step="5" 
                                label="Одно из значений"
                            />
                        </a-form-item>

                        <!-- Двойная дата -->
                        <a-form-item name="range-picker" label="Двойная дата" style="margin-bottom: 10px;">
                            <a-range-picker 
                                v-model:value="formState['rangePicker']" 
                                value-format="YYYY-MM-DD"
                                :placeholder="['Дата начала', 'Дата конца']"
                            />
                        </a-form-item>

                        <!-- Кнопка сохранить форму -->
                        <a-form-item style="margin-top: 40px !important;">
                            <a-button type="primary" html-type="submit">Сохранить</a-button>
                        </a-form-item>
                    </a-form>
                </div>
                <div style="width: 40% !important; margin-left:20px;">
                    <AttrGroup 
                        :items="[
                            {'name' : 'Забавное поле с загрузкой',
                            'value' : formState.someTextWithLoader},
                            {'name' : 'Поле с описанием',
                            'value' : formState.someTextWithDescription},
                            {'name' : 'Целое число',
                            'value' : formState.number?.toString()},
                            {'name' : 'Выпадающий список',
                            'value' : formState.dropdownList},
                            {'name' : 'Тупо чекбокс',
                            'value' : formState.simpleCheckbox},
                            {'name' : 'Одно из значений',
                            'value' : formState.onceSelect},
                            {'name' : 'Слайдер',
                            'value' : formState.slider},
                            {'name' : 'Двойная дата (Начало)',
                            'value' : formState.rangePicker[0]},
                            {'name' : 'Двойная дата (Конец)',
                            'value' : formState.rangePicker[1]}
                        ]"
                    />
                </div>
            </div>
        </a-tab-pane>
        <a-tab-pane key="2" tab="Пример карточки">
            <div>
                <AttrGroup 
                    :items="[
                        {'name' : 'Забавное поле с загрузкой',
                        'value' : formState.someTextWithLoader},
                        {'name' : 'Поле с описанием',
                        'value' : formState.someTextWithDescription},
                        {'name' : 'Целое число',
                        'value' : formState.number},
                        {'name' : 'Выпадающий список',
                        'value' : formState.dropdownList},
                        {'name' : 'Тупо чекбокс',
                        'value' : formState.simpleCheckbox},
                        {'name' : 'Одно из значений',
                        'value' : formState.onceSelect},
                        {'name' : 'Слайдер',
                        'value' : formState.slider},
                        {'name' : 'Двойная дата (Начало)',
                        'value' : formState.rangePicker[0]},
                        {'name' : 'Двойная дата (Конец)',
                        'value' : formState.rangePicker[1]}
                    ]"
                >
                <a-form-item style="margin-top: -10px !important;">
                    <a-space :size="8">
                        <a-space :size="1">
                            <a-button class="cardButton" type="primary" @click="showModal"><PlusIcon/>Добавить</a-button>
                            <a-button class="cardButton" type="primary" @click="showModal"><EditIcon/>Редактировать</a-button>
                        </a-space>
                        <a-space :size="1">
                            <a-button class="cardButton" type="primary"><FilterIcon/>Фильтрация</a-button>
                            <a-button class="cardButton" type="primary"><DeleteIcon/>Удалить</a-button>
                        </a-space>
                    </a-space>
                </a-form-item>
                </AttrGroup>
            </div>
        </a-tab-pane>
    </a-tabs>

    <pre class="language-json data"></pre>
</template>