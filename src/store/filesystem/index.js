const filesystem = [{
  type: 'dir',
  name: 'public',
  path: '/',
  children: [{
    type: 'file',
    name: 'image-1.jpg',
    ext: 'jpg'
  }]
}]

export default {
  namespaced: true,
  state: {
    filesystem: [],
    folderContent: []
  },
  mutations: {
    setFilesystem(state, payload) {
      state.storage = payload;
    },
    setFolderContent(state, payload) {
      state.folderContent = payload;
    }
  },
  actions: {
    /**
     * @function fetchStorage
     * @async
     * @var {Object} params
     * @var {Function} data
     * @var {Object} response
     * Функция для получения всего Storage текущего пользователя
     */
    async fetchFilesystem({
      commit
    }) {
      commit('setFilesystem', filesystem);
      commit('setFolderContent');
    },

    /**
     * @function fetchFolderContent
     * @async
     * @param {*} payload 
     */
    async fetchFolderContent({
      commit
    }, payload) {
      commit('setFolderContent', payload);
    }
  },

  getters: {
    getFilesystem(state) {
      return state.filesystem;
    },
    getFolderContent(state) {
      return state.folderContent;
    }
  }
};
