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
      spinning: props.controller.loading.value,
      tip: 'Загрузка данных…'
    }" 
    :pagination="{
      current: 1,
      pageSize: props.controller.uiPageSize.value,
      total: props.controller.allData.value.length + props.controller.apiPageSize,
      showSizeChanger: true,
      onChange: (page: number) => props.controller.getTableDataForPage(page),
      onShowSizeChange: (current: number, size: number) => props.controller.changePageSize(size, current)
    }" 
    :row-selection="props.controller.rowSelection" 
  />
</template>