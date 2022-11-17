import React, { memo } from "react";

import HYTopBanner from "./c-cpns/top-banner";
import HYHotRecommend from "./c-cpns/hot-recommend";
import HYNewAlbum from "./c-cpns/new-album";
import HYRecommendRanking from "./c-cpns/recommend-ranking";
import HYUserLogin from "./c-cpns/user-login";
import HYSettleSinger from "./c-cpns/settle-singer";
import HYHotAnchor from "./c-cpns/hot-anchor";
import {
  RecommendWrapper,
  Content,
  RecommendLeft,
  RecommendRight,
} from "./style";

function HYRecommend(props) {
  return (
    <RecommendWrapper>
      <HYTopBanner />
      <Content className="wrap-v2">
        <RecommendLeft>
          <HYHotRecommend />
          <HYNewAlbum />
          <HYRecommendRanking />
        </RecommendLeft>
        <RecommendRight>
          <HYUserLogin />
          <HYSettleSinger />
          <HYHotAnchor />
        </RecommendRight>
      </Content>
    </RecommendWrapper>
  );
}
export default memo(HYRecommend);

// const mapStateToProps = (state) => ({
//   topBanners: state.recommend.topBanners,
// });
// // 2.通过dispatch拿到对象拿到数据
// const mapDispatchToProps = (dispatch) => ({
//   getBanners: () => {
//     dispatch(getTopBannersAction());
//   },
// });
// // 2.调用函数通过中间件发起网路请求
// export default connect(mapStateToProps, mapDispatchToProps)(memo(HYRecommend));
