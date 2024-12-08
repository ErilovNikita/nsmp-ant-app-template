<script lang="ts" setup>
    import { ref } from 'vue'

    interface IItem {
        name: string
        value: any
    }

    const props = defineProps<{
        defaultOpen?: Boolean,
        items: Array<IItem>
    }>()

    const showCollapse = ref(['1'])
    if ( !props.defaultOpen == false) {
        showCollapse.value = []
    }

</script>

<template>
    <a-collapse ghost v-model:activeKey="showCollapse">
        <a-collapse-panel key="1" header="Параметры на форме" >
            <a-form
                :label-col="{ style: { width: '225px', textAlign: 'left' } }"
                layout="horizontal"
            >
                <slot></slot>
                <a-form-item 
                    v-for="item in items"
                    :label="item.name" 
                    style="margin-bottom: -10px;"
                >
                    <a-typography-text>{{ item.value }}</a-typography-text>
                </a-form-item>
            </a-form>
        </a-collapse-panel>
    </a-collapse>
</template>