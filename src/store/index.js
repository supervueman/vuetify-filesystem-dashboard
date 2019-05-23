import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import filesystem from './filesystem';

export const store = new Vuex.Store({
  modules: {
    filesystem
  }
});
