<script setup lang="ts">

const props = defineProps<{
    level?: number,
    text: string
}>()

</script>

<template>
    <a-typography-title :level="props.level || 4">{{ props.text }}</a-typography-title>
    <slot></slot>
</template>