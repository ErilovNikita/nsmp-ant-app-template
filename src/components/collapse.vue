<script lang="ts" setup>
    defineProps<{ 
        headerTitle: string 
    }>()
</script>


<template>
    <a-collapse :bordered="false">
        <a-collapse-panel key="1" :header="headerTitle">
            <slot></slot>
        </a-collapse-panel>
    </a-collapse>
</template>
  