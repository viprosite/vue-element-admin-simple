'use strict'

const path = require('path')
const defaultSettings = require('./src/settings.js')

function resolvePath(dir) {
  return path.join(__dirname, dir)
}

const name = defaultSettings.title || 'Manage System'
const port = process.env.port || 80
const version = Date.now() // 用于附加到打包后的文件名上防止发布新版本不更新

module.exports = {
  publicPath: '/',
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: false,
  devServer: {
    port: port,
    open: false,
    overlay: {
      warnings: false,
      errors: true
    }
    // before: require('./mock/mock-server.js')
    // proxy: {
    //   '/sys/': {
    //     target: `${PREFIX}/`,
    //   }
    // }
  },
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    extract: {
      // 修改打包后css文件名
      filename: `static/css/[name].${version}.css`,
      chunkFilename: `static/css/[name].${version}.css`
    }
  },
  configureWebpack: {
    name: name,
    // externals: {
    // 'vue': 'Vue',
    // 'ElementUI': 'ELEMENT',
    // 'element-ui': 'ELEMENT',
    // 'echarts': 'echarts'
    // },
    resolve: {
      alias: {
        '@': resolvePath('src'),
        'static': resolvePath('puble/static') // 下载静态文件
      }
    },
    output: { // 输出重构  打包编译后的 文件名称  【模块名称.版本号.时间戳】
      // filename: utils.assetsPath('js/[name].[chunkhash].'+Version+'js'),
      // chunkFilename: utils.assetsPath('js/[id].[chunkhash].'+Version+'js')
      filename: `static/js/[name].${version}.js`,
      chunkFilename: `static/js/[name].${version}.js`,
      globalObject: 'this'
    }
    // module: {
    //   rules: [
    //     {
    //       test: /.scss$/,
    //       use: [
    //         'style-loader',
    //         'css-loader',
    //         'sass-loader'
    //       ]
    //     }
    //   ]
    // }

    // plugins: [
    //   new CompressionPlugin({
    //     algorithm: 'gzip', // 使用gzip压缩
    //     test: /\.js$|\.html$|\.css$/, // 匹配文件名
    //     filename: '[path].gz[query]', // 压缩后的文件名(保持原文件名，后缀加.gz)
    //     minRatio: 1, // 压缩率小于1才会压缩
    //     threshold: 10240, // 对超过10k的数据压缩
    //     deleteOriginalAssets: false // 是否删除未压缩的源文件，谨慎设置，如果希望提供非gzip的资源，可不设置或者设置为false（比如删除打包后的gz后还可以加载到原始资源文件）
    //   })
    // ]
  },
  chainWebpack(config) {
  //   // it can improve the speed of the first screen, it is recommended to turn on preload
  //   config.plugin('preload').tap(() => [
  //     {
  //       rel: 'preload',
  //       // to ignore runtime.js
  //       // https://github.com/vuejs/vue-cli/blob/dev/packages/@vue/cli-service/lib/config/app.js#L171
  //       fileBlacklist: [/\.map$/, /hot-update\.js$/, /runtime\..*\.js$/],
  //       include: 'initial'
  //     }
  //   ])

    //   // when there are many pages, it will cause too many meaningless requests
    //   config.plugins.delete('prefetch')

    //   // img的文件名修改
    //   config.module
    //     .rule('images')
    //     .use('url-loader')
    //     .tap(options => {
    //       options.name = `static/img/[name]-[hash:8].${version}.[ext]`
    //       options.fallback = {
    //         loader: 'file-loader',
    //         options: {
    //           name: `static/img/[name]-[hash:8].${version}.[ext]`
    //         }
    //       }
    //       return options
    //     })

  //   // set svg-sprite-loader
  //   config.module
  //     .rule('svg')
  //     .exclude.add(resolvePath('src/icons'))
  //     .end()
  //   config.module
  //     .rule('icons')
  //     .test(/\.svg$/)
  //     .include.add(resolvePath('src/icons'))
  //     .end()
  //     .use('svg-sprite-loader')
  //     .loader('svg-sprite-loader')
  //     .options({
  //       symbolId: 'icon-[name]'
  //     })
  //     .end()
  //   config
  //     .when(process.env.NODE_ENV !== 'development',
  //       config => {
  //         config
  //           .plugin('ScriptExtHtmlWebpackPlugin')
  //           .after('html')
  //           .use('script-ext-html-webpack-plugin', [{
  //             // `runtime` must same as runtimeChunk name. default is `runtime`
  //             inline: /runtime\..*\.js$/
  //           }])
  //           .end()
  //         config
  //           .optimization.splitChunks({
  //             chunks: 'all',
  //             cacheGroups: {
  //               libs: {
  //                 name: 'chunk-libs',
  //                 test: /[\\/]node_modules[\\/]/,
  //                 priority: 10,
  //                 chunks: 'initial' // only package third parties that are initially dependent
  //               },
  //               elementUI: {
  //                 name: 'chunk-elementUI', // split elementUI into a single package
  //                 priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
  //                 test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
  //               },
  //               commons: {
  //                 name: 'chunk-commons',
  //                 test: resolvePath('src/components'), // can customize your rules
  //                 minChunks: 3, //  minimum common number
  //                 priority: 5,
  //                 reuseExistingChunk: true
  //               }
  //             }
  //           })
  //         // https:// webpack.js.org/configuration/optimization/#optimizationruntimechunk
  //         config.optimization.runtimeChunk('single')
  //       }
  //     )
  }
}

