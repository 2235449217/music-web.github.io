// 导入路径模块
const path = require("path");
// 路径拼接
const resolve = (dir) => path.resolve(__dirname, dir);

module.exports = {
  webpack: {
    // 配置别名
    alias: {
      "@": resolve("src"),
      components: resolve("src/components"),
    },
  },
};
