const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave:false,
  // devServer: {
  //   proxy: {
  //     '/api': {
  //       target: 'https://47.115.206.215:7860', // 目标服务器的地址
  //       changeOrigin: true, // 允许改变请求头中的Origin属性，用于支持跨域
  //     },
  //   },
  // },
})
