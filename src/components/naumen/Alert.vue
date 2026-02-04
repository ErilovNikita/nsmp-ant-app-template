<script setup lang="ts">
import { AlertController } from '../../utils/fileds'

const { modelValue } = defineProps<{
    modelValue: AlertController
}>()
</script>

<template>
    <a-alert 
        v-if="modelValue.visiable.value" 
        :type="modelValue.type.value" 
        :closable="modelValue.closable.value"
        :show-icon="modelValue.showIcon.value" 
        @close="modelValue.hidden()"
    >
        <template #message>
            {{ modelValue.message.value }}
        </template>
    </a-alert>
</template>