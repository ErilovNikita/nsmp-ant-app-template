<script setup lang="ts">
import themeConfig from './themeProvider'
import { watch } from 'vue'

import { TabGroupController, TableFieldObjectController } from './utils/fileds'

import FullForm from './components/FullForm.vue'
import ModalForm from './components/ModalForm.vue'
import ObjectList from './components/naumen/ObjectList.vue'

import PlusIcon from './assets/icons/plus.svg'
import EditIcon from './assets/icons/edit.svg'
import DeleteIcon from './assets/icons/delete.svg'
import ArchiveIcon from './assets/icons/archive.svg'


const tabGroupController = new TabGroupController()
const usersListController = new TableFieldObjectController({
  metaClass: 'employee$employee',
  enableSelection: true,
  pageSize: 20,
  columns: [
    { title: 'Имя', dataIndex: 'name', width: 300 },
    { title: 'UUID', dataIndex: 'id', width: 300 },
  ],
})

const handleAdd = () => alert('Добавить запись')
const handleEdit = () => alert('Изменить запись')
const handleDelete = () => alert('Удалить запись')
const handleRemove = () => alert('Архивировать запись')

watch(
  () => usersListController.selectedRowKeys,
  (newValue: any) => console.log(`Выбрано ${newValue.length} элементов`, newValue)
)

</script>

<template>
  <a-config-provider :theme="themeConfig">
    <ModalForm />
    <a-tabs type="card" :activeKey="tabGroupController.activeTab">

      <a-tab-pane key="1" tab="Пример формы">
        <FullForm />
      </a-tab-pane>

      <a-tab-pane key="2" tab="Список обьектов">
        <ObjectList :show-title="false" :controller="usersListController">
          <template v-slot:start>
            <div style="margin-left: -5px;">

              <a-space :size="8">
                <a-space :size="2">
                  <a-button type="primary" class="cardButton" @click="handleAdd()">
                    <PlusIcon /> Добавить
                  </a-button>
                </a-space>

                <a-space :size="2" v-if="usersListController.getSelectedRows().length == 1">
                  <a-button type="primary" class="cardButton" @click="handleEdit()">
                    <EditIcon /> Редактировать
                  </a-button>
                  <a-button type="primary" class="cardButton" @click="handleDelete()">
                    <DeleteIcon /> Удалить
                  </a-button>
                </a-space>

                <a-space :size="2" v-if="usersListController.getSelectedRows().length > 1">
                  <a-button type="primary" class="cardButton" @click="handleEdit()">
                    <EditIcon /> Массовое редактировать
                  </a-button>
                </a-space>

                <a-space :size="2" v-if="usersListController.getSelectedRows().length >= 1">
                  <a-button type="primary" class="cardButton" @click="handleRemove()">
                    <ArchiveIcon /> Переместить в архив
                  </a-button>
                </a-space>
              </a-space>
            </div>
          </template>
        </ObjectList>
      </a-tab-pane>

    </a-tabs>
  </a-config-provider>
</template>