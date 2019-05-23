import Vue from 'vue';
import Router from 'vue-router';

import paths from './paths';

/**
 * @function route
 * @param {string} path
 * @param {string} name
 * @param {component} component
 * @returns {object}
 * Функция возвращает объект роутера
 */
function route(path, name, component) {
  return {
    path,
    name,
    component: () => import(
      `@/pages/${component}.vue`
    )
  }
}

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: paths.map(path => route(path.path, path.name, path.component))
})
