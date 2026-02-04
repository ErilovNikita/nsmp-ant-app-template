<script setup lang="ts">
import themeConfig from './themeProvider'

import { TabGroupController } from './utils/fileds'

import FullForm from './components/FullForm.vue'
import ModalForm from './components/ModalForm.vue'
import ObjectList from './components/naumen/ObjectList.vue'

const tabGroupController = new TabGroupController()
</script>

<template>
  <a-config-provider :theme="themeConfig">
    <ModalForm />
    <a-tabs type="card" :activeKey="tabGroupController.activeTab">

      <a-tab-pane key="1" tab="Пример формы">
        <FullForm />
      </a-tab-pane>

      <a-tab-pane key="2" tab="Список обьектов">
        <ObjectList />
      </a-tab-pane>
      
    </a-tabs>
  </a-config-provider>
</template>