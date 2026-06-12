"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  name: "MovieProfile",
  data() {
    return {
      activeTab: "wishlist",
      userInfo: {
        name: "Jessica Liu",
        handle: "@Jeje_liu",
        rank: "44920th",
        wishlist: 3,
        watching: 2,
        watched: 8
      },
      movieList: [
        {
          id: 1,
          title: "Ghana",
          rating: 7.2,
          poster: "/static/movie-ghana.jpg"
        },
        {
          id: 2,
          title: "Parasite",
          rating: 7.2,
          poster: "/static/movie-parasite.jpg"
        }
      ]
    };
  },
  methods: {
    // 切换标签
    switchTab(tab) {
      this.activeTab = tab;
    },
    // 跳转到设置页面
    goToSettings() {
      common_vendor.index.navigateTo({
        url: "/pages/settings/settings"
      });
    },
    // 电影卡片点击事件
    onMovieClick(movieId) {
      common_vendor.index.navigateTo({
        url: `/pages/movie-detail/movie-detail?id=${movieId}`
      });
    }
  }
};
if (!Array) {
  const _easycom_up_icon2 = common_vendor.resolveComponent("up-icon");
  _easycom_up_icon2();
}
const _easycom_up_icon = () => "../../node-modules/uview-plus/components/u-icon/u-icon.js";
if (!Math) {
  _easycom_up_icon();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_assets._imports_0,
    b: common_assets._imports_1,
    c: common_assets._imports_2,
    d: common_vendor.p({
      name: "arrow-right",
      size: "50rpx"
    }),
    e: common_vendor.p({
      name: "arrow-right",
      size: "50rpx"
    }),
    f: common_vendor.p({
      name: "arrow-right",
      size: "50rpx"
    }),
    g: common_vendor.p({
      name: "arrow-right",
      size: "50rpx"
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-569e925a"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/mine/index.js.map
