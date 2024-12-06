<script setup lang="ts">
    defineProps<{ 
        type: string,
        text: string
    }>()
</script>

<template>
    <a-alert :message="text" :type="type" show-icon />
</template>