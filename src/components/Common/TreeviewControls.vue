<template lang="pug">
  v-layout.justify-space-between
    div
      v-tooltip(top)
        template(v-slot:activator="{ on }")
          v-icon.mr-2.storage-control(
            @click="$emit('openDialogForCreateFolder', true)"
            v-on="on"
          ) folder
        span Создать папку
      v-tooltip(top)
        template(v-slot:activator="{ on }")
          v-icon.mr-2.storage-control(
            v-on="on"
            @click="$emit('triggerForUploadFile')"
          ) mdi-upload
        span Загрузить файл
      v-tooltip(top v-if="currentFileType")
        template(v-slot:activator="{ on }")
          a.file-download(:href="currentFilePath" download v-on="on")
            v-icon.storage-control mdi-download
        span Скачать файл
    div
      v-tooltip(top)
        template(v-slot:activator="{ on }")
          v-icon.storage-control(@click="$emit('filesystemReload')" v-on="on") replay
        span Обновить
</template>

<script>
export default {
  props: {
    currentFileType: {
      type: String,
      default: null
    },
    currentFilePath: {
      type: String,
      default: ""
    }
  }
};
</script>
