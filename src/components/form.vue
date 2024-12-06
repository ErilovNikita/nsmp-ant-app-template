<script lang="ts" setup>
    import { ref } from 'vue';
    import { reactive } from 'vue';
    import type { UnwrapRef } from 'vue';
    import type { SelectProps } from 'ant-design-vue';
    import Alert from './alert.vue';

    interface FormState {
        someTextWithLoader: string;
        someTextWithDescription: string;
        simpleCheckbox: boolean;
        dropdownList: string;
    }

    const formState:UnwrapRef<FormState> = reactive({
        someTextWithLoader: '',
        someTextWithDescription: '',
        simpleCheckbox: false,
        dropdownList: 'empty'
    });

    const filterOption = (input: string, option: any) => {
        return option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0;
    };

    const options = ref<SelectProps['options']>([
        { value: 'empty', label: '[Не выбрано]' },
        { value: 'employee$1', label: 'Иван 1' },
        { value: 'employee$2', label: 'Иван 2' },
        { value: 'employee$3', label: 'Иван 3' },
    ]);

    function finish() {
        const dataBlock:any = document.querySelector('.data')
        dataBlock.innerHTML = syntaxHighlight(JSON.stringify(formState, undefined, 4))
    }

    function onFinishFailed() {
        console.log('Err')
    }

    function syntaxHighlight(json:string) {
        json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
            var cls = 'number';
            if (/^"/.test(match)) {
                if (/:$/.test(match)) {
                    cls = 'key';
                } else {
                    cls = 'string';
                }
            } else if (/true|false/.test(match)) {
                cls = 'boolean';
            } else if (/null/.test(match)) {
                cls = 'null';
            }
            return '<span class="' + cls + '">' + match + '</span>';
        });
    }
    function t(text:string) {
        console.log(text)
    }
</script>
<template>
    <a-typography-title :level="4">
        Основная информация
        <a-button class="defaultButton" type="primary">➕ Добавить</a-button>
    </a-typography-title>
    <a-form 
        :layout="'vertical'" 
        :model="formState" 
        autocomplete="off"
        @finish="finish"
        @finishFailed="onFinishFailed"
    >
        <a-form-item
            label="Забавное поле с загрузкой" 
            name="someTextWithLoader"
            class="field" 
            has-feedback
            validate-status="validating"
        >
            <a-input 
                v-model:value="formState.someTextWithLoader" 
                placeholder="Пиши что хочешь"
            />
        </a-form-item>

        <a-form-item 
            label="Поле с описанием" 
            name="someTextWithDescription"
            class="field"
            :rules="[{ required: formState.someTextWithLoader, message: `Потому что поле выше - ${formState.someTextWithLoader}` }]"
        >
            <Alert 
                type="info" 
                text="Описание какое-то бла-бла-бла-бла-бла-бла-бла-бла-бла-бла-бла-бла-бла-бла"
            />
            <a-input 
                :change="t(formState.someTextWithDescription)"
                v-model:value="formState.someTextWithDescription" 
                placeholder="Пиши что хочешь" 
            />
        </a-form-item>

        <a-form-item 
            name="simpleCheckbox" 
            class="checkbox"
        >
            <a-checkbox v-model:checked="formState.simpleCheckbox">Тупо чекбокс</a-checkbox>
        </a-form-item>

        <a-form-item 
            label="Выпадающий список" 
            name="dropdownList"
        >
            <a-select 
                v-model:value="formState.dropdownList" 
                show-search 
                :filter-option="filterOption" 
                :options="options"
            ></a-select>
        </a-form-item>

        <a-form-item>
            <a-button type="primary" html-type="submit">Сохранить</a-button>
        </a-form-item>
    </a-form>
    <pre class="language-json data"></pre>
</template>
  

<style scoped>
    .field {
        margin-bottom: 15px !important;
    }
    .checkbox {
        margin-bottom: 10px;
    }
</style>
  