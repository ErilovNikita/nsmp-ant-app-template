<script setup lang="ts">
import themeConfig from './themeProvider'
import { watch } from 'vue'

import { TabGroupController, TableFieldObjectController, ModalController, AlertController} from './utils/fileds'

import FullForm from './components/FullForm.vue'

import Modal from './components/naumen/Modal.vue'
import ObjectList from './components/naumen/ObjectList.vue'

import PlusIcon from './assets/icons/plus.svg'
import EditIcon from './assets/icons/edit.svg'
import DeleteIcon from './assets/icons/delete.svg'
import ArchiveIcon from './assets/icons/archive.svg'
import Alert from './components/naumen/Alert.vue'

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

const modalAlertNotification = new AlertController(false, 'info', true, 'В тестовом режиме никакие действия не производится! Объекты в NSMP не изменяются').show()
const addModal = new ModalController('Добавить сотрудника')
const editModal = new ModalController('Редактировать сотрудника')
const deleteModal = new ModalController('Удалить сотрудника')
const removeModal = new ModalController('Архивировать сотрудника')

const handleAdd = () => addModal.show()
const handleEdit = () => editModal.show()
const handleDelete = () => deleteModal.show()
const handleRemove = () => removeModal.show()

watch(
  () => usersListController.selectedRowKeys,
  (newValue: any) => console.log(`Выбрано ${newValue.length} элементов`, newValue)
)

</script>

<template>
  <a-config-provider :theme="themeConfig">
    <Modal :controller="addModal">
      <template #alert>
        <Alert :modelValue="modalAlertNotification" />
      </template>
      <template #form>
        <p>Форма добавления нового объекта</p>
      </template>
      <template #footer>
        <a-button type="primary" @click="addModal.hidden()">Сохранить</a-button>
        <a-button type="text" @click="addModal.hidden()">Отмена</a-button>
      </template>
    </Modal>

    <Modal :controller="editModal">
      <template #alert>
        <Alert :modelValue="modalAlertNotification" />
      </template>
      <template #form>
        <p>Форма редактирования объекта</p>
      </template>
      <template #footer>
        <a-button type="primary" @click="editModal.hidden()">Сохранить</a-button>
        <a-button type="text" @click="editModal.hidden()">Отмена</a-button>
      </template>
    </Modal>

    <Modal :controller="deleteModal">
      <template #alert>
        <Alert :modelValue="modalAlertNotification" />
      </template>
      <template #form>
        <a-typography-text>Вы уверены что хотите удалить объекты?</a-typography-text>
        <ul>
            <li v-for="name in usersListController.getSelectedRows().map(row => row.name)" :key="name">
              <a-typography-text type="secondary">{{ name }}</a-typography-text>
            </li>
        </ul>
      </template>
      <template #footer>
        <a-button type="primary" @click="deleteModal.hidden()">Да</a-button>
        <a-button type="text" @click="deleteModal.hidden()">Отмена</a-button>
      </template>
    </Modal>

    <Modal :controller="removeModal">
      <template #alert>
        <Alert :modelValue="modalAlertNotification" />
      </template>
      <template #form>
        <a-typography-text>Вы уверены что хотите переместить в архив объекты?</a-typography-text>
        <ul>
            <li v-for="name in usersListController.getSelectedRows().map(row => row.name)" :key="name">
              <a-typography-text type="secondary">{{ name }}</a-typography-text>
            </li>
        </ul>
      </template>
      <template #footer>
        <a-button type="primary" @click="removeModal.hidden()">Да</a-button>
        <a-button type="text" @click="removeModal.hidden()">Отмена</a-button>
      </template>
    </Modal>

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

                <a-space :size="2" v-if="usersListController.getSelectedRows().length >= 1">

                  <a-button type="primary" class="cardButton" @click="handleEdit()" v-if="usersListController.getSelectedRows().length == 1">
                    <EditIcon /> Редактировать
                  </a-button>

                  <a-button type="primary" class="cardButton" @click="handleEdit()" v-if="usersListController.getSelectedRows().length > 1">
                    <EditIcon /> Массовое редактировать
                  </a-button>

                  <a-button type="primary" class="cardButton" @click="handleDelete()">
                    <DeleteIcon /> Удалить
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