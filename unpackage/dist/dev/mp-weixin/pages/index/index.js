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
      // 地图坐标
      latitude: 28.31,
      longitude: 109.74,
      markers: [{
        id: 1,
        latitude: 28.31,
        longitude: 109.74,
        title: "小脚丫丫",
        iconPath: "/static/loc.png",
        width: 32,
        height: 32
      }],
      swiperList: common_vendor.reactive([]),
      categoryList: common_vendor.reactive([]),
      videoList: [
        {
          url: "https://www.xiaojiaoyaya.cn/uploads/20260615/de86f27c6f173ce4234a1b726a8204b4.mp4",
          poster: "https://www.xiaojiaoyaya.cn/uploads/20260616/91d17d505581f0fc4028527a8c007c39.jpg"
        }
      ],
      // 重点：改为对象，不是数组！
      store: common_vendor.reactive({})
    };
  },
  onLoad() {
    this.getData();
  },
  methods: {
    // 复制微信
    handleCopyWechat() {
      const wx2 = this.store.store_vx;
      if (!wx2) {
        common_vendor.index.showToast({ title: "暂无微信号", icon: "none" });
        return;
      }
      common_vendor.index.setClipboardData({
        data: wx2,
        success: () => {
          common_vendor.index.showToast({ title: "微信号已复制", icon: "none" });
        }
      });
    },
    goFL(id) {
      common_vendor.index.reLaunch({
        url: `/pages/works/index?id=${id}`
      });
    },
    // 打开地图导航
    handleOpenLocation() {
      const addr = this.store.store_area;
      if (!addr) {
        common_vendor.index.showToast({ title: "暂无地址信息", icon: "none" });
        return;
      }
      common_vendor.index.openLocation({
        latitude: this.latitude,
        longitude: this.longitude,
        name: "小脚丫丫",
        address: addr,
        fail: () => {
          common_vendor.index.showToast({ title: "暂无法打开地图", icon: "none" });
        }
      });
    },
    // 拨打电话
    handleCall() {
      const phone = this.store.store_phone;
      if (!phone) {
        common_vendor.index.showToast({ title: "暂无联系电话", icon: "none" });
        return;
      }
      common_vendor.index.makePhoneCall({
        phoneNumber: phone,
        fail: () => {
          common_vendor.index.showToast({ title: "暂无法拨打电话", icon: "none" });
        }
      });
    },
    // 请求首页数据
    getData() {
      api_index.getHomeData().then((res) => {
        const data = res.data || {};
        this.swiperList = data.swiper || [];
        this.categoryList = data.category || [];
        this.store = data.store || {};
        common_vendor.index.__f__("log", "at pages/index/index.vue:262", "首页数据", res);
      }).catch((err) => {
        common_vendor.index.__f__("log", "at pages/index/index.vue:264", "请求失败", err);
        common_vendor.index.showToast({ title: "数据加载失败", icon: "none" });
      });
    }
  }
};
if (!Array) {
  const _easycom_up_swiper2 = common_vendor.resolveComponent("up-swiper");
  const _easycom_up_lazy_load2 = common_vendor.resolveComponent("up-lazy-load");
  const _easycom_up_image2 = common_vendor.resolveComponent("up-image");
  const _easycom_up_icon2 = common_vendor.resolveComponent("up-icon");
  const _component_fab = common_vendor.resolveComponent("fab");
  (_easycom_up_swiper2 + _easycom_up_lazy_load2 + _easycom_up_image2 + _easycom_up_icon2 + _component_fab)();
}
const _easycom_up_swiper = () => "../../node-modules/uview-plus/components/u-swiper/u-swiper.js";
const _easycom_up_lazy_load = () => "../../node-modules/uview-plus/components/u-lazy-load/u-lazy-load.js";
const _easycom_up_image = () => "../../node-modules/uview-plus/components/u-image/u-image.js";
const _easycom_up_icon = () => "../../node-modules/uview-plus/components/u-icon/u-icon.js";
if (!Math) {
  (_easycom_up_swiper + _easycom_up_lazy_load + _easycom_up_image + _easycom_up_icon)();
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
        f: idx,
        g: common_vendor.o(($event) => $options.goFL(idx), idx)
      });
    }),
    c: common_vendor.f($data.videoList, (item, idx, i0) => {
      return {
        a: item.url,
        b: item.poster,
        c: idx
      };
    }),
    d: common_vendor.p({
      ["show-loading"]: true,
      src: "/static/y1.png",
      width: "60rpx",
      height: "60rpx"
    }),
    e: common_vendor.p({
      ["show-loading"]: true,
      src: "/static/y2.png",
      width: "60rpx",
      height: "60rpx"
    }),
    f: $data.longitude,
    g: $data.markers,
    h: $data.latitude,
    i: common_vendor.p({
      size: "40rpx",
      name: "map-fill"
    }),
    j: common_vendor.t($data.store.store_area || ""),
    k: common_vendor.o((...args) => $options.handleOpenLocation && $options.handleOpenLocation(...args), "96"),
    l: common_vendor.p({
      size: "40rpx",
      name: "weixin-fill"
    }),
    m: common_vendor.t($data.store.store_vx || ""),
    n: common_vendor.o((...args) => $options.handleCopyWechat && $options.handleCopyWechat(...args), "b6"),
    o: common_vendor.p({
      size: "40rpx",
      name: "phone-fill"
    }),
    p: common_vendor.t($data.store.store_phone || ""),
    q: common_vendor.o((...args) => $options.handleCall && $options.handleCall(...args), "0d")
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-1cf27b2a"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/index.js.map
