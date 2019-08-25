const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const PurifyCSSPlugin = require("purifycss-webpack");

exports.devServer = ({ host, port } = {}) => ({
    devServer: {
      stats: "errors-only",
      host, // 默认为 `localhost`
      port, // 默认为 8080
      open: true,
      overlay: true,
    },
  });

  /************************ 样式 ******************************/

  // 加载样式
  exports.loadCSS = ({ include, exclude } = {}) => ({
    module: {
      rules: [
        {
          test: /\.css$/,
          include,
          exclude,
  
          use: ["style-loader", "css-loader"],
        },
        {
            test: /\.scss$/,
            use: ["style-loader", "css-loader", "sass-loader"],
        },
      ],
    },
  });

// 抽离样式
  exports.extractCSS = ({ include, exclude, use = [] }) => {
    // 将 css 抽出
    const plugin = new MiniCssExtractPlugin({
      filename: "[name].css",
    });
  
    return {
      module: {
        rules: [
          {
            test: /\.css$/,
            include,
            exclude,
  
            use: [
              MiniCssExtractPlugin.loader,
            ].concat(use),
          },
        ],
      },
      plugins: [plugin],
    };
  };

// 去除未使用的样式
exports.purifyCSS = ({ paths }) => ({
  plugins: [new PurifyCSSPlugin({ paths })],
});

// 自动添加前缀
exports.autoprefix = () => ({
  loader: "postcss-loader",
  options: {
    plugins: () => [require("autoprefixer")()],
  },
});

/************************ 加载资源 ******************************/

// 加载图片
exports.loadImages = ({ include, exclude, options } = {}) => ({
  module: {
    rules: [
      {
        test: /\.(png|jpg)$/,
        include,
        exclude,
        use: {
          loader: "url-loader",
          options,
        },
      },
    ],
  },
});

// 加载javascript
exports.loadJavaScript = ({ include, exclude } = {}) => ({
  module: {
    rules: [
      {
        test: /\.js$/,
        include,
        exclude,
        use: "babel-loader",
      },
    ],
  },
});