<script setup lang="ts">
import { onMounted } from 'vue'
import Caption from './Caption.vue'
import type { TableFieldObjectController } from '../../utils/fileds'

const props = defineProps<{
  title?: string | null
  showTitle?: boolean
  controller: TableFieldObjectController
}>()

const emit = defineEmits<{
  (e: 'selection-change'): void
}>()

onMounted(() => props.controller.refresh())
</script>

<template>
  <Caption v-if="props.title && props.showTitle == true" :text="props.title" />
  <p v-if="props.title && props.showTitle == true"></p>
  
  <slot name="start"></slot>

  <a-table
    :columns="props.controller.columns"
    :data-source="props.controller.tableData.value"
    :loading="{
      spinning: controller.loading.value,
      tip: 'Загрузка данных…'
    }"
    :pagination="{ pageSize: props.controller.pageSize }"
    :row-selection="props.controller.rowSelection"
  />
</template>