const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({


  transpileDependencies: [

  ],

  pluginOptions: {
   
  },

  pwa: {
    name: 'Health Care',
    themeColor: '#4DBA87',
    msTileColor: '#000000',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',
    workboxPluginMode: 'GenerateSW'
  }
})
