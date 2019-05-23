import Vue from 'vue';
import './plugins/vuetify'
import commonComponentsRequire from '@/functions/commonComponentsRequire';
import App from './App.vue';
import router from './routers';
import {
  store
} from './store';

commonComponentsRequire();

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
