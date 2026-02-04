<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { DropdownFieldObjectController } from '../../utils/fileds'
import type { ColumnsType } from 'ant-design-vue/es/table'

interface IRecord {
  key: number
  name: string
}

const tableData = ref<IRecord[]>([])

const columns: ColumnsType<IRecord> = [
  { title: 'Имя', dataIndex: 'name', width: 300 },
  { title: 'UUID', dataIndex: 'id', width: 300 }
]

const rowSelection = ref({
  checkStrictly: false,
  onChange: (selectedRowKeys: (string | number)[], selectedRows: IRecord[]) => {
    console.log('selectedRowKeys', selectedRowKeys)
    console.log('selectedRows', selectedRows)
  },
})

const dropdownController = new DropdownFieldObjectController('Users', 'employee$employee')

const loadTableData = async () => {
  try {
    await dropdownController.loadData()
    tableData.value = dropdownController.options.value.map((item: any, index: number) => ({
      key: index,
      name: item.label,
      id: item.value
    }))
  } catch (e) {
    console.error(e)
  }
}

onMounted(() => {
  loadTableData()
})
</script>

<template>
  <a-form-item style="margin-bottom: 10px;">
    <a-space>
      <a-button type="primary">Добавить</a-button>
    </a-space>
  </a-form-item>

  <a-table
    :columns="columns"
    :data-source="tableData"
    :pagination="{ pageSize: 20 }"
    :row-selection="rowSelection"
  />
</template>