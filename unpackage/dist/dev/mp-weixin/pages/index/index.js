"use strict";
const common_vendor = require("../../common/vendor.js");
const api_index = require("../../api/index.js");
const fab = () => "../../common/fab.js";
const _sfc_main = {
  components: {
    fab
  },
  data() {
    return {
      // 轮播图数据
      swiperList: common_vendor.reactive([]),
      // 作品分类数据
      categoryList: common_vendor.reactive([]),
      // 视频数据
      videoList: [
        { url: "https://cdnfile.xiangfeiyue.com:8083/uploads/st202305261477f2/adv/20230530/1a701eae28d8f5903d241e3b3f6b07bf.mp4", poster: "https://cdnfile.xiangfeiyue.com:8083/uploads/st202305261477f2/adv/20230530/thumb_64e3fa0374d875ce15f5c8e80f6feade.jpg" }
      ],
      currentTab: 0
    };
  },
  onLoad() {
    this.getData();
  },
  methods: {
    getData() {
      api_index.getHomeData().then((res) => {
        this.swiperList = res.data.swiper;
        this.categoryList = res.data.category;
        common_vendor.index.__f__("log", "at pages/index/index.vue:97", "首页数据", res);
      }).catch((err) => {
        common_vendor.index.__f__("log", "at pages/index/index.vue:99", "请求失败", err);
      });
    }
  }
};
if (!Array) {
  const _easycom_up_swiper2 = common_vendor.resolveComponent("up-swiper");
  const _easycom_up_lazy_load2 = common_vendor.resolveComponent("up-lazy-load");
  const _component_fab = common_vendor.resolveComponent("fab");
  (_easycom_up_swiper2 + _easycom_up_lazy_load2 + _component_fab)();
}
const _easycom_up_swiper = () => "../../node-modules/uview-plus/components/u-swiper/u-swiper.js";
const _easycom_up_lazy_load = () => "../../node-modules/uview-plus/components/u-lazy-load/u-lazy-load.js";
if (!Math) {
  (_easycom_up_swiper + _easycom_up_lazy_load)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      list: $data.swiperList,
      autoplay: false,
      height: "100vh"
    }),
    b: common_vendor.f($data.categoryList, (item, idx, i0) => {
      return common_vendor.e({
        a: "1cf27b2a-1-" + i0,
        b: common_vendor.p({
          threshold: "-100",
          image: item.image,
          ["img-mode"]: "aspectFill"
        }),
        c: common_vendor.t(item.name),
        d: item.nickname
      }, item.nickname ? {
        e: common_vendor.t(item.nickname)
      } : {}, {
        f: idx
      });
    }),
    c: common_vendor.f($data.videoList, (item, idx, i0) => {
      return {
        a: item.url,
        b: item.poster,
        c: idx
      };
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-1cf27b2a"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/index.js.map
