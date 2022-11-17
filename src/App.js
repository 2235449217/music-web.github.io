// 最上方的导入第三方文件
import React, { memo, Suspense } from "react";
// 共享数据
import { Provider } from "react-redux";

import { renderRoutes } from "react-router-config";

// 中间部分导入工具类或者功能性eg.网路请求-actionCreators-utils
import routes from "./router";
// 引入store
import store from "./store";

// 下方部分导入组件
import { HashRouter } from "react-router-dom";

import HYAppHeader from "@/components/app-header";
import HYAppFooter from "@/components/app-footer";

import HYAppPlayerBar from "./pages/player/app-player-bar";

export default memo(function App() {
  return (
    <Provider store={store}>
      <HashRouter>
        <HYAppHeader></HYAppHeader>
        <Suspense fallback={<div>page loading</div>}>
          {renderRoutes(routes)}
        </Suspense>
        <HYAppFooter></HYAppFooter>
        <HYAppPlayerBar />
      </HashRouter>
    </Provider>
  );
});
