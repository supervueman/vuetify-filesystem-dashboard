<template lang="pug">
  v-list
    v-list-tile(
      v-if="!currentFile.type"
      @click="$emit('triggerForUploadFile')"
    )
      v-icon.mr-2 mdi-upload
      div Загрузить файл
    v-list-tile(
      v-if="currentFile.type"
    )
      v-icon.mr-2 mdi-download
      a.file-download(:href="currentFile.relativePath" download) Скачать файл
    v-list-tile(
      v-if="!currentFile.type"
      @click="$emit('openDialogForCreateFolder', true)"
    )
      v-icon.mr-2 folder
      div Создать папку
    v-list-tile(@click="$emit('openDialogForRemoveConfirm', true)")
      v-icon.mr-2 delete
      div Удалить
</template>

<script>
export default {
  props: {
    currentFile: {
      type: Object
    }
  }
};
</script>
