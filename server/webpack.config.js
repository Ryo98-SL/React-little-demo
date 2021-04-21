const path = require('path');
const HtmlWebpack = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports ={
    entry:'./webpackTest/src/index.js',
    output: {
        path: path.resolve(__dirname, 'webpackTest/dist'),
        filename: 'bundle.js',
      },
      devtool:'source-map',
      module:{
          rules:[
              {
                  test:/\.(png|jpe?g|gif)$/i,
                  use: [
                    {
                      loader: 'file-loader',
                      options:{
                          name: '[name]_[hash].[ext]',
                          outputPath:'./images',
                          publicPath: '/webpackTest/dist/images'
                      }
                    },
                  ],
              },
              {
                test: /\.css$/i,
                use: [
                  // "style-loader"
                  MiniCssExtractPlugin.loader
                  , {
                    loader:'css-loader',
                    options:{
                        url:true,
                        import:true,
                        sourceMap:false
                    }
                }]
              }
          ]
      },
      plugins:[new HtmlWebpack({
        template:'webpackTest/src/public/index.html',
        filename:'index.html'
      }),
      new MiniCssExtractPlugin({filename:'bundle.css'})
    ]

  ,
      devServer: {
        // contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9000,
        hot:true,
        hotOnly:true,
        open:true,
        proxy:{
          '^/api':{
            target:'localhost:8888/',
            pathRewrite:{
              '^/api':''
            }
          }
        }
      }
}