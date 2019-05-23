const filesystem = [{
  type: 'dir',
  name: 'files',
  path: '/',
  children: [{
      type: 'file',
      name: 'image-1.jpg',
      ext: 'jpg',
      path: 'files/image-1.jpg'
    },
    {
      type: 'file',
      name: 'image-2.jpg',
      ext: 'jpg',
      path: 'files/image-2.jpg'
    },
    {
      type: 'dir',
      name: 'images',
      path: '/images',
      children: [{
          type: 'file',
          name: 'image-3.jpg',
          ext: 'jpg',
          path: 'files/images/image-3.jpg'
        },
        {
          type: 'file',
          name: 'image-4.jpg',
          ext: 'jpg',
          path: 'files/images/image-4.jpg'
        }
      ]
    }
  ]
}]

export default {
  namespaced: true,
  state: {
    filesystem: [],
    folderContent: []
  },
  mutations: {
    setFilesystem(state, payload) {
      state.filesystem = payload;
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
      console.log(state.filesystem)
      return state.filesystem;
    },
    getFolderContent(state) {
      return state.folderContent;
    }
  }
};
