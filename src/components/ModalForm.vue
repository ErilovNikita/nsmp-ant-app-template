<script setup lang="ts">
import { ref } from 'vue'
import { IFormState } from '../utils/types'
import { DefaultFormState } from '../utils/config'
import { DropdownFieldObjectController } from '../utils/fileds'

const formState: IFormState = DefaultFormState
const dropdownObjectsField = new DropdownFieldObjectController("Cотрудники", 'employee$employee')

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
function showModalMessage(message: string) {
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
    console.log('Success:', values)
}

const onFinishFailedModal = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
}
</script>

<template>
    <a-modal v-model:open="modalOptions.isModalVisible" title="Форма добавления"
        :confirm-loading="modalOptions.confirmLoading">
        <!-- Сообщение по странице -->
        <a-alert closable v-if="modalOptions.message.show" type="error" :after-close="modalMessageHandleClose">
            <template #description>
                <div v-html="modalOptions.message.text"></div>
            </template>
        </a-alert>
        <a-form ref="formModalRef" layout="vertical" :model="formState" @finish="onFinishModal"
            @finishFailed="onFinishFailedModal">
            <!-- Поле с описанием -->
            <a-form-item label="Поле с описанием" name="someTextWithDescription" style="margin-bottom: 10px;">
                <a-alert message="Описание какое-то бла-бла-бла-бла-бла-бла-бла-бла-бла-бла-бла-бла-бла-бла" type="info"
                    show-icon />
                <a-input v-model:value="formState.someTextWithDescription" placeholder="Пиши что хочешь" />
            </a-form-item>

            <!-- Целое число -->
            <a-form-item label=" Целое число" name="number" style="margin-bottom: 10px;">
                <a-input-number id="inputNumber" v-model:value="formState.number" :min="1" :max="10" />
            </a-form-item>

            <!-- Выпадающий список -->
            <a-form-item :label="dropdownObjectsField.title.value" name="dropdownList" style="margin-bottom: 10px;"
                :rules="[{ required: true, message: `Вроде то же самое поле, а уже обязательное, да - так тоже можно` }]">
                <a-select v-model:value="formState.dropdownList" :filter-option="false"
                    :options="dropdownObjectsField.options" show-search :virtual="true"
                    notFoundContent="Ничего не найдено" placeholder="[Не указано]"
                    @dropdownVisibleChange="(val: boolean) => dropdownObjectsField.dropdownOpen.value = val"
                    @popupScroll="dropdownObjectsField.handleScroll"
                    @search="dropdownObjectsField.handleSearch"></a-select>
            </a-form-item>
        </a-form>
        <template #footer>
            <a-button key="ok" type="primary" @click="handleOk" :loading="modalOptions.confirmLoading"
                style="min-width: 80px !important;">
                <span v-if="!modalOptions.confirmLoading">OK</span>
            </a-button>
            <a-button key="cancel" type="text" @click="modalOptions.isModalVisible = false"
                style="min-width: 80px !important;">Отмена</a-button>
        </template>
    </a-modal>
</template>