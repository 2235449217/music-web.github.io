import request from "./request";

// // 1.封装对应的网络请求
// export function getTopBanners() {
//   return request({
//     url: "/banner",
//   });
// }
// //我们先在services文件夹中对应文件recommend.js中封装对应的网络请求的函数
// export function getHotRecommends(limit) {
//   return request({
//     url: "/personalized",
//     params: {
//       limit,
//     },
//   });
// }
// //
// export function getNewAlbums(limit) {
//   return request({
//     url: "/top/album",
//     params: {
//       limit,
//     },
//   });
// }

// export function getTopList(idx) {
//   return request({
//     url: "/toplist",
//     params: {
//       idx,
//     },
//   });
// }

export function getTopBanners() {
  return request({
    url: "/banner",
  });
}

export function getHotRecommends(limit) {
  return request({
    url: "/personalized",
    params: {
      limit,
    },
  });
}

export function getNewAlbums(limit) {
  return request({
    url: "/album/new",
    params: {
      limit,
    },
  });
}
// http://123.207.32.32:9002/playlist/detail?id=2884035
export function getTopList(id) {
  return request({
    url: "/playlist/detail",
    params: {
      id,
    },
  });
}

// export function getArtistList(limit, cat) {
//   return request({
//     url: "/artist/list",
//     params: {
//       cat,
//       limit
//     }
//   })
// }
