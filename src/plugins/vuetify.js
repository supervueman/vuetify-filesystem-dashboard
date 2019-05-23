import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import 'vuetify/src/stylus/app.styl'


Vue.use(Vuetify, {
  iconfont: 'mdi', // || 'mdi', //|| 'fa' || 'fa4'

  theme: {
    primary: '#062745',
    secondary: '#4caf50',
    tertiary: '#495057',
    accent: '#82B1FF',
    error: '#f55a4e',
    info: '#00d3ee',
    success: '#5cb860',
    warning: '#ffa21a'
  }
});
