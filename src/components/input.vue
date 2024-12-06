<script lang="ts" setup>
    import { watch, ref } from 'vue';

    const value = ref<string>('');

    watch(value, () => {
        console.log(value.value);
    });
</script>


<template>
    <a-space direction="vertical">
        <a-input v-model:value="value" placeholder="" />
    </a-space>
</template>
  

<style scoped>
    a-input {
        width: 300px !important;
    }
</style>