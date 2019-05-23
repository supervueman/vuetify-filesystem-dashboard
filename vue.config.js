module.exports = {
  productionSourceMap: false, // Установка в false может ускорить сборку для production, если не требуются source maps.
  css: {
    sourceMap: false // Использование source maps для CSS. Установка этого значения в true может повлиять на производительность сборки.
  },
  devServer: {
    clientLogLevel: 'debug'
  }
};
