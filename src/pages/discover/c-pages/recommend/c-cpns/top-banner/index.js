// react 和对应的hooks函数
import React, { memo, useEffect, useRef, useCallback, useState } from "react";
// redux依赖
import { useSelector, useDispatch, shallowEqual } from "react-redux";
// getTopBannersAction 方法
import { getTopBannerAction } from "../../store/actionCreators";
// 样式
import { BannerWrapper, BannerLeft, BannerRight, BannerControl } from "./style";
// antd 组件轮播图
import { Carousel } from "antd";
export default memo(function HYTopBanner() {
  //1. state
  const [currentIndex, setCurrentIndex] = useState(0);

  //2. 组件和redux关联: 获取数据和进行操作
  const { topBanners } = useSelector(
    (state) => ({
      // topBanners: state.get("recommend").get("topBanners")
      topBanners: state.getIn(["recommend", "topBanners"]),
    }),
    shallowEqual
  );
  const dispatch = useDispatch();
  // 3.其他hooks
  //     {/*  ref 操作Carousel组件*/}
  const bannerRef = useRef();
  // 网络请求
  useEffect(() => {
    dispatch(getTopBannerAction());
  }, [dispatch]);
  //   把我们的函数作为一个参数传递到下一个组件里面，一定要对我们的函数进行useCallback ，对我们的缓存进行记忆
  const bannerChange = useCallback((from, to) => {
    setTimeout(() => {
      setCurrentIndex(to);
    }, 0);
  }, []);

  // 4.其他业务逻辑
  const bgImage =
    topBanners[currentIndex] &&
    topBanners[currentIndex].imageUrl + "?imageView&blur=40x20";

  return (
    // bgImage将图片地址传递给style.js中 props属性里  background: url(${(props) => props.bgImage}) center center/6000px;
    <BannerWrapper bgImage={bgImage}>
      <div className="banner wrap-v2">
        <BannerLeft>
          {/*  ref 操作Carousel组件*/}
          <Carousel
            effect="fade"
            autoplay
            ref={bannerRef}
            beforeChange={bannerChange}
          >
            {topBanners.map((item, index) => {
              return (
                <div className="banner-item" key={item.imageUrl}>
                  <img
                    className="image"
                    src={item.imageUrl}
                    alt={item.typeTitle}
                  />
                </div>
              );
            })}
          </Carousel>
        </BannerLeft>
        <BannerRight></BannerRight>
        <BannerControl>
          <button
            className="btn left"
            //{/*  ref 操作Carousel组件*/}
            onClick={(e) => bannerRef.current.prev()}
          ></button>
          <button
            className="btn right"
            onClick={(e) => bannerRef.current.next()}
          ></button>
        </BannerControl>
      </div>
    </BannerWrapper>
  );
});
