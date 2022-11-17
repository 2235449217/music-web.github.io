// 原生源码引入
import React, { memo, useEffect, useRef } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";

import { getNewAlbumAction } from "../../store/actionCreators";
// 引入组件顺序
// 1.引入第三方组件库
import { Carousel } from "antd";
import HYAlbumCover from "@/components/album-cover";
// 2.引入组件的组件
import HYThemeHeaderRCM from "@/components/theme-header-rcm";
// 引入样式
import { AlbumWrapper } from "./style";

export default memo(function HYNewAlbum() {
  // redux hooks
  // 将数据存储到state中解构出来 ，通过hooks函数
  const { newAlbums } = useSelector(
    (state) => ({
      newAlbums: state.getIn(["recommend", "newAlbums"]),
    }),
    shallowEqual
  );
  // useDispatch hooks存储
  const dispatch = useDispatch();

  // other hooks
  //  useRef 获取dom函数
  const pageRef = useRef();
  // useEffect发起网络请求
  useEffect(() => {
    dispatch(getNewAlbumAction(10));
  }, [dispatch]);

  return (
    // 样式包裹组件
    <AlbumWrapper>
      {/* 主题组件 */}
      <HYThemeHeaderRCM title="新碟上架" />
      <div className="content">
        {/* 按钮  pageRef.current.prev() 获取当前dom调用prev方法*/}
        <button
          className="arrow arrow-left sprite_02"
          onClick={(e) => pageRef.current.prev()}
        ></button>
        <div className="album">
          {/* 轮播图组件 */}
          <Carousel dots={false} ref={pageRef}>
            {/* [0, 1]分成两组 */}
            {[0, 1].map((item) => {
              return (
                <div key={item} className="page">
                  {/* 对redux存储的数据进行截取遍历 */}
                  {newAlbums.slice(item * 5, (item + 1) * 5).map((iten) => {
                    return (
                      // 将iten==newAlbums里面的数据和size等传递进去
                      <HYAlbumCover
                        key={iten.id}
                        info={iten}
                        size={100}
                        width={118}
                        bgp="-570px"
                      />
                    );
                  })}
                </div>
              );
            })}
          </Carousel>
        </div>
        <button
          className="arrow arrow-right sprite_02"
          onClick={(e) => pageRef.current.next()}
        ></button>
      </div>
    </AlbumWrapper>
  );
});
