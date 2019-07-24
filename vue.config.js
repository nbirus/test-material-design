module.exports = {
  css: {
    loaderOptions: {
      sass: {
        data: `@import "src/styles/main.scss";`,
      },
    },
  },
  chainWebpack: config => {
    ["vue-modules", "vue", "normal-modules", "normal"].forEach((match) => {
      config.module.rule('sass').oneOf(match).use('sass-loader')
        .tap(opt => Object.assign(opt, { data: `@import 'src/styles/main.scss'` }))
    })
  }
}