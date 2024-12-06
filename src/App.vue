<script setup lang="ts">
  import themeConfig from './themeProvider'; 
  // import Collapse from './components/collapse.vue';
  // import InputField from './components/input.vue';
  import Form from './components/form.vue';

</script>

<template>
  <a-config-provider :theme="themeConfig" >
    <!-- <Collapse :headerTitle="'Группа атрибутов'">
      <div><span>fdvdfbvdfgbvdftv</span></div>
      <InputField/>
    </Collapse> -->
    <Form/>
  </a-config-provider>
</template>

<!-- <style scoped>
</style> -->
