import Vue from 'vue';

export default () => {
  const requireComponent = require.context(
    // Относительный путь до каталога компонентов
    '@/components/Common',
    // Обрабатывать или нет подкаталоги
    false,
    // Регулярное выражение для определения файлов базовых компонентов
    /[A-Z]\w+\.(vue)$/
  )

  requireComponent.keys().forEach(fileName => {
    const componentConfig = requireComponent(fileName);

    const componentName = fileName.split('/')
      .pop()
      .replace(/\.\w+$/, '');

    Vue.component(
      componentName,
      componentConfig.default || componentConfig
    )
  });
}
