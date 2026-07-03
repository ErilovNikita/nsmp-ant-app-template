<script setup lang="ts">
import { AlertController } from '../../domain/controllers'

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
        <template #action>
            <slot name="action"></slot>
        </template>
    </a-alert>
</template>
