<template lang="pug">
  v-layout.wrap
    v-flex.xl12.lg12.md12
      v-card.xl12.lg12.md12
        v-card-title.pb-0
          v-layout.column
            div.mb-2 Current path: {{currentFullPath}}
        v-card-text
          v-layout
            v-flex.xl3.lg3.md3
              v-layout.column
                v-flex.mb-4
                  v-layout.justify-space-between
                    div
                      v-tooltip(top)
                        template(v-slot:activator="{ on }")
                          v-icon.mr-2.storage-control(
                            @click="isCreateFolderDialog = true"
                            v-on="on"
                          ) folder
                        span Create folder
                      v-tooltip(top)
                        template(v-slot:activator="{ on }")
                          v-icon.mr-2.storage-control(
                            v-on="on"
                            @click="triggerForUploadFile"
                          ) mdi-upload
                        span Upload file
                      v-tooltip(top v-if="currentFile.type")
                        template(v-slot:activator="{ on }")
                          a.file-download(:href="currentFile.path" download v-on="on")
                            v-icon.storage-control mdi-download
                        span Download file
                    div
                      v-tooltip(top)
                        template(v-slot:activator="{ on }")
                          v-icon.storage-control(@click="filesystemReload" v-on="on") replay
                        span Reload
                v-flex.xl3.lg3.md3
                  v-treeview(
                    v-model="tree"
                    :open.sync="open"
                    :items="filesystem"
                    activatable
                    item-key="name"
                    open-on-click
                    return-object
                    hoverable
                    transition
                    active-class="primary--text"
                  )
                    template(v-slot:prepend="{ item, open }")
                      div.treeview-node-overlay(
                        :class="{'active-treeview-node': currentFullPath === item.path}"
                        @click="fetchFolderContent(item)"
                        @contextmenu.prevent="fetchContextMenu($event, item)"
                      )
                      v-icon(
                        v-if="item.type === 'dir'"
                        :color="open ? 'primary' : ''"
                      ) {{ open ? 'mdi-folder-open' : 'mdi-folder' }}
                      v-icon(
                        v-else :color="open ? 'primary' : ''"
                      ) {{ files[item.ext] }}
            v-divider.mx-2(vertical)
            v-layout.row.wrap(fill-height align-start justify-start)
              v-flex.py-2.px-2(
                xl3 lg2 md4 sm2 xs2
                v-for="(file, i) in folderContent"
                :key="i"
                v-if="file.type === 'file'"
              )
                v-card(
                  @click="fetchFolderContent(file)"
                  @contextmenu.prevent="fetchContextMenu($event, file)"
                  @dblclick="selectFile(file)"
                )
                  v-img(
                    :src="`/static/${file.path}`"
                    aspect-ratio="1"
                  )
                  v-flex.px-2.file-name(
                    :class="{'active-card-file': currentFullPath === file.path}"
                  ) {{file.path}}
      v-menu(
        v-model="isContext"
        :position-x="x"
        :position-y="y"
        absolute
        offset-y
      )
        v-list
          v-list-tile(
            v-if="!currentFile.type"
            @click="triggerForUploadFile"
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
            @click="isCreateFolderDialog = true"
          )
            v-icon.mr-2 folder
            div Создать папку
          v-list-tile(@click="isRemoveConfirmDialog = true")
            v-icon.mr-2 delete
            div Удалить
    v-dialog(v-model="isRemoveConfirmDialog" max-width="500px")
      remove-confirm(
        @remove="removeFileOrFolder"
        :name="currentFullPath"
        :isActive.sync="isRemoveConfirmDialog"
      )
    v-dialog(v-model="isCreateFolderDialog" max-width="500px")
      create-folder(
        :isActive.sync="isCreateFolderDialog"
        @createFolder="createFolder"
      )
    input(
      class="input-file"
      type="file"
      ref="file"
      multiple
      v-on:change="uploadFiles"
    )
</template>

<script>
export default {
  data: () => ({
    open: [],
    tree: [],
    files: {
      html: "mdi-language-html5",
      js: "mdi-nodejs",
      json: "mdi-json",
      md: "mdi-markdown",
      pdf: "mdi-file-pdf",
      png: "mdi-file-image",
      jpg: "mdi-file-image",
      jpeg: "mdi-file-image",
      txt: "mdi-file-document-outline",
      xls: "mdi-file-excel"
    },
    currentFolder: {},
    currentFile: {},
    currentFullPath: "/",
    currentFolderPath: "/",
    isContext: false,
    x: 0,
    y: 0,
    isRemoveConfirmDialog: false,
    isCreateFolderDialog: false,

    folderData: {
      type: "dir",
      path: "/",
      name: "",
      ext: "",
      children: []
    },
    fileData: {
      type: "file",
      path: "/",
      ext: "",
      name: ""
    }
  }),
  computed: {
    filesystem() {
      return this.$store.getters["filesystem/getFilesystem"];
    },
    folderContent() {
      return this.$store.getters["filesystem/getFolderContent"];
    }
  },
  beforeCreate() {
    this.$store.dispatch("filesystem/fetchFilesystem");
  },
  methods: {
    /**
     * @function fetchFolderContent
     * @var {Array} directoriesFile
     * @var {Object} dir
     * @var {Array} filesystem
     * Функция для получения файлов текущей директории
     * Если тип === file то вызывается рекурсивная функция
     * для поиска директории в которой находится файл
     */
    fetchFolderContent(item) {
      if (item.type === "file") {
        const directoriesArr = item.path.split("/").slice(this.length, -1);

        let dir = {};
        let filesystem = this.filesystem;

        function searchDirectory() {
          if (directoriesArr.length > 0) {
            filesystem.forEach((item, i) => {
              if (item.type === "dir") {
                directoriesArr.forEach((el, j) => {
                  if (item.name === el) {
                    filesystem = item.children;
                    dir = item;
                    directoriesArr.splice(j, 1);
                    return;
                  }
                });
              }
            });
            searchDirectory();
          } else {
            return;
          }
        }
        searchDirectory();
        this.$store.dispatch("filesystem/fetchFolderContent", dir.children);
        this.currentFolder = dir;
        this.currentFile = item;
        this.currentFolderPath = dir.path;
      } else {
        this.$store.dispatch("filesystem/fetchFolderContent", item.children);
        this.currentFolder = item;
        this.currentFile = {};
        this.currentFolderPath = item.path;
      }
      this.currentFullPath = item.path;
    },

    fetchContextMenu(event, item) {
      this.x = event.clientX;
      this.y = event.clientY;
      this.isContext = true;
      this.fetchFolderContent(item);
    },

    selectFile(file) {
      console.log(file);
      this.$emit("selectFile", file);
    },

    uploadFiles() {
      console.log(this.currentFolderPath);
      const files = this.$refs.file.files;
      const formData = new FormData();
      for (let i = 0; i < files.length; i++) {
        formData.append("file", files[i]);
      }
    },

    createFolder(folderName) {
      console.log(folderName);
      console.log(this.currentFolderPath);
      this.isCreateFolderDialog = false;
      this.$store.dispatch("filesystem/fetchFilesystem");
      this.fetchFolderContent(this.currentFolder);
    },

    removeFileOrFolder() {
      console.log(this.curentFolderPath);
      console.log(this.currentFullPath);
      console.log(this.currentFile);
      console.log(this.currentFolder);
    },

    filesystemReload() {
      this.currentFolder = {};
      this.currentFile = {};
      this.currentFullPath = "/";
      this.curentFolderPath = "/";
      this.open = [];
      this.$store.dispatch("filesystem/fetchFilesystem");
    },

    triggerForUploadFile() {
      this.$refs.file.click();
    }
  }
};
</script>

<style lang="sass">
.v-treeview-node__root
  position: relative
.treeview-node-overlay
  position: absolute
  top: 0
  left: 0
  width: 100%
  height: 100%
.file-name
  white-space: nowrap
  overflow: hidden
  text-overflow: ellipsis
.storage-control
  cursor: pointer
.active-treeview-node
  background-color: rgba(lightgrey, 0.5)
.active-card-file
  background-color: #062745
  color: #fff
.input-file
  display: none
.file-download
  text-decoration: none
</style>
